import axios from 'axios';
import { BASE_URI, GET, POST } from '../utils/pathMap';
import { squashDateTime, JsonToFormData } from '../utils/functions/u_format';
import moment from 'moment-timezone';
import { _ICreateActivity, IClubRequestOptions, IClubRequestResult, IGetActivitiesByClub, IGetAvtivityById, _IEditActivity } from '../types/index.d';

type ApiResponse<T = unknown> = { code?: string | number; message?: string; detail?: string; content?: T };

const isSuccess = (response: ApiResponse) => response?.message === 'success';
const isEmpty = (response: ApiResponse) => String(response?.code) === '2';
const hasAuthMessage = (response: ApiResponse) => /token|auth|login|signin|登入|登录|認證|认证/i.test(String(response?.message || ''));
const hasPermissionMessage = (response: ApiResponse) => /permission|refused|權限|权限/i.test(`${response?.message || ''} ${response?.detail || ''}`);

const requestMessage = (status: IClubRequestResult['status']) => {
    switch (status) {
        case 'cancelled': return '已取消操作。';
        case 'validation_error': return '提交資料有誤，請檢查必填欄位與格式。';
        case 'unauthenticated': return '登入已過期或尚未登入，請重新登入後再試。';
        case 'forbidden': return '你沒有權限執行此操作。';
        case 'empty': return '目前沒有活動。';
        case 'network_error': return '無法連線到伺服器，請檢查網路後再試。';
        case 'server_error': return '伺服器暫時無法完成操作，請稍後再試。';
        default: return '操作未完成，請稍後再試。';
    }
};

const result = <T = unknown>(ok: boolean, status: IClubRequestResult<T>['status'], message: string, response?: ApiResponse<T>): IClubRequestResult<T> =>
    ({ ok, status, message, data: response?.content, code: response?.code });

const apiFailure = <T = unknown>(response: ApiResponse<T>): IClubRequestResult<T> => {
    if (isEmpty(response)) return result(false, 'empty', requestMessage('empty'), response);
    const code = String(response?.code || '');
    if (code === '3' || code === '31' || code === '402' || hasAuthMessage(response)) return result(false, 'unauthenticated', requestMessage('unauthenticated'), response);
    if (hasPermissionMessage(response)) return result(false, 'forbidden', requestMessage('forbidden'), response);
    if (code === '20' || code === '400' || code === '401') return result(false, 'validation_error', requestMessage('validation_error'), response);
    return result(false, 'server_error', requestMessage('server_error'), response);
};

const transportFailure = <T = unknown>(error: unknown): IClubRequestResult<T> => {
    if (!axios.isAxiosError(error)) return result(false, 'unknown_error', requestMessage('unknown_error'));
    const response = error.response?.data as ApiResponse<T> | undefined;
    const httpStatus = error.response?.status;
    if (!error.response) return result(false, 'network_error', requestMessage('network_error'));
    if (httpStatus === 401 || hasAuthMessage(response || {})) return result(false, 'unauthenticated', requestMessage('unauthenticated'), response);
    if (httpStatus === 403) return result(false, 'forbidden', requestMessage('forbidden'), response);
    if (httpStatus && httpStatus >= 400 && httpStatus < 500) return result(false, 'validation_error', requestMessage('validation_error'), response);
    if (httpStatus && httpStatus >= 500) return result(false, 'server_error', requestMessage('server_error'), response);
    return result(false, 'unknown_error', requestMessage('unknown_error'), response);
};

const notify = (message: string, options?: IClubRequestOptions) => {
    if (!options?.suppressAlert && typeof window !== 'undefined') window.alert(message);
};

/** Append a list in the legacy form-data shape expected by the backend. */
export const appendListToFormData = (fd: FormData, listName: string, list: any[] | undefined | null, mode: 'object' | 'array'): FormData => {
    if (!list || (mode === 'object' ? Object.values(list) : list).length === 0) {
        fd.append(listName, '[]');
        return fd;
    }
    if (mode === 'object') Object.values(list).forEach((item) => fd.append(listName, item));
    else fd.append(listName, JSON.stringify(list));
    return fd;
};

