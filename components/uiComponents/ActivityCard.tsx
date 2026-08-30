import React, { MouseEvent } from 'react';
import { ActivityBase } from '../../types/index.d';
import { BASE_HOST } from '../../utils/pathMap';
import moment from 'moment-timezone';
import { CalendarDaysIcon, LinkIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { useLoginStore } from '../../states/state';
import { useTranslation } from 'react-i18next';
import { getClubManagementCopy } from '../../utils/clubManagementCopy';

export const ActivityCard = (props: { item: ActivityBase, index: number }) => {
    const { i18n } = useTranslation();
    const copy = getClubManagementCopy(i18n.resolvedLanguage);
    const router = useRouter();
    const s_clubNum = useLoginStore(state => state.curID);
    const { item } = props;
    const startdatetime = moment.utc(item.startdatetime).tz('Asia/Shanghai').format('YYYY/MM/DD HH:mm');
    const enddatetime = moment.utc(item.enddatetime).tz('Asia/Shanghai').format('YYYY/MM/DD HH:mm');
    const isWebsite = item.type === 'WEBSITE';
    const onClickActivityCard = (event: MouseEvent<HTMLDivElement>) => { event.preventDefault(); localStorage.setItem('CurActivity', JSON.stringify(item)); router.push(`activityDetail?activity_id=${item._id}&club_num=${s_clubNum}`); };

    return <div key={props.index} role="button" tabIndex={0} onClick={onClickActivityCard} onKeyDown={(event) => event.key === 'Enter' && onClickActivityCard(event as unknown as MouseEvent<HTMLDivElement>)} className="flex w-full max-w-[18rem] flex-col rounded-xl bg-themeColorUltraLight p-3 transition-all hover:cursor-pointer hover:scale-[1.01] hover:shadow-lg dark:bg-[#2c394a]">
        <img src={BASE_HOST + item.cover_image_url} alt={`${item.title} ${copy.appEventCover}`} className="h-52 w-full rounded-lg object-cover shadow-md" style={{ backgroundColor: '#fff' }} />
        <div className="mt-3 flex items-start justify-between gap-2"><h3 className="line-clamp-2 text-lg font-bold text-themeColor">{item.title}</h3><span className="shrink-0 rounded-full bg-white px-2 py-1 text-xs font-bold text-themeColor dark:bg-slate-700">{isWebsite ? copy.cardWebsite : copy.cardActivity}</span></div>
        <div className="mt-3 space-y-2 border-t border-themeColorLight pt-3 text-sm text-gray-700 dark:text-gray-100"><div className="flex gap-2"><CalendarDaysIcon className="h-5 w-5 shrink-0 text-themeColor" /><div><p>{startdatetime}</p><p className="opacity-70">→ {enddatetime}</p></div></div><div className="flex gap-2">{isWebsite ? <LinkIcon className="h-5 w-5 shrink-0 text-themeColor" /> : <MapPinIcon className="h-5 w-5 shrink-0 text-themeColor" />}<p className="break-all">{isWebsite ? (item.link || copy.unsetLink) : (item.location || copy.unsetLocation)}</p></div></div>
    </div>;
};
