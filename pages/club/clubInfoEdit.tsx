import React, { useEffect, useState } from 'react';
import { ArrowUpIcon, MinusCircleIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useFieldArray, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { BASE_HOST, BASE_URI, GET, POST } from '../../utils/pathMap';
import NavBarSecondary from '../../components/navBarSecondary';
import { ARKMain, ContentBlock, ContentBlockGrid } from '../../components/uiComponents/ContentBlock';
import { SecondTitle } from '../../components/uiComponents/LayeredTitles';
import { StdButton, StdButtonGrid } from '../../components/uiComponents/StdButton';
import { ARKListImageInput, ARKTextareaInput } from '../../components/uiComponents/Inputs';
import { appendListToFormData, getClubXX, upload } from '../../lib/serverActions';
import { IEditClubInfo, IGetClubInfo } from '../../types/index.d';
import { useLoginStore } from '../../states/state';
import { useTranslation } from 'react-i18next';
import { getClubManagementCopy } from '../../utils/clubManagementCopy';

const contactTypes = ['Wechat', 'Email', 'Phone', 'IG', 'Facebook', 'Website'];

export default function ClubInfoEdit() {
    const router = useRouter();
    const { t, i18n } = useTranslation();
    const copy = getClubManagementCopy(i18n.resolvedLanguage);
    const clubNum = useLoginStore(state => state.curID);
    const [clubData, setClubData] = useState<IGetClubInfo>();
    const [isSaving, setIsSaving] = useState(false);
    const { register, handleSubmit, setValue, control, formState: { errors, isDirty }, watch, reset } = useForm<IEditClubInfo>({ defaultValues: { intro: '', contact: [], add_club_photos: [], del_club_photos: [] } });
    const { fields, append, remove } = useFieldArray({ control, name: 'contact' });
    const deletePhotos = watch('del_club_photos') || [];
    const existingPhotos = clubData?.content.club_photos_list || [];
    const firstRetainedPhoto = existingPhotos.find(url => !deletePhotos.includes(url));
    const photoLimit = Math.max(0, 5 - existingPhotos.length + deletePhotos.length);

    useEffect(() => { if (clubNum) getClubXX(clubNum, GET.CLUB_INFO_NUM, setClubData, undefined, false); }, [clubNum]);
    useEffect(() => {
        if (!clubData) return;
        reset({ intro: clubData.content.intro || '', contact: (clubData.content.contact || []).filter(item => item.type || item.num), add_club_photos: [], del_club_photos: [] });
    }, [clubData, reset]);

    const toggleDeletePhoto = (url: string) => setValue('del_club_photos', deletePhotos.includes(url) ? deletePhotos.filter(item => item !== url) : [...deletePhotos, url], { shouldDirty: true });
    const save = async (data: IEditClubInfo) => {
        const partialContact = (data.contact || []).find(item => Boolean(item.type?.trim()) !== Boolean(item.num?.trim()));
        if (partialContact) { window.alert(copy.contactHelp); return; }
        const contact = (data.contact || []).map(item => ({ type: item.type?.trim(), num: item.num?.trim() })).filter(item => item.type && item.num);
        if (!window.confirm(copy.saveClubConfirm)) return;
        const fd = new FormData();
        fd.append('intro', data.intro || '');
        appendListToFormData(fd, 'contact', contact, 'array');
        appendListToFormData(fd, 'add_club_photos', data.add_club_photos, 'object');
        appendListToFormData(fd, 'del_club_photos', data.del_club_photos, 'array');
        await upload(fd, BASE_URI + POST.CLUB_EDIT_INFO, undefined, './clubInfo', true, false, {
            onSubmittingChange: setIsSaving,
            successMessage: copy.clubSaved,
        });
    };
    const cancel = () => {
        if (isDirty && !window.confirm(copy.discardConfirm)) return;
        router.push('./clubInfo');
    };

    return <ARKMain title={copy.editProfile}>
        <NavBarSecondary returnLocation="./clubInfo" returnStr={copy.workspace} onReturn={cancel} />
        <div className="mb-5 rounded-xl bg-themeColorUltraLight p-5"><h1 className="text-xl font-bold text-themeColor">{copy.editProfile}</h1><p className="mt-2 text-gray-700">{copy.editProfileDesc}</p></div>
        <form onSubmit={handleSubmit(save)}>
            <ContentBlockGrid>
                <ContentBlock title={`${t('CLUB_INTRO')} · ${t('CLUB_CONTACT')}`}>
                    <SecondTitle>{t('CLUB_INTRO')}</SecondTitle><p className="mb-2 text-sm text-gray-500">{copy.introHelp}</p>
                    <ARKTextareaInput base={{ placeholder: copy.introExample, numLimit: 1000, isRequired: false }} regName="intro" errors={errors} requirePrompt={t('ACTIVITY_INTRO_REQUIRE')} register={register} watch={watch} />
                    <div className="mt-7"><SecondTitle>{copy.contactOptional}</SecondTitle><p className="mb-4 text-sm text-gray-500">{copy.contactHelp}</p><div className="space-y-3">{fields.map((field, index) => <div key={field.id} className="flex flex-col gap-2 rounded-lg border border-gray-200 p-3 sm:flex-row sm:items-center"><select className="h-10 rounded-lg border-2 border-themeColor p-2 sm:w-36" {...register(`contact.${index}.type`)}><option value="">{copy.selectContact}</option>{contactTypes.map(type => <option key={type} value={type}>{type}</option>)}</select><input className="h-10 flex-1 rounded-lg border-2 border-themeColor p-2" placeholder={copy.contactExample} {...register(`contact.${index}.num`)} /><button type="button" onClick={() => remove(index)} className="flex items-center gap-1 self-start text-alert hover:opacity-70 sm:self-auto"><MinusCircleIcon className="h-6 w-6" />{copy.remove}</button></div>)}</div><button type="button" onClick={() => append({ type: '', num: '' })} className="mt-4 flex items-center gap-2 font-bold text-themeColor hover:underline"><PlusCircleIcon className="h-6 w-6" />{copy.addContact}</button></div>
                </ContentBlock>
                <ContentBlock title={t('CLUB_PHOTOS')} className="max-[1022px]:mt-5">
                    <div className="rounded-lg border border-themeColor bg-themeColorUltraLight p-3 text-sm text-gray-700"><strong className="text-themeColor">{copy.coverTipTitle}</strong>{copy.coverTip}</div>
                    <div className="mt-6"><SecondTitle>{copy.existingPhotos}</SecondTitle>{existingPhotos.length ? <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">{existingPhotos.map((url, index) => { const marked = deletePhotos.includes(url); const isCurrentCover = index === 0 && !marked; const isNextCover = url === firstRetainedPhoto && index !== 0; return <div key={url} className={`rounded-lg border-2 p-1 ${marked ? 'border-alert bg-red-50 opacity-70' : 'border-transparent'}`}><img src={BASE_HOST + url} alt={`${t('CLUB_PHOTOS')} ${index + 1}`} className="h-24 w-full rounded object-cover" /><button type="button" onClick={() => toggleDeletePhoto(url)} className={`mt-2 w-full rounded py-1 text-sm font-bold ${marked ? 'bg-white text-themeColor' : 'bg-red-50 text-alert'}`}>{marked ? copy.undoDelete : copy.markDelete}</button>{isCurrentCover && <p className="mt-1 text-center text-xs text-themeColor">{copy.currentCover}</p>}{isNextCover && <p className="mt-1 text-center text-xs text-themeColor">{copy.nextCover}</p>}</div>; })}</div> : <p className="mt-2 text-sm text-gray-500">{copy.noPhotos}</p>}</div>
                    <div className="mt-7"><SecondTitle>{t('CLUB_PHOTOS_NEW')}</SecondTitle><p className="mb-3 text-sm text-gray-500">{copy.newPhotoHelp}</p><ARKListImageInput base={{ regName: 'add_club_photos', isRequired: false, mode: 'object', numLimit: photoLimit }} register={register} imgList={watch('add_club_photos')} setValue={setValue} errText={`${t('ERR_NUM_PHOTOS_EXCEED')} 5`} thisErr={errors.add_club_photos?.message} /></div>
                </ContentBlock>
            </ContentBlockGrid>
            <StdButtonGrid><StdButton disabled={isSaving} textContent={isSaving ? copy.saving : copy.saveChanges} Icon={ArrowUpIcon} /><StdButton disabled={isSaving} textContent={copy.cancelReturn} type="button" Icon={TrashIcon} onClickFunc={cancel} /></StdButtonGrid>
        </form>
    </ARKMain>;
}