/**
 * Upload data and return a structured result. The original six positional
 * parameters remain unchanged; options is appended for new UI.
 */
export async function upload(
    uploadFormData: FormData,
    apiURL: string,
    clearLocalStorage?: string,
    returnLoc?: string,
    guard: boolean = true,
    askUserConfirm: boolean = true,
    options?: IClubRequestOptions,
): Promise<IClubRequestResult> {
    if (askUserConfirm && typeof window !== 'undefined' && !window.confirm(options?.confirmMessage || '確認儲存這些變更嗎？')) {
        return result(false, 'cancelled', requestMessage('cancelled'));
    }
    if (!guard || returnLoc === '') {
        const invalid = result(false, 'validation_error', requestMessage('validation_error'));
        notify(invalid.message, options);
        return invalid;
    }

    options?.onSubmittingChange?.(true);
    try {
        const response = await axios.post<ApiResponse>(apiURL, uploadFormData, { withCredentials: true });
        if (!isSuccess(response.data)) {
            const failed = apiFailure(response.data);
            notify(failed.message, options);
            return failed;
        }
        const success = result(true, 'success', options?.successMessage || '已儲存。', response.data);
        notify(success.message, options);
        if (clearLocalStorage !== undefined && typeof window !== 'undefined') localStorage.removeItem(clearLocalStorage);
        if (returnLoc !== undefined && typeof window !== 'undefined') window.location.href = returnLoc;
        return success;
    } catch (error) {
        const failed = transportFailure(error);
        notify(failed.message, options);
        return failed;
    } finally {
        options?.onSubmittingChange?.(false);
    }
}

/** Create and immediately publish an activity. */
export const createActivity = async (_data: _ICreateActivity, _clubNum: string, options?: IClubRequestOptions): Promise<IClubRequestResult> => {
    const start = squashDateTime(_data.sDate, _data.sTime);
    const end = squashDateTime(_data.eDate, _data.eTime);
    if (!moment(end).isAfter(start)) {
        const invalid = result(false, 'validation_error', '結束時間必須在開始時間後。');
        notify(invalid.message, options);
        return invalid;
    }
    const { sDate, sTime, eDate, eTime, add_relate_image, ...restData } = _data;
    const startDate = moment.utc(sDate).tz('Europe/London').format('YYYY-MM-DD');
    const endDate = moment.utc(eDate).tz('Europe/London').format('YYYY-MM-DD');
    const formData = JsonToFormData({ startdatetime: squashDateTime(startDate, sTime, 'T'), enddatetime: squashDateTime(endDate, eTime, 'T'), ...restData });
    if (add_relate_image) Object.values(add_relate_image).forEach((image) => formData.append('add_relate_image', image));
    else formData.append('add_relate_image', '[]');
    const published = await upload(formData, BASE_URI + POST.EVENT_CREATE, undefined, undefined, true, true, {
        ...options,
        suppressAlert: true,
        confirmMessage: options?.confirmMessage || '發佈後，活動會立即在 ARK ALL APP 顯示。是否確認發佈？',
    });
    if (!published.ok) {
        notify(published.message, options);
        return published;
    }

    const activityId = (published.data as { id?: string } | undefined)?.id;
    let isPubliclyReadable = false;
    if (activityId) {
        try {
            const publicResponse = await axios.get<IGetAvtivityById>(BASE_URI + GET.EVENT_INFO_EVENT_ID + activityId);
            isPubliclyReadable = publicResponse.data.message === 'success' && publicResponse.data.content?._id === activityId;
        } catch (_) {
            // Publishing already succeeded; a failed verification must not be reported as a failed publish.
        }
    }

    const successMessage = options?.successMessage || (isPubliclyReadable
        ? '活動已發佈，公開 API 已確認可讀，APP 可取得最新內容。'
        : '活動已發佈，但暫時無法自動確認 APP 顯示；請稍後在活動列表重新整理。');
    const verifiedResult = { ...published, message: successMessage };
    notify(successMessage, options);
    if (typeof window !== 'undefined') {
        localStorage.removeItem('createdActivityInfo');
        window.location.href = '../club/clubInfo';
    }
    return verifiedResult;
};

