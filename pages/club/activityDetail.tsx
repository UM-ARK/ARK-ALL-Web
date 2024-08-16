// 包引用
import React, { useState, useEffect } from 'react';
import {
    PencilSquareIcon,
    TrashIcon,
    ArrowUpIcon,
} from "@heroicons/react/24/solid";
import moment from 'moment';
import qs from 'qs';

// 本地引用
import { BASE_HOST } from '../../utils/pathMap';
import { editActivity } from "../../lib/serverActions";
import { parseDateTime } from '../../utils/functions/u_format';
import { SubmitHandler, useForm } from 'react-hook-form';
import { _IEditActivity, IGetAvtivityById } from '../../types/index.d';
import { authGuard } from '../../lib/authentication';
import { deleteActivity, getActivityById } from '../../lib/serverActions';

// UI 組件
import { AfterLoading } from '../../components/uiComponents/AfterLoading';
import Footer from "../../components/footer";
import NavBarSecondary from '../../components/navBarSecondary';
import { StdButton, StdButtonGrid } from '../../components/uiComponents/StdButton';
import { ARKMain, ContentBlock, ContentBlockGrid, IF, IFELSE } from '../../components/uiComponents/ContentBlock';
import { SecondTitle } from '../../components/uiComponents/LayeredTitles';
import { ARKImageInput, ARKLabeledInput, ARKListImageInput, ARKTextareaInput } from '../../components/uiComponents/Inputs';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useLoginStore } from '../../states/state';


