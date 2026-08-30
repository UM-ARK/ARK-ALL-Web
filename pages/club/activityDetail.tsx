import React, { useEffect, useState } from 'react';
import { ArrowUpIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import moment from 'moment-timezone';
import qs from 'qs';
import { BASE_HOST } from '../../utils/pathMap';
import { editActivity, deleteActivity, getActivityById } from '../../lib/serverActions';
import { parseDateTime } from '../../utils/functions/u_format';
import { SubmitHandler, useForm } from 'react-hook-form';
import { _IEditActivity, IGetAvtivityById } from '../../types/index.d';
import { authGuard } from '../../lib/authentication';
import { AfterLoading } from '../../components/uiComponents/AfterLoading';
import Footer from '../../components/footer';
import NavBarSecondary from '../../components/navBarSecondary';
import { ARKMain, ContentBlock } from '../../components/uiComponents/ContentBlock';
import { ARKImageInput, ARKListImageInput, ARKTextareaInput } from '../../components/uiComponents/Inputs';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useLoginStore } from '../../states/state';
import { getClubManagementCopy } from '../../utils/clubManagementCopy';

const inputStyle = 'w-full rounded-lg border-2 border-themeColor bg-white p-2 outline-none focus:ring-2 focus:ring-themeColorLight dark:bg-gray-700';

const ActivityDetail = () => {
    const { t, i18n } = useTranslation();
    const copy = getClubManagementCopy(i18n.resolvedLanguage);
    const router = useRouter();
    const s_clubNum = useLoginStore(state => state.curID);
    const [activityData, setActivityData] = useState<IGetAvtivityById>(null);
    const [isEditMode, setEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const { register, handleSubmit, setValue, formState: { errors, isDirty, isSubmitting }, reset, watch } = useForm<_IEditActivity>();

    const resetActivityForm = () => {
        if (!activityData?.content) return;
        const { _id, relate_image_url, club_name, created_by, startdatetime, enddatetime, timestamp, state, ...base } = activityData.content;
        const start = parseDateTime(moment.utc(startdatetime).tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm'));
        const end = parseDateTime(moment.utc(enddatetime).tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm'));
        reset({ ...base, id: _id, add_relate_image: [], del_relate_image: [], sDate: start.date, sTime: start.time, eDate: end.date, eTime: end.time });
    };

    useEffect(() => {
        authGuard({ urlParamName: 'club_num', compareValue: s_clubNum }, router);
        const activityID = qs.parse(window.location.search, { ignoreQueryPrefix: true })['activity_id'];
        getActivityById(activityID, setActivityData).then(() => setIsLoading(false));
    }, []);

    useEffect(() => { resetActivityForm(); }, [activityData]);

    const endAfterStart = () => {
        const start = moment(`${watch('sDate')} ${watch('sTime')}`, 'YYYY-MM-DD HH:mm', true);
        const end = moment(`${watch('eDate')} ${watch('eTime')}`, 'YYYY-MM-DD HH:mm', true);
        return end.isAfter(start) || copy.endAfterStart;
    };
    const cancelEdit = () => {
        if (isDirty && !window.confirm(copy.discardConfirm)) return;
        resetActivityForm();
        setEditMode(false);
    };
    const returnToClub = () => {
        if (isEditMode && isDirty && !window.confirm(copy.discardConfirm)) return;
        router.push('./clubInfo');
    };
    const toggleDeleteImage = (url: string) => {
        const marked = watch('del_relate_image') || [];
        setValue('del_relate_image', marked.includes(url) ? marked.filter(item => item !== url) : [...marked, url], { shouldDirty: true });
    };
    const onSubmit: SubmitHandler<_IEditActivity> = async (data) => {
        try {
            await editActivity(data, s_clubNum, { confirmMessage: copy.editConfirm, successMessage: copy.activitySaved });
        } catch (_) {
            alert(copy.saveFailed);
        }
    };
    const removeActivity = async () => {
        if (!activity?._id || isDeleting) return;
        setIsDeleting(true);
        const response = await deleteActivity(activity._id, s_clubNum, copy.deleteConfirm(activity.title), { successMessage: copy.activityDeleted });
        if (!response.ok) setIsDeleting(false);
    };

    const activity = activityData?.content;
    const isWebsite = activity?.type === 'WEBSITE';
    const markedForDeletion = watch('del_relate_image') || [];
    const existingImages = activity?.relate_image_url || [];
    const remainingImageSlots = 5 - existingImages.length + markedForDeletion.length;

    return <ARKMain title={activity?.title || t('ACTIVITY_TITLE')}>
        <NavBarSecondary returnLocation="./clubInfo" returnStr={t('PG_CLUB_INFO')} onReturn={returnToClub} />
        <form className="mx-auto max-w-6xl pb-8" onSubmit={handleSubmit(onSubmit)}>
            <AfterLoading isLoading={isLoading}>
                <header className="mb-6 text-center text-themeColor"><p className="text-sm font-bold">{isEditMode ? copy.editingActivity : copy.activityDetail}</p>{isEditMode ? <div className="mx-auto mt-2 max-w-2xl"><input className={`${inputStyle} text-center text-2xl font-bold`} placeholder={copy.activityTitle} {...register('title', { required: t('ACTIVITY_TITLE_REQUIRE'), minLength: { value: 2, message: copy.titleMin }, maxLength: { value: 50, message: copy.titleMax } })} />{errors.title && <p className="mt-1 text-sm text-alert">{errors.title.message}</p>}</div> : <h1 className="mt-1 text-3xl font-bold">{activity?.title}</h1>}<p className="mt-2 text-base">{copy.organizer}：{activity?.club_name}</p></header>

                <div className="mb-6 grid gap-5 lg:grid-cols-[16rem_minmax(0,1fr)]">
                    <div>{isEditMode ? <><p className="mb-2 font-bold text-themeColor">{copy.coverChange}</p><ARKImageInput base={{ regName: 'cover_image_file', initialImgURL: BASE_HOST + activity?.cover_image_url }} register={register} setValue={setValue} errText={t('ACTIVITY_COVER_IMG_REQUIRE')} thisErr={errors.cover_image_file} /></> : <img className="h-64 w-full rounded-xl object-cover shadow-md" src={BASE_HOST + activity?.cover_image_url} alt={`${activity?.title} ${copy.appEventCover}`} />}</div>
                    <ContentBlock title={isEditMode ? copy.editInfo : copy.published}><p className="text-gray-600 dark:text-gray-200">{isEditMode ? copy.editInfoDesc : copy.publishedDesc}</p><div className="mt-4 flex flex-wrap gap-3">{isEditMode ? <button type="button" onClick={cancelEdit} className="rounded-full border-2 border-themeColor px-5 py-2 font-bold text-themeColor">{copy.cancelEdit}</button> : <button type="button" onClick={() => setEditMode(true)} className="flex items-center gap-2 rounded-full bg-themeColor px-5 py-2 font-bold text-white"><PencilSquareIcon className="h-5 w-5" />{copy.editActivity}</button>}</div></ContentBlock>
                </div>

                <div className="grid gap-5 lg:grid-cols-2"><ContentBlock title={copy.basicInfo}><div className="space-y-5"><fieldset><legend className="font-bold text-themeColor">{copy.startTime}</legend>{isEditMode ? <div className="mt-2 grid grid-cols-2 gap-2"><input className={inputStyle} type="date" {...register('sDate', { required: copy.chooseStartDate })} /><input className={inputStyle} type="time" {...register('sTime', { required: copy.chooseStartTime })} /></div> : <p className="mt-1">{activity && moment.utc(activity.startdatetime).tz('Asia/Shanghai').format('YYYY/MM/DD HH:mm')}</p>}</fieldset><fieldset><legend className="font-bold text-themeColor">{copy.endTime}</legend>{isEditMode ? <><div className="mt-2 grid grid-cols-2 gap-2"><input className={inputStyle} type="date" {...register('eDate', { required: copy.chooseEndDate })} /><input className={inputStyle} type="time" {...register('eTime', { required: copy.chooseEndTime, validate: endAfterStart })} /></div>{errors.eTime && <p className="mt-1 text-sm text-alert">{errors.eTime.message}</p>}</> : <p className="mt-1">{activity && moment.utc(activity.enddatetime).tz('Asia/Shanghai').format('YYYY/MM/DD HH:mm')}</p>}</fieldset>{isWebsite ? <fieldset><legend className="font-bold text-themeColor">{copy.eventLink}</legend>{isEditMode ? <input className={`${inputStyle} mt-2`} type="url" {...register('link', { required: copy.chooseLink, pattern: { value: /^https?:\/\/.+/, message: copy.linkInvalid } })} /> : <a className="mt-1 block break-all text-themeColor underline" href={activity?.link} target="_blank" rel="noreferrer">{activity?.link}</a>}{errors.link && <p className="mt-1 text-sm text-alert">{errors.link.message}</p>}</fieldset> : <fieldset><legend className="font-bold text-themeColor">{t('LOCATION')}</legend>{isEditMode ? <input className={`${inputStyle} mt-2`} {...register('location', { required: copy.chooseLocation, maxLength: { value: 100, message: t('LOCATION_REQUIRE') } })} /> : <p className="mt-1">{activity?.location || copy.noLocation}</p>}{errors.location && <p className="mt-1 text-sm text-alert">{errors.location.message}</p>}</fieldset>}</div></ContentBlock>
                    {!isWebsite && <ContentBlock title={copy.activityIntro}>{isEditMode ? <ARKTextareaInput base={{ placeholder: copy.introPlaceholder, numLimit: 1000, isRequired: true }} regName="introduction" errors={errors} requirePrompt={t('ACTIVITY_INTRO_REQUIRE')} register={register} watch={watch} /> : <p className="whitespace-pre-wrap">{activity?.introduction || copy.noIntro}</p>}</ContentBlock>}</div>

                {!isWebsite && <ContentBlock title={copy.activityPhotos} className="mt-5"><p className="mb-4 text-sm text-gray-500">{isEditMode ? copy.photoEditHelp : copy.photoViewHelp}</p>{existingImages.length === 0 && !isEditMode ? <p className="text-gray-500">{copy.noEventPhotos}</p> : <div className="flex flex-wrap gap-4">{existingImages.map((url) => { const marked = markedForDeletion.includes(url); return <button type="button" key={url} onClick={() => isEditMode ? toggleDeleteImage(url) : window.open(BASE_HOST + url, '_blank')} className={`relative overflow-hidden rounded-lg border-2 text-left transition ${marked ? 'border-alert opacity-50 grayscale' : 'border-transparent hover:scale-[1.02]'}`}><img src={BASE_HOST + url} alt={copy.activityPhotos} className="h-28 w-40 object-cover" />{isEditMode && <span className={`absolute inset-x-0 bottom-0 px-2 py-1 text-center text-xs font-bold text-white ${marked ? 'bg-alert' : 'bg-black/60'}`}>{marked ? copy.markedDelete : copy.markPhotoDelete}</span>}</button>; })}</div>}{isEditMode && <div className="mt-6 border-t border-gray-200 pt-4"><p className="mb-2 font-bold text-themeColor">{copy.newPhotos}</p><ARKListImageInput base={{ regName: 'add_relate_image', isRequired: false, mode: 'object', numLimit: Math.max(0, remainingImageSlots) }} register={register} imgList={watch('add_relate_image')} setValue={setValue} errText={`${t('ERR_NUM_PHOTOS_EXCEED')} 5!`} thisErr={errors.add_relate_image?.message} /></div>}</ContentBlock>}

                {isEditMode && <><div className="mt-5 flex justify-center"><button type="submit" disabled={isSubmitting || isDeleting} className="flex items-center gap-2 rounded-full bg-themeColor px-6 py-3 font-bold text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"><ArrowUpIcon className="h-5 w-5" />{isSubmitting ? copy.savingActivity : copy.saveUpdateApp}</button></div><ContentBlock title={copy.danger} className="mt-5 border-alert"><p className="text-sm text-gray-600 dark:text-gray-200">{copy.deleteDesc(activity?.title || '')}</p><button type="button" disabled={isDeleting || isSubmitting} onClick={removeActivity} className="mt-4 flex items-center gap-2 rounded-full bg-alert px-5 py-2 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"><TrashIcon className="h-5 w-5" />{isDeleting ? copy.deletingActivity : copy.deleteActivity}</button></ContentBlock></>}
                <Footer />
            </AfterLoading>
        </form>
    </ARKMain>;
};

export default ActivityDetail;