/** Get club data or a club's activity list. code=2 is a normal empty activity list. */
export const getClubXX = async (
    curClubNum: number | string,
    GET_URL: string,
    setFunc: any,
    alert?: string,
    debug: boolean = false,
    options?: IClubRequestOptions,
): Promise<IClubRequestResult> => {
    try {
        const response = await axios.get<ApiResponse>(BASE_URI + GET_URL + curClubNum, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        if (isSuccess(response.data)) {
            setFunc(response.data);
            // `debug` is retained for call compatibility; response data is never logged.
            void debug;
            return result(true, 'success', '已載入資料。', response.data);
        }
        const isActivityList = GET_URL === GET.EVENT_INFO_CLUB_NUM || GET_URL === GET.EVENT_INFO_CLUB_NUM_P;
        if (isActivityList && isEmpty(response.data)) {
            const emptyResponse = { ...response.data, content: [] } as IGetActivitiesByClub;
            setFunc(emptyResponse);
            return result(true, 'empty', requestMessage('empty'), emptyResponse);
        }
        const failed = apiFailure(response.data);
        notify(failed.message, options);
        return failed;
    } catch (error) {
        const failed = transportFailure(error);
        notify(failed.message, options);
        return failed;
    }
};

/** Get one activity by ID. */
export const getActivityById = async (id: string, setFunc: any, options?: IClubRequestOptions): Promise<IClubRequestResult<IGetAvtivityById['content']>> => {
    try {
        const response = await axios.get<IGetAvtivityById>(BASE_URI + GET.EVENT_INFO_EVENT_ID + id, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        if (response.data.message === 'success') {
            setFunc(response.data);
            return result(true, 'success', '已載入活動。', response.data);
        }
        const failed = apiFailure(response.data);
        notify(failed.message, options);
        return failed;
    } catch (error) {
        const failed = transportFailure<IGetAvtivityById['content']>(error);
        notify(failed.message, options);
        return failed;
    }
};

/** Edit an existing activity. */
export const editActivity = async (_data: _IEditActivity, _clubNum: string, options?: IClubRequestOptions): Promise<IClubRequestResult> => {
    const startDate = moment.utc(_data.sDate).tz('Europe/London').format('YYYY-MM-DD');
    const endDate = moment.utc(_data.eDate).tz('Europe/London').format('YYYY-MM-DD');
    const start = squashDateTime(startDate, _data.sTime, 'T');
    const end = squashDateTime(endDate, _data.eTime, 'T');
    if (!moment(end).isAfter(start)) {
        const invalid = result(false, 'validation_error', '結束時間必須在開始時間後。');
        notify(invalid.message, options);
        return invalid;
    }
    const formData = new FormData();
    formData.append('id', _data.id);
    formData.append('title', _data.title);
    formData.append('type', _data.type);
    formData.append('link', _data.link);
    if (_data.cover_image_file) formData.append('cover_image_file', _data.cover_image_file);
    formData.append('startdatetime', start);
    formData.append('enddatetime', end);
    appendListToFormData(formData, 'add_relate_image', _data.add_relate_image, 'object');
    appendListToFormData(formData, 'del_relate_image', _data.del_relate_image, 'array');
    formData.append('location', _data.location);
    formData.append('introduction', _data.introduction);
    formData.append('can_follow', 'true');
    return upload(formData, BASE_URI + POST.EVENT_EDIT, undefined, '../club/clubInfo', true, true, {
        ...options,
        confirmMessage: options?.confirmMessage || '確認儲存活動變更嗎？',
        successMessage: options?.successMessage || '活動已儲存。',
    });
};

/** Delete an activity after the caller-provided confirmation text is accepted. */
export const deleteActivity = async (activityId: string, _loginClubNum: string, confirmMsg: string, options?: IClubRequestOptions): Promise<IClubRequestResult> => {
    if (confirmMsg && typeof window !== 'undefined' && !window.confirm(confirmMsg)) return result(false, 'cancelled', requestMessage('cancelled'));
    const formData = new FormData();
    formData.append('id', activityId);
    return upload(formData, BASE_URI + POST.EVENT_DEL, undefined, './clubInfo', true, false, {
        ...options,
        successMessage: options?.successMessage || '活動已刪除。',
    });
};