const ActivityDetail = () => {
    console.log("refresh");
    const { t } = useTranslation();
    const router = useRouter();

    // 登錄社團賬號
    const s_clubNum = useLoginStore(state => state.curID);

    // 獲取活動的數據
    const [m_activityData, setActivityData] = useState<IGetAvtivityById>(null);

    const [isEditMode, setEditMode] = useState(false);          // 是否為編輯模式

    // 加載中？
    const [isLoading, setIsLoading] = useState(true);

    const { register, handleSubmit, setValue, formState: { errors }, reset, watch } = useForm<_IEditActivity>();

    // 獲取活動數據
    useEffect(() => {
        const clubNum = authGuard({ urlParamName: "club_num", compareValue: s_clubNum }, router);
        const activityID = qs.parse(window.location.search, { ignoreQueryPrefix: true })['activity_id'];
        getActivityById(activityID, setActivityData).then(() => { setIsLoading(false) });
    }, []);

    // 將默認值填充表單
    useEffect(() => {
        if (!m_activityData) {
            return;
        }

        // 將活動數據轉換為表單數據
        let {
            _id,
            relate_image_url,
            club_name,
            created_by,
            startdatetime,
            enddatetime,
            timestamp,
            state,
            ..._base } = m_activityData?.content;

        let startdatetime_ = parseDateTime(startdatetime);
        let enddatetime_ = parseDateTime(enddatetime);

        let base = {
            ..._base,
            id: m_activityData?.content._id,
            add_relate_image: [],
            del_relate_image: [],
            sDate: startdatetime_.date,
            sTime: startdatetime_.time,
            eDate: enddatetime_.date,
            eTime: enddatetime_.time
        }
        reset(base);
    }, [m_activityData, isEditMode]);


    const onSubmit: SubmitHandler<_IEditActivity> = async (_data: _IEditActivity) => {
        try {
            await editActivity(_data, s_clubNum);
        } catch (err) {
            alert("上傳編輯失敗，請檢查網絡，或重試。");
            return null;
        }
    }

    return (
        <ARKMain>
            {/* 頂欄*/}
            <NavBarSecondary returnLocation={`./clubInfo`} returnStr={t("PG_CLUB_INFO")}></NavBarSecondary>
            <form onSubmit={handleSubmit(onSubmit)}>
                <AfterLoading isLoading={isLoading}>

                    {/* 社團名字+活動標題*/}
                    <div className="flex flex-col items-center text-themeColor font-bold mb-5">
                        {/* 活動標題 */}
                        <IFELSE condition={!isEditMode}>
                            <h1 className="text-3xl">
                                {m_activityData?.content.title}
                            </h1>
                            <div>
                                <input
                                    placeholder={t("ACTIVITY_TITLE")}
                                    className="text-3xl max-[512px]:text-xl border-4 border-themeColor rounded-lg h-10 p-2"
                                    {...register("title",
                                        {
                                            required: t("ACTIVITY_TITLE_REQUIRE"),
                                            minLength: { value: 2, message: "標題不能少於2字！" },
                                            maxLength: { value: 50, message: "標題不能超過50字！" }
                                        })} />
                                <div className={"text-alert text-center mx-auto mb-1"}>{errors.title && errors.title.message}</div>
                            </div>
                        </IFELSE>

                        {/* 社團名字 */}
                        <h3 className="text-xl mb-3">
                            {'By ' + (m_activityData?.content.club_name)}
                        </h3>
                    </div>

                    {/* 封面圖片 */}
                    <IFELSE condition={!isEditMode}>
                        <div
                            className="flex flex-col w-96 h-96 max-[512px]:w-64 max-[512px]:h-64 items-center justify-center mx-auto drop-shadow-lg bg-themeColorUltraLight dark:bg-gray-700 rounded-lg min-h-24 hover:cursor-pointer hover:scale-[1.005] transition-all"
                            style={{
                                backgroundImage: `url("${BASE_HOST + m_activityData?.content.cover_image_url}")`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                            }} />

                        <ARKImageInput
                            base={{
                                regName: "cover_image_file",
                                initialImgURL: BASE_HOST + m_activityData?.content.cover_image_url,
                            }}
                            register={register}
                            setValue={setValue}
                            errText={errors.cover_image_file?.message}
                            thisErr={errors.cover_image_file} />
                    </IFELSE>


                    {/*操作陣列*/}
                    <StdButtonGrid>
                        {/* 編輯按鈕*/}
                        <StdButton
                            color="bg-themeColor"
                            onClickFunc={() => { setEditMode(!isEditMode); }}
                            textContent={isEditMode ? t("BTN_EDIT_DISCARD") : t("BTN_EDIT")}
                            Icon={PencilSquareIcon}
                            type={"button"} />

                        {/* 刪除活動按鈕*/}
                        <StdButton
                            color="bg-alert"
                            onClickFunc={() => { deleteActivity(m_activityData?.content._id, s_clubNum, '確定刪除活動?'); }}
                            textContent={t("BTN_ACTIVITY_DEL")}
                            Icon={TrashIcon}
                            condition={isEditMode}
                            type={"button"} />
                    </StdButtonGrid>

                    {/* 時間和介紹 */}
                    <ContentBlockGrid
                        gridNum={(!m_activityData || m_activityData?.content.type != 'WEBSITE') ? 2 : 1}>
                        {/*開始和結束時間*/}
                        <ContentBlock title={t("ACTIVITY_BASIC_INFO")}>

                            {/* 開始時間和結束時間*/}
                            <ARKLabeledInput title={t("TIME_START")}>
                                <IFELSE condition={!isEditMode}>

                                    <p className={`max-[430px]:text-center`}>{m_activityData && moment(m_activityData.content.startdatetime).format("YYYY-MM-DD HH:mm")}</p>
                                    <div className={"flex flex-row gap-2"}>
                                        <input
                                            type={"date"}
                                            className={"border-4 border-themeColor rounded-lg h-10 p-2"}
                                            {...register("sDate")}
                                        />
                                        <input
                                            type={"time"}
                                            className={"border-4 border-themeColor rounded-lg h-10 p-2"}
                                            {...register("sTime")}
                                        />
                                    </div>
                                </IFELSE>
                            </ARKLabeledInput>
                            <ARKLabeledInput title={t("TIME_END")}>
                                <IFELSE condition={!isEditMode}>
                                    <p className={`max-[430px]:text-center`}>{m_activityData && moment(m_activityData.content.enddatetime).format("YYYY-MM-DD HH:mm")}</p>
                                    <div className={"flex flex-row gap-2"}>
                                        <input
                                            type={"date"}
                                            className={"border-4 border-themeColor rounded-lg h-10 p-2"}
                                            {...register("eDate")}
                                        />
                                        <input
                                            type={"time"}
                                            className={"border-4 border-themeColor rounded-lg h-10 p-2"}
                                            {...register("eTime")}
                                        />
                                    </div>
                                </IFELSE>
                            </ARKLabeledInput>

                            {/* 地點或鏈接 */}
                            <IFELSE condition={m_activityData?.content.type != 'WEBSITE'}>
                                {/*非網頁 - 顯示地點 */}
                                <ARKLabeledInput title={t("LOCATION")}>
                                    <IFELSE condition={!isEditMode}>
                                        {m_activityData?.content.location}
                                        <div>
                                            <input
                                                placeholder={t("LOCATION")}
                                                className="text-lg border-4 border-themeColor rounded-lg h-10 p-2"
                                                {...register("location", {
                                                    maxLength: { value: 100, message: "地點不能超過100字！" }
                                                })} />
                                            <div className={`${watch("location")?.length > 100 ? `text-alert` : `text-themeColor`} font-bold`}>
                                                {`${watch("location")?.length}/${100}`}
                                            </div>
                                            <div className={"text-alert"}>{errors.location && errors.location.message}</div>
                                        </div>
                                    </IFELSE>
                                </ARKLabeledInput>

                                {/*網頁 - 顯示鏈接 */}
                                <ARKLabeledInput title={t("LINK")}>
                                    <IFELSE condition={!isEditMode}>
                                        {(m_activityData && (
                                            <a href={m_activityData.content.link} target="_blank">
                                                {m_activityData.content.link}
                                            </a>
                                        ))}
                                        <input
                                            placeholder={t("LINK")}
                                            className="text-lg border-4 border-themeColor rounded-lg h-10 p-2"
                                            {...register("link")} />
                                    </IFELSE>
                                </ARKLabeledInput>
                            </IFELSE>
                        </ContentBlock>

                        {/*活動介紹*/}
                        <ContentBlock
                            title={t("ACTIVITY_INTRO")}
                            className={"max-[1022px]:mt-5"}
                            condition={!m_activityData || m_activityData.content.type != 'WEBSITE'}>
                            <IFELSE condition={!isEditMode}>
                                <p className="text-ellipsis overflow-hidden whitespace-pre-wrap">
                                    {m_activityData && m_activityData?.content.introduction}
                                </p>
                                <ARKTextareaInput
                                    base={{
                                        placeholder: t("ACTIVITY_INTRO"),
                                        numLimit: 1000,
                                        isRequired: false
                                    }}
                                    regName={`introduction`}
                                    errors={errors}
                                    requirePrompt={t('ACTIVITY_INTRO_REQUIRE')}
                                    register={register}
                                    watch={watch} />
                            </IFELSE>
                        </ContentBlock>
                    </ContentBlockGrid>

                    {/* 相關圖片 (如果沒有相關圖片就不展示該模塊) */}
                    <ContentBlock
                        title={t("ACTIVITY_PHOTOS")}
                        condition={m_activityData && watch("type") != "WEBSITE" && (m_activityData.content.relate_image_url.length > 0 || isEditMode)}
                        className={`mt-5`}>

                        {/* 刪除圖片 */}
                        <div>
                            {isEditMode && (<SecondTitle>{t("ACTIVITY_PHOTOS_PRESENT")}</SecondTitle>)}
                            {/** 初次編輯提示 */}
                            {!m_activityData || m_activityData?.content.relate_image_url.length == 0 && (
                                <div className={`text-gray-500 p-3 max-w-[45rem]`}>
                                    {t("ACTIVITY_PHOTOS_FIRST_EDIT")}
                                </div>
                            )}
                            <div className="grid grid-cols-5 max-[876px]:grid-cols-4 max-[544px]:grid-cols-3 max-[400px]:grid-cols-2 gap-4 items-top justify-left mt-5">
                                {/* 相關圖片 */}
                                {m_activityData?.content.relate_image_url.map((url, index) =>
                                    <img
                                        key={index}
                                        src={BASE_HOST + url}
                                        title={`新標籤頁打開圖片`}
                                        className={`
                                            mx-auto w-40 h-24 rounded-md
                                             hover:scale-[1.05] transition-all 
                                             hover:cursor-pointer 
                                             ${watch("del_relate_image") && watch("del_relate_image").indexOf(url) != -1 && "hidden"} 
                                             object-cover`}
                                        onClick={() => {
                                            if (!isEditMode) {
                                                window.open(BASE_HOST + url, '_blank');
                                                return;
                                            }

                                            if (!watch("del_relate_image")) {
                                                setValue("del_relate_image", [url]);
                                                return;
                                            }

                                            // 圖片已經在列表中，將其移出列表
                                            if (watch("del_relate_image").indexOf(url) != -1) {
                                                let [url, ...rest] = watch("del_relate_image");
                                                setValue("del_relate_image", rest);
                                                return;
                                            }

                                            // 圖片不在列表中，將其推入列表
                                            setValue("del_relate_image", [...watch("del_relate_image"), url]);
                                        }} />
                                )}
                            </div>
                        </div>

                        {/* 新增圖片 */}
                        <IF condition={isEditMode && watch("type") != "WEBSITE"}>
                            <SecondTitle>{t("ACTIVITY_PHOTOS_NEW")}</SecondTitle>
                            <ARKListImageInput
                                base={
                                    {
                                        regName: "add_relate_image",
                                        isRequired: false,
                                        mode: "object",
                                        numLimit: 5 - m_activityData?.content.relate_image_url.length + (watch("del_relate_image") ? watch("del_relate_image").length : 0),
                                    }
                                }
                                register={register}
                                imgList={watch("add_relate_image")}
                                setValue={setValue}
                                errText={`${t("ERR_NUM_PHOTOS_EXCEED")} 5!`}
                                thisErr={errors.add_relate_image?.message}
                            />
                        </IF>
                    </ContentBlock>


                    {/*操作陣列*/}
                    <StdButtonGrid condition={isEditMode}>
                        {/* 上傳*/}
                        <StdButton type={"submit"} textContent={t("UPLOAD")} Icon={ArrowUpIcon} />
                    </StdButtonGrid>

                    <Footer />
                </AfterLoading>
            </form>
        </ARKMain>
    );
}

export default ActivityDetail;