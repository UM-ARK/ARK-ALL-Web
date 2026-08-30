import React, { useEffect, useMemo, useState } from 'react';
import { ArrowsRightLeftIcon, CheckCircleIcon, PencilSquareIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import moment from 'moment';
import { BASE_HOST, GET } from '../../utils/pathMap';
import { getClubXX } from '../../lib/serverActions';
import { ActivityBase, IGetActivitiesByClub, IGetClubInfo } from '../../types/index.d';
import NavBarSecondary from '../../components/navBarSecondary';
import Footer from '../../components/footer';
import { AfterLoading } from '../../components/uiComponents/AfterLoading';
import { ActivityCard } from '../../components/uiComponents/ActivityCard';
import { StdButton, StdButtonGrid } from '../../components/uiComponents/StdButton';
import { ARKMain, ContentBlock, ContentBlockGrid } from '../../components/uiComponents/ContentBlock';
import { SecondTitle, ThirdTitle } from '../../components/uiComponents/LayeredTitles';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useLoginStore } from '../../states/state';
import { getClubManagementCopy } from '../../utils/clubManagementCopy';

interface SeparatedActivities { SEPACT_NOT_STARTED: ActivityBase[]; SEPACT_IN_PROGRESS: ActivityBase[]; SEPACT_HAS_ENDED: ActivityBase[]; SEPACT_ERROR: ActivityBase[]; }
const separateActivities = (activities: ActivityBase[] = []): SeparatedActivities => {
    const now = moment();
    return [...activities].sort((a, b) => moment(b.startdatetime).diff(a.startdatetime)).reduce<SeparatedActivities>((all, activity) => {
        if (moment(activity.startdatetime).isAfter(now)) all.SEPACT_NOT_STARTED.push(activity);
        else if (moment(activity.enddatetime).isAfter(now)) all.SEPACT_IN_PROGRESS.push(activity);
        else if (moment(activity.enddatetime).isValid()) all.SEPACT_HAS_ENDED.push(activity);
        else all.SEPACT_ERROR.push(activity);
        return all;
    }, { SEPACT_NOT_STARTED: [], SEPACT_IN_PROGRESS: [], SEPACT_HAS_ENDED: [], SEPACT_ERROR: [] });
};

