// 包引用
import axios from 'axios';
import qs from 'qs';

// 本地引用
import { BASE_URI, GET } from '../utils/pathMap';
import { IClubSignin, IClubSigninResponse } from '../types/index.d';
import { NextRouter } from 'next/router';

/**
 * 符合條件時將用戶屏蔽。
 * @param msg 
 */
export const block = (msg: string, router: NextRouter) => {
    alert(msg || '請登錄賬號！');
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
        block(`URL有誤, 請重新登錄。`, router);
        return null;
    }

    // URL參數有誤：存在url變量，但不存在目標所對應的變量。
    const urlParams = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    if (urlParams[urlParamName] == void 0) {
        block(`URL參數有誤, 請重新登錄。`, router);
        return null;
    }

    // URL 參數存在，但與登錄club number不符。
    if (!compareValue || urlParams[urlParamName] != compareValue) {
        block(`登錄信息有誤，請重新登錄。`, router);
        return null;
    }

    // 登錄認證過期
    const credential = localStorage.getItem(credentialName || "club_token");
    if (!credential) {
        block("登錄認證過期，請重新登錄。", router);
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
}): Promise<any> => {

    let data = {
        account: _data.account + '',
        password: _data.password + '',
    };

    const { router, setLogin } = config;

    // 賬號和密碼檢查
    if (!data.account || !data.password) {
        window.alert("請輸入賬號和密碼");
        return null;
    }

    let URL = BASE_URI + GET.CLUB_SIGN_IN;

    await axios.post(
        URL,
        qs.stringify(data),
        {
            withCredentials: true,   // 使axios自動設置Cookies，登錄成功獲取ARK_TOKEN很重要
        }).then(res => {
            let json: IClubSigninResponse = res.data;
            // 登錄成功
            if (json.message == 'success') {
                // 儲存token
                /**@todo 後續可考慮使用zustand */
                localStorage.setItem("club_token", json.token);
                setLogin(json.content.club_num.toString(), json.token || "");

                // 重定向
                router.push(`./club/clubInfo`);
            }
            // 登錄失敗
            else {
                console.log("登入失敗:", json);
                window.alert("登入失敗！請檢查賬號密碼是否正確。");
            }
        }).catch(err => {
            console.log(err);
            window.alert("網路錯誤！請聯係開發者");
            return null;
        });
}