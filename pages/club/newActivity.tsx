import React from 'react';
import { ArrowUpIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import moment from 'moment';
import { SubmitHandler, useForm } from 'react-hook-form';
import NavBarSecondary from '../../components/navBarSecondary';
import { ARKMain, ContentBlock } from '../../components/uiComponents/ContentBlock';
import { ARKImageInput, ARKListImageInput, ARKTextareaInput } from '../../components/uiComponents/Inputs';
import { createActivity } from '../../lib/serverActions';
import { _ICreateActivity } from '../../types/index.d';
import { useTranslation } from 'react-i18next';
import { useLoginStore } from '../../states/state';
import { getClubManagementCopy } from '../../utils/clubManagementCopy';
import { useRouter } from 'next/router';

const inputStyle = 'w-full rounded-lg border-2 border-themeColor bg-white p-2 outline-none focus:ring-2 focus:ring-themeColorLight dark:bg-gray-700';

const NewActivity = () => {
    const { t, i18n } = useTranslation();
    const copy = getClubManagementCopy(i18n.resolvedLanguage);
    const router = useRouter();
    const s_clubNum = useLoginStore(state => state.curID);
    const now = moment().seconds(0).milliseconds(0);
    const { register, handleSubmit, setValue, formState: { errors, isDirty, isSubmitting }, watch } = useForm<_ICreateActivity>({
        defaultValues: {
            title: '', cover_image_file: void 0,
            sDate: now.format('YYYY-MM-DD'), sTime: now.format('HH:mm'),
            eDate: now.clone().add(1, 'hour').format('YYYY-MM-DD'), eTime: now.clone().add(1, 'hour').format('HH:mm'),
            location: '', link: '', type: 'ACTIVITY', introduction: '', add_relate_image: []
        }
    });

    const selectedType = watch('type');
    const endAfterStart = () => {
        const start = moment(`${watch('sDate')} ${watch('sTime')}`, 'YYYY-MM-DD HH:mm', true);
        const end = moment(`${watch('eDate')} ${watch('eTime')}`, 'YYYY-MM-DD HH:mm', true);
        return end.isAfter(start) || copy.endAfterStart;
    };
    const onSubmit: SubmitHandler<_ICreateActivity> = async (data) => {
        await createActivity(data, s_clubNum, { confirmMessage: copy.publishConfirm });
    };
    const cancelCreate = () => {
        if (isDirty && !window.confirm(copy.discardConfirm)) return;
        router.push('./clubInfo');
    };
    const required = <span className="ml-1 text-alert" aria-label={copy.requiredLabel}>*</span>;

    return <ARKMain title={t('NEW_ACTIVITY')}>
        <NavBarSecondary returnLocation="./clubInfo" onReturn={cancelCreate} />
        <form className="mx-auto flex max-w-6xl flex-col gap-5 pb-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-xl border border-themeColorLight bg-themeColorUltraLight px-5 py-4 text-themeColor dark:bg-slate-800"><div className="flex items-start gap-3"><InformationCircleIcon className="mt-0.5 h-6 w-6 shrink-0" /><div><h1 className="text-xl font-bold">{copy.createTitle}</h1><p className="mt-1 text-sm">{copy.publishDesc}</p></div></div></div>

            <ContentBlock title={copy.requiredData}><div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_15rem]"><div className="space-y-5">
                <label className="block font-bold text-themeColor">{copy.activityTitle}{required}<input className={`${inputStyle} mt-2 text-xl`} placeholder={copy.activityTitle} {...register('title', { required: t('ACTIVITY_TITLE_REQUIRE'), minLength: { value: 2, message: copy.titleMin }, maxLength: { value: 50, message: copy.titleMax } })} />{errors.title && <p className="mt-1 text-sm text-alert">{errors.title.message}</p>}</label>
                <div className="grid gap-4 sm:grid-cols-2"><label className="font-bold text-themeColor">{t('ACTIVITY_TYPE')}{required}<select className={`${inputStyle} mt-2`} {...register('type')}><option value="ACTIVITY">{copy.typeActivity}</option><option value="WEBSITE">{copy.typeWebsite}</option></select></label><div className="rounded-lg bg-gray-50 p-3 text-sm text-gray-600 dark:bg-gray-700 dark:text-gray-200">{selectedType === 'WEBSITE' ? copy.typeWebsiteDesc : copy.typeActivityDesc}</div></div>
                <div className="grid gap-4 sm:grid-cols-2"><fieldset><legend className="font-bold text-themeColor">{copy.startTime}{required}</legend><div className="mt-2 grid grid-cols-2 gap-2"><input className={inputStyle} type="date" {...register('sDate', { required: copy.chooseStartDate })} /><input className={inputStyle} type="time" {...register('sTime', { required: copy.chooseStartTime })} /></div></fieldset><fieldset><legend className="font-bold text-themeColor">{copy.endTime}{required}</legend><div className="mt-2 grid grid-cols-2 gap-2"><input className={inputStyle} type="date" {...register('eDate', { required: copy.chooseEndDate })} /><input className={inputStyle} type="time" {...register('eTime', { required: copy.chooseEndTime, validate: endAfterStart })} /></div>{errors.eTime && <p className="mt-1 text-sm text-alert">{errors.eTime.message}</p>}</fieldset></div>
                {selectedType === 'ACTIVITY' ? <label className="block font-bold text-themeColor">{t('LOCATION')}{required}<input className={`${inputStyle} mt-2`} placeholder={copy.locationExample} {...register('location', { required: copy.chooseLocation, maxLength: { value: 100, message: t('LOCATION_REQUIRE') } })} />{errors.location && <p className="mt-1 text-sm text-alert">{errors.location.message}</p>}</label> : <label className="block font-bold text-themeColor">{copy.eventLink}{required}<input className={`${inputStyle} mt-2`} type="url" placeholder="https://" {...register('link', { required: copy.chooseLink, pattern: { value: /^https?:\/\/.+/, message: copy.linkInvalid } })} />{errors.link && <p className="mt-1 text-sm text-alert">{errors.link.message}</p>}</label>}
            </div><div><p className="mb-2 font-bold text-themeColor">{copy.appEventCover}{required}</p><p className="mb-3 text-sm text-gray-500">{copy.appEventCoverDesc}</p><ARKImageInput base={{ regName: 'cover_image_file', isRequired: true }} register={register} setValue={setValue} errText={t('ACTIVITY_COVER_IMG_REQUIRE')} thisErr={errors.cover_image_file} /></div></div></ContentBlock>

            {selectedType === 'ACTIVITY' && <ContentBlock title={copy.activityDetailsRequired}><ARKTextareaInput base={{ placeholder: copy.introPlaceholder, numLimit: 1000, isRequired: true }} regName="introduction" errors={errors} requirePrompt={t('ACTIVITY_INTRO_REQUIRE')} register={register} watch={watch} /></ContentBlock>}
            {selectedType === 'ACTIVITY' && <ContentBlock title={copy.optionalEventPhotos}><p className="mb-4 text-sm text-gray-500">{copy.optionalEventPhotosDesc}</p><ARKListImageInput base={{ regName: 'add_relate_image', isRequired: false, numLimit: 5 }} register={register} imgList={watch('add_relate_image')} setValue={setValue} errText={`${t('ERR_NUM_PHOTOS_EXCEED')} 5`} thisErr={errors.add_relate_image} /></ContentBlock>}
            <ContentBlock title={copy.appPreview}><div className="grid gap-4 rounded-lg bg-gray-50 p-4 text-sm dark:bg-gray-700 md:grid-cols-2"><div><p className="font-bold text-themeColor">{watch('title') || copy.previewTitle}</p><p className="mt-2">{`${watch('sDate')} ${watch('sTime')}`} → {`${watch('eDate')} ${watch('eTime')}`}</p><p className="mt-1">{selectedType === 'ACTIVITY' ? (watch('location') || copy.previewLocation) : (watch('link') || copy.previewLink)}</p></div><p className="text-gray-600 dark:text-gray-200">{selectedType === 'ACTIVITY' ? (watch('introduction') || copy.previewIntro) : copy.previewWebsite}</p></div></ContentBlock>
            <div className="sticky bottom-3 z-10 flex justify-center rounded-xl bg-white/90 p-3 shadow-lg backdrop-blur dark:bg-gray-800/90"><button type="submit" disabled={isSubmitting} className="flex items-center gap-2 rounded-full bg-themeColor px-6 py-3 font-bold text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"><ArrowUpIcon className="h-5 w-5" />{isSubmitting ? copy.publishing : copy.publishApp}</button></div>
        </form>
    </ARKMain>;
};

export default NewActivity;
