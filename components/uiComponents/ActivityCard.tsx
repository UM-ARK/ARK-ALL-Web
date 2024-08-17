import React from "react";
import { MouseEvent } from "react";
import { ActivityBase } from "../../types/index.d";
import { BASE_HOST } from '../../utils/pathMap';
import moment from "moment-timezone";
import { LinkIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useLoginStore } from "../../states/state";
import Link from "next/link";

/**
 * ARK活動卡片。
 * @param {*} props
 * @prop {ActivityBase} item - API返回的Activity的對象類型，包含多個值。具體請參閲[Interfaces](../../types/index.d.tsx)
 * @prop {int} index - 卡片的序號，由渲染卡片外部的map函數定義，使用時傳入。
 * @prop {string} loginClubNum - 當前登錄的社團賬號。 
 * @returns 
 */
export const ActivityCard = (props: { item: ActivityBase, index: number }) => {
    const { t } = useTranslation();
    const router = useRouter();
    const s_clubNum = useLoginStore(state => state.curID);

    const { item, index } = props;

    const startdatetime_ = moment.utc(item.startdatetime).tz('Asia/Shanghai');
    const enddatetime_ = moment.utc(item.enddatetime).tz('Asia/Shanghai');

    /**
     * 用戶點擊卡片跳轉。
     * @param {event} event 事件
     * @param {object} activityData  活動數據 
     */
    const onClickActivityCard = (event: MouseEvent<HTMLDivElement>, activityData: object) => {
        localStorage.setItem("CurActivity", JSON.stringify(activityData));
        router.push(`activityDetail?activity_id=${item._id}&club_num=${s_clubNum}`);
    }

    return (
        <div
            key={index}
            className="w-[17.5rem] bg-themeColorUltraLight dark:bg-[#2c394a] flex flex-col p-3 rounded-lg mx-auto hover:cursor-pointer hover:shadow-lg hover:scale-[1.01] transition-all"
            onClick={(event: MouseEvent<HTMLDivElement>) => onClickActivityCard(event, item)}>

            <div className="flex flex-col lg:w-48 xl:w-64 md:w-48 sm:w-64 items-center">
                {/*活動封面*/}
                <div>
                    <img
                        src={BASE_HOST + item.cover_image_url}
                        alt="club_photos"
                        className=" hover:cursor-pointer w-48 h-64 object-cover rounded-lg mb-5 shadow-lg"
                        style={{ backgroundColor: '#fff' }} />
                </div>

                {/*活動標題*/}
                <div className=" flex flex-wrap gap-1 mx-auto items-center h-[2rem] overflow-hidden">
                    <h3 className="text-themeColor text-xl text-center font-bold text-ellipsis overflow-hidden">
                        {item.title}
                    </h3>
                    {item.type == "WEBSITE" && <LinkIcon className={" w-5 h-5 -right-2 top-2 text-themeColor drop-shadow-2xl drop-shadow-md"} />}
                </div>

                {/* 時間地點 */}
                <div className="flex flex-col border-t-2 border-themeColorLight items-left font-bold text-themeColor opacity-80">
                    <p className="text-left text-center opacity-60">
                        {item.type == "ACTIVITY" ? "活動" : "網站"}
                    </p>
                    <div className={`flex flex-row items-center justify-center gap-3`}>
                        <div className={`text-right flex flex-col`}>
                            <div><p>{`From:`}</p></div>
                            <div><p>{`To:`}</p></div>
                            {item.type == "ACTIVITY" ? (
                                <div><p>{`Loc:`}</p></div>
                            ) : (
                                <div><p>{`Link:`}</p></div>
                            )}
                        </div>
                        <div className={`text-left flex flex-col`}>
                            <div>
                                <p>{startdatetime_.format("YYYY-MM-DD HH:mm")}</p>
                            </div>
                            <div>
                                <p>{enddatetime_.format("YYYY-MM-DD HH:mm")}</p>
                            </div>
                            <div className={`max-w-36 overflow-hidden`}>
                                <p>
                                    {item.type == "ACTIVITY" ? (
                                        item.location || <i className={"opacity-60"}>Unknown</i>
                                    ) : (
                                        <Link href={item.link} className={`text-sm`}>{item.link}</Link> ||
                                        <i className={`opacity-60`}>Unknown</i>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
