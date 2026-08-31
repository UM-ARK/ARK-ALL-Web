// 包引用
import axios from 'axios';
import qs from 'qs';

// 本地引用
import { BASE_URI, GET } from '../utils/pathMap';
import { IClubSignin, IClubSigninResponse, IClubRequestResult } from '../types/index.d';
import { NextRouter } from 'next/router';
import { hasClubSessionMarker, markClubSession } from './clubSession';

const FORM_HEADERS = { 'Content-Type': 'application/x-www-form-urlencoded' };

/**
 * 符合條件時將用戶屏蔽。
 * @param msg 
 */
export const block = (msg: string, router: NextRouter) => {
    alert(msg || '請先登入社團帳號。');
    // window.location.href = '/clubsignin';
    router.push('/clubsignin');
}

/**
 * 頁面守衛。如果沒有token或者沒有url參數，則導向登陸頁面。
 * @param authParams 
 * @prop {string} credentialName - 登錄認證的類型名稱，通常爲club_token，可不填。
 * @prop {string} urlParamName - URL參數名稱，必填。
 * @prop {string|undefined} compareValue - 認證值，為Session中存儲的登錄ID。
 * @example
 * useEffect(()=>{// 頁面加載時執行
 *      const clubNum = authGuard({urlParamName:'club_num'});    // 從URL變量中獲取club_num，如果沒有則導向登陸頁面。
 *      // 其它頁面邏輯
 * },[]);
 * @returns 
 */
export const authGuard = (authParams: {
    credentialName?: string,
    urlParamName: string,
    compareValue?: string
}, router: NextRouter): null | string => {
    let { credentialName, urlParamName, compareValue } = authParams;

    // URL有誤：不存在url變量
    if (urlParamName == void 0) {
        block('頁面連結不完整，請重新登入後再試。', router);
        return null;
    }

    // URL參數有誤：存在url變量，但不存在目標所對應的變量。
    const urlParams = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    if (urlParams[urlParamName] == void 0) {
        block('頁面連結已失效，請從社團管理首頁重新開啟。', router);
        return null;
    }

    // URL 參數存在，但與登錄club number不符。
    if (!compareValue || urlParams[urlParamName] != compareValue) {
        block('登入的社團與此頁面不符，請重新登入正確的社團帳號。', router);
        return null;
    }

    // 登錄認證過期
    const credential = credentialName
        ? localStorage.getItem(credentialName)
        : hasClubSessionMarker();
    if (!credential) {
        block('登入已過期，請重新登入後繼續管理社團資料。', router);
        return null;
    }

    return urlParams[urlParamName];
}

/**
 * 社團賬戶登錄。
 * @param {IClubSignin} _data - 登錄信息，包括賬號和密碼。詳情請閲[Interfaces](../types/index.d.tsx).
 */
export const clubSignIn = async (_data: IClubSignin, config: {
    router: NextRouter,
    setLogin: (id: string, token: string) => void,
}): Promise<IClubRequestResult> => {

    let data = {
        account: _data.account + '',
        password: _data.password + '',
    };

    const { router, setLogin } = config;

    // 賬號和密碼檢查
    if (!data.account || !data.password) {
        const invalid = { ok: false, status: 'validation_error' as const, message: '請輸入帳號和密碼。' };
        window.alert(invalid.message);
        return invalid;
    }

    let URL = BASE_URI + GET.CLUB_SIGN_IN;

    try {
        const res = await axios.post(URL, qs.stringify(data), {
            headers: FORM_HEADERS,
            withCredentials: true,
        });
        const json: IClubSigninResponse = res.data;
        // Success is `message === 'success'`. JWT lives in the ARK_TOKEN cookie, not JSON.
        if (json.message === 'success') {
            const clubNum = json.content.club_num.toString();
            markClubSession(clubNum);
            setLogin(clubNum, '');
            router.push('./club/clubInfo');
            return { ok: true, status: 'success', message: '登入成功。', data: json.content, code: json.code };
        }
        const failed = { ok: false, status: 'unauthenticated' as const, message: '帳號或密碼不正確，請確認後再試。', code: json.code };
        window.alert(failed.message);
        return failed;
    } catch (error) {
        const responseStatus = axios.isAxiosError(error) ? error.response?.status : undefined;
        const failed = responseStatus && responseStatus >= 500
            ? { ok: false, status: 'server_error' as const, message: '伺服器暫時無法登入，請稍後再試。' }
            : responseStatus && responseStatus >= 400
                ? { ok: false, status: 'unauthenticated' as const, message: '帳號或密碼不正確，請確認後再試。' }
                : { ok: false, status: 'network_error' as const, message: '無法連線到伺服器，請檢查網路後再試。' };
        window.alert(failed.message);
        return failed;
    }
}