const ClubInfo = () => {
    const { t, i18n } = useTranslation();
    const copy = getClubManagementCopy(i18n.resolvedLanguage);
    const router = useRouter();
    const clubNum = useLoginStore(state => state.curID);
    const [clubData, setClubData] = useState<IGetClubInfo>();
    const [clubActivities, setClubActivities] = useState<IGetActivitiesByClub>();
    const [displayMode, setDisplayMode] = useState<'by_createtime' | 'by_starttime'>('by_starttime');
    const [loading, setLoading] = useState({ club: true, activities: true });

    useEffect(() => {
        if (!clubNum) return;
        const load = async () => {
            try {
                await Promise.all([
                    getClubXX(clubNum, GET.CLUB_INFO_NUM, setClubData),
                    getClubXX(clubNum, GET.EVENT_INFO_CLUB_NUM, setClubActivities),
                ]);
            } catch (_) { /* 共用請求層已向使用者顯示具體錯誤。 */ }
            finally { setLoading({ club: false, activities: false }); }
        };
        load();
    }, [clubNum, t]);

    const club = clubData?.content;
    const contacts = (club?.contact || []).filter(item => item.type?.trim() && item.num?.trim());
    const activities = clubActivities?.content || [];
    const separated = useMemo(() => separateActivities(activities), [activities]);
    const checklist = [
        { label: copy.setupIntro, done: Boolean(club?.intro?.trim()), href: './clubInfoEdit' },
        { label: copy.setupContact, done: contacts.length > 0, href: './clubInfoEdit' },
        { label: copy.setupCover, done: Boolean(club?.club_photos_list?.length), href: './clubInfoEdit' },
        { label: copy.setupFirstActivity, done: activities.length > 0, href: './newActivity' },
    ];
    const complete = checklist.filter(item => item.done).length;

    return <ARKMain title={club?.name || t('PG_CLUB_INFO')}>
        <NavBarSecondary returnLocation="/clubsignin" clearLocStorage />
        <AfterLoading isLoading={loading.club}>
            <section className="mb-5 rounded-xl bg-themeColorUltraLight p-5 sm:p-7">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"><div><p className="text-sm font-bold text-themeColor">{copy.workspace}</p><h1 className="mt-1 text-2xl font-bold">{copy.welcomeBack(club?.name || t('CLUB_OWNER'))}</h1><p className="mt-2 text-gray-600 dark:text-gray-300">{copy.workspaceDesc}</p></div><StdButtonGrid><StdButton onClickFunc={() => router.push('./clubInfoEdit')} textContent={copy.completeProfile} Icon={PencilSquareIcon} /><StdButton onClickFunc={() => router.push('./newActivity')} textContent={copy.createActivity} Icon={PlusCircleIcon} /></StdButtonGrid></div>
            </section>
            <ContentBlock title={copy.setupProgress} className="mb-5"><div className="flex flex-col gap-2 sm:flex-row sm:justify-between"><p className="font-medium">{copy.setupCount(complete, checklist.length)}</p><p className="text-sm text-gray-500">{copy.setupLater}</p></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200"><div className="h-full rounded-full bg-themeColor" style={{ width: `${complete / checklist.length * 100}%` }} /></div><div className="mt-4 grid gap-2 md:grid-cols-2">{checklist.map(item => <button key={item.label} type="button" onClick={() => !item.done && router.push(item.href)} className={`flex items-center gap-2 rounded-lg border p-3 text-left ${item.done ? 'border-green-200 bg-green-50 text-green-800' : 'border-gray-200 hover:border-themeColor hover:bg-themeColorUltraLight'}`}><CheckCircleIcon className={`h-5 w-5 shrink-0 ${item.done ? 'text-green-600' : 'text-gray-300'}`} /><span className="text-sm font-medium">{item.label}</span>{!item.done && <span className="ml-auto text-xs text-themeColor">{copy.goComplete}</span>}</button>)}</div></ContentBlock>
            <ContentBlock styles={{ withTitle: false }} className="flex flex-col gap-4 sm:flex-row sm:items-center"><div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">{club?.logo_url ? <img className="h-full w-full object-cover" src={BASE_HOST + club.logo_url} alt={`${club.name} logo`} /> : <span className="text-sm text-gray-500">{copy.noLogo}</span>}</div><div className="min-w-0"><p className="text-xl font-bold text-themeColor">{club?.name}</p>{club?.tag && <span className="rounded-full bg-themeColorUltraLight px-3 text-themeColor">{club.tag}</span>}<p className="mt-3 whitespace-pre-wrap">{club?.intro || copy.noIntroHelp}</p></div>{club?.club_photos_list?.[0] && <img src={BASE_HOST + club.club_photos_list[0]} alt={`${club.name} ${copy.appCover}`} className="h-28 w-full rounded-lg object-cover sm:ml-auto sm:w-44" />}</ContentBlock>
            <ContentBlockGrid><ContentBlock title={t('CLUB_CONTACT')}>{contacts.length ? <ul className="space-y-2">{contacts.map((item, index) => <li key={`${item.type}-${index}`} className="grid grid-cols-[7rem_1fr] gap-3"><span className="font-bold text-themeColor">{item.type}</span><span className="break-all">{item.num}</span></li>)}</ul> : <p className="text-gray-500">{copy.noContactHelp}</p>}</ContentBlock><ContentBlock title={t('CLUB_PHOTOS')} className="max-[1022px]:mt-5">{club?.club_photos_list?.length ? <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{club.club_photos_list.map((item, index) => <button type="button" key={item} onClick={() => window.open(BASE_HOST + item, '_blank')} className="relative overflow-hidden rounded-md"><img src={BASE_HOST + item} alt={`${t('CLUB_PHOTOS')} ${index + 1}`} className="h-24 w-full object-cover" />{index === 0 && <span className="absolute bottom-1 left-1 rounded bg-black/60 px-2 py-1 text-xs text-white">{copy.appCover}</span>}</button>)}</div> : <p className="text-gray-500">{copy.noPhotosHelp}</p>}</ContentBlock></ContentBlockGrid>
        </AfterLoading>
        <AfterLoading isLoading={loading.activities}><ContentBlock className="mt-5" title={t('CLUB_ACTIVITIES')} feature={{ icon: ArrowsRightLeftIcon, desc: copy.sortCurrent(displayMode === 'by_createtime' ? copy.sortCreated : copy.sortStart), func: () => setDisplayMode(displayMode === 'by_createtime' ? 'by_starttime' : 'by_createtime') }}>{activities.length === 0 ? <div className="rounded-lg bg-themeColorUltraLight p-5"><SecondTitle>{copy.noActivityTitle}</SecondTitle><p className="mt-2 text-gray-600">{copy.noActivityHelp}</p><button type="button" onClick={() => router.push('./newActivity')} className="mt-4 font-bold text-themeColor hover:underline">{copy.createFirstActivity}</button></div> : displayMode === 'by_starttime' ? Object.entries(separated).map(([type, list]) => type !== 'SEPACT_ERROR' && <div key={type} className="mt-5"><ThirdTitle>{t(type)}</ThirdTitle>{list.length ? <div className="flex flex-wrap gap-4">{list.map((item, index) => <ActivityCard key={item._id || index} item={item} index={index} />)}</div> : <p className="p-3 text-gray-500">{t(`${type}_PROMPT`)}</p>}</div>) : <div className="flex flex-wrap gap-4">{activities.map((item, index) => <ActivityCard key={item._id || index} item={item} index={index} />)}</div>}</ContentBlock></AfterLoading>
        <Footer />
    </ARKMain>;
};
export default ClubInfo;
