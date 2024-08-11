// 包引用
import React, { useState, useEffect } from 'react';
import {
    PencilSquareIcon,
    PlusCircleIcon,
} from "@heroicons/react/24/solid";

// 本地引用
import { BASE_HOST, GET } from '../../utils/pathMap';
import { getClubXX } from '../../lib/serverActions';
import { IGetActivitiesByClub, IGetClubInfo } from '../../types/index.d';
import { authGuard } from '../../lib/authentication';

// UI組件
import NavBarSecondary from '../../components/navBarSecondary';
import Footer from "../../components/footer";
import { AfterLoading } from '../../components/uiComponents/AfterLoading';
import { ActivityCard } from '../../components/uiComponents/ActivityCard';
import { StdButton, StdButtonGrid } from '../../components/uiComponents/StdButton';
import { ARKMain, ContentBlock, ContentBlockGrid, IFELSE } from '../../components/uiComponents/ContentBlock';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useLoginStore } from '../../states/state';

const ClubInfo = () => {
    // 翻譯、路由
    const { t } = useTranslation();
    const router = useRouter();

    // 全局存儲club number
    const s_clubNum = useLoginStore(state => state.curID);

    // 社團内容、活動列表
    const [clubContentData, setContentData] = useState<IGetClubInfo | undefined>(void 0);   //社團內容，如聯繫方式等
    const [clubActivities, setClubActivities] = useState<IGetActivitiesByClub | undefined>(void 0); //社團活動列表

    // 加載狀態
    const [loadingStates, setLoadingStates] = useState<{ clubcontent: boolean, activity: boolean }>({ clubcontent: true, activity: true });

    // 獲取數據
    const fetchData = async () => {
        const clubNum = authGuard({ urlParamName: "club_num", compareValue: s_clubNum }, router);

        try {
            await Promise.all([
                getClubXX(clubNum, GET.CLUB_INFO_NUM, setContentData, t("ERR_NO_CLUB_INFO")),
                getClubXX(clubNum, GET.EVENT_INFO_CLUB_NUM, setClubActivities, t("ERR_NO_CLUB_ACTIVITY"))
            ]);
        } catch (error) {
            console.error('Fetch data error:', error);
        } finally {
            setLoadingStates(state => ({ ...state, clubcontent: false, activity: false }));
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <ARKMain title={clubContentData?.content.name}>

            {/* 二級頂欄 */}
            <NavBarSecondary returnLocation={'/clubsignin'} clearLocStorage />

            {/* 社團基本訊息 */}
            <AfterLoading isLoading={loadingStates.clubcontent}>
                {/* 歡迎詞 */}
                <div>
                    <h3 className="text-themeColor text-2xl font-bold text-center">
                        {`${t("WELCOME")}${t(",")} `}
                        {clubContentData?.content.name ? (clubContentData.content.name) : t("CLUB")}
                        {`${t("CLUB_OWNER")}!`}
                    </h3>
                </div>

                {/* 封面圖 */}
                <div className="flex justify-center mt-10">
                    {clubContentData?.content.club_photos_list[0] ? (
                        <div key="0" className="flex flex-col mx-auto">
                            <img src={`${BASE_HOST + clubContentData.content.club_photos_list[0]}`} alt="club_photos" className="sm:max-w-64 md:max-w-96 rounded-lg h-auto shadow-lg" style={{ backgroundColor: '#fff' }} />
                        </div>
                    ) : (
                        <p>{t("CLUB_NO_COVER_IMG")}</p>
                    )}
                </div>

                {/*操作陣列*/}
                <StdButtonGrid>
                    {/* 編輯按鈕*/}
                    <StdButton
                        color="bg-themeColor"
                        onClickFunc={() => { router.push(`./clubInfoEdit?club_num=${s_clubNum}`); }}
                        textContent={t("EDIT")}
                        Icon={PencilSquareIcon} />

                    {/* 添加按鈕*/}
                    <StdButton
                        color="bg-themeColor"
                        onClickFunc={() => { router.push(`./newActivity?club_num=${s_clubNum}`); }}
                        textContent={t("NEW_ACTIVITY")}
                        Icon={PlusCircleIcon} />
                </StdButtonGrid>

                {/* 社團訊息 */}
                <ContentBlock styles={{ withTitle: false }} className={"flex"}>
                    {/*社團Logo*/}
                    <img
                        className="w-24 h-24 rounded-full "
                        style={{ backgroundColor: '#fff' }}
                        src={BASE_HOST + (clubContentData && clubContentData.content.logo_url)}
                    />

                    {/*社團訊息*/}
                    <div className="ml-10">
                        {/* 社團名字*/}
                        <p className="text-xl text-themeColor font-bold">
                            {clubContentData?.content.name}
                        </p>

                        {/* 社團Tag */}
                        <span className="text-themeColor bg-themeColorUltraLight rounded-full text-center px-3">
                            {clubContentData && clubContentData.content.tag}
                        </span>

                        {/* 社團簡介*/}
                        <p className="mt-3">
                            {clubContentData?.content.intro || t("CLUB_NO_INTRO")}
                        </p>
                    </div>
                </ContentBlock>

                {/* 社團內容展示（聯繫方式和圖片的分欄） */}
                <ContentBlockGrid>

                    {/*聯繫方式(只展示不為空的聯繫方式) */}
                    <ContentBlock title={t("CLUB_CONTACT")}>
                        <ul>
                            {clubContentData && clubContentData.content.contact.length != 0 ? (
                                clubContentData.content.contact.filter(item => item.type && item.num).map((item, index) => (
                                    <li key={index} >
                                        <div className="grid grid-cols-2 gap-3 max-w-48 sm:mr-64">
                                            <p className={`text-themeColor font-bold text-right`}>{item.type}</p>
                                            <p className={`text-left`}>{item.num}</p>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <div className={`text-gray-500`}>
                                    {t("CLUB_NO_CONTACT")}
                                </div>
                            )}
                        </ul>
                    </ContentBlock>

                    {/* 社團圖片 */}
                    <ContentBlock title={t("CLUB_PHOTOS")} className={`max-[1022px]:mt-5`}>
                        <IFELSE condition={clubContentData != void 0 && clubContentData?.content.club_photos_list.length != 0}>
                            <div className="grid xl:grid-cols-5 sm:grid-cols-3 gap-4 ">
                                {clubContentData?.content.club_photos_list.map((item, index) => (
                                    <img
                                        key={index}
                                        src={BASE_HOST + item}
                                        className={`w-40 h-24 rounded-md hover:scale-[1.05] transition-all hover:cursor-pointer mx-auto object-cover`}
                                        title={`查看圖片`}
                                        onClick={() => {
                                            window.open(BASE_HOST + item, "_blank");
                                        }} />
                                ))}
                            </div>
                            <div className={`text-gray-500`}>
                                {t("CLUB_NO_PHOTOS")}
                            </div>
                        </IFELSE>
                    </ContentBlock>
                </ContentBlockGrid>
            </AfterLoading>

            {/* 社團活動 */}
            <AfterLoading isLoading={loadingStates.activity}>
                <ContentBlock className={"mt-5"} title={t("CLUB_ACTIVITIES")}>
                    {/* 渲染活動格子*/}
                    <div className="grid 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4 ">
                        <IFELSE condition={clubActivities?.content?.length && clubActivities?.content?.length > 0}>
                            {clubActivities?.content.map((item, index) => (
                                <ActivityCard key={index} item={item} index={index}></ActivityCard>
                            ))}
                            <p>{t("CLUB_NO_ACTIVITY")}</p>
                        </IFELSE>
                    </div>
                </ContentBlock>
            </AfterLoading>

            {/*頁尾*/}
            <Footer />
        </ARKMain>
    );
}

export default ClubInfo;