// 包引用
import React, { useEffect, useMemo } from 'react';
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import moment from 'moment/moment';

// 本地引用
import NavBarSecondary from '../../components/navBarSecondary';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ARKMain, ContentBlock, ContentBlockGrid } from '../../components/uiComponents/ContentBlock';
import { ARKImageInput, ARKLabeledInput, ARKListImageInput, ARKTextareaInput } from '../../components/uiComponents/Inputs';
import { createActivity } from '../../lib/serverActions';
import { StdButton } from '../../components/uiComponents/StdButton';
import { _ICreateActivity } from '../../types/index.d';
import { authGuard } from '../../lib/authentication';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useLoginStore } from '../../states/state';

// 活動類型映射
const activityTypeMap = {
    ACTIVITY: "普通活動",
    WEBSITE: "網頁"
    // OFFICIAL: "澳大官方",
};

const titleStyle = `border-4 border-themeColor rounded-lg h-11 p-2 ontline-none`;
const inputStyle = `${titleStyle} w-full`;
const textareaStyle = "text-lg block w-full h-80 border-4 rounded-lg p-2 resize-none min-h-32 outline-none max-[512px]:text-md";

const NewActivity = () => {
    // 翻譯、路由
    const { t } = useTranslation();
    const router = useRouter();

    // 全局存儲club num
    const s_clubNum = useLoginStore(state => state.curID);

    // 表單配置
    const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm<_ICreateActivity>({
        defaultValues: {
            title: "",
            cover_image_file: void 0,
            sDate: moment().format("YYYY-MM-DD"),
            sTime: moment().format("HH:mm"),
            eDate: moment().format("YYYY-MM-DD"),
            eTime: moment().format("HH:mm"),
            location: "",
            link: "",
            type: "ACTIVITY",
            introduction: "",
            add_relate_image: []
        }
    });

    // 驗證權限
    useEffect(() => {
        // authGuard({ urlParamName: "club_num", compareValue: s_clubNum }, router);
    }, []);

    // 提交活動
    const onSubmit: SubmitHandler<_ICreateActivity> = async (_data: _ICreateActivity) => {
        await createActivity(_data, s_clubNum);
    };

    const selectedType = watch("type");

    return (
        <ARKMain>
            <NavBarSecondary returnLocation={`./clubInfo`} />
            <form className={`flex flex-col gap-4`} onSubmit={handleSubmit(onSubmit)}>
                {/* 活動名稱 */}
                <input
                    className={`${titleStyle} text-3xl max-[512px]:text-xl mx-auto`}
                    placeholder={t("ACTIVITY_TITLE")}
                    {...register("title",
                        {
                            required: t("ACTIVITY_TITLE_REQUIRE"),
                            minLength: { value: 2, message: "標題不能少於2字！" },
                            maxLength: { value: 50, message: "標題不能超過50字！" }
                        })} />
                <div className={"text-alert text-center mx-auto mb-1"}>{errors.title && errors.title.message}</div>

                {/* 封面圖片 */}
                <ARKImageInput
                    base={{ regName: "cover_image_file", isRequired: true }}
                    register={register}
                    setValue={setValue}
                    errText={t("ACTIVITY_COVER_IMG_REQUIRE")}
                    thisErr={errors.cover_image_file} />
                <div className={"text-alert text-center mx-auto mb-1"}>{errors.cover_image_file && errors.cover_image_file.message}</div>

                <ContentBlockGrid gridNum={selectedType == "WEBSITE" ? 1 : 2}>

                    {/* 基本訊息 */}
                    <ContentBlock title={t("ACTIVITY_BASIC_INFO")}>
                        {/* 類型 */}
                        <ARKLabeledInput title={t("ACTIVITY_TYPE")}>
                            <select
                                className={`${inputStyle}`}
                                {...register("type")}>
                                {Object.keys(activityTypeMap).map(key => (
                                    <option value={key}>{activityTypeMap[key]}</option>
                                ))}
                            </select>
                        </ARKLabeledInput>

                        {/* 開始時間 */}
                        <ARKLabeledInput title={t("TIME_START")}>
                            <input
                                className={inputStyle}
                                type={"date"}
                                {...register("sDate")} />
                            <input
                                className={inputStyle}
                                type={"time"}
                                {...register("sTime")} />
                        </ARKLabeledInput>

                        {/* 結束時間 */}
                        <ARKLabeledInput title={t("TIME_END")}>
                            <input
                                className={inputStyle}
                                type={"date"}
                                {...register("eDate")} />
                            <input
                                className={inputStyle}
                                type={"time"}
                                {...register("eTime")} />
                        </ARKLabeledInput>

                        {/* 地點 */}
                        <ARKLabeledInput title={t("LOCATION")} condition={selectedType == "ACTIVITY"}>
                            <input
                                className={inputStyle}
                                {...register("location",
                                    {
                                        required: selectedType == "ACTIVITY" ? t("LOCATION_REQUIRE") : false,
                                        maxLength: { value: 100, message: "地點不能超過100字！" }
                                    })} />

                            <div className={`${watch("location")?.length > 100 ? `text-alert` : `text-themeColor`} font-bold ${selectedType == "WEBSITE" && "hidden"}`}>
                                {`${watch("location")?.length}/${100}`}
                            </div>
                        </ARKLabeledInput>
                        {selectedType == "ACTIVITY" && (<div className={"text-alert"}>{errors.location && errors.location.message}</div>)}


                        {/* 鏈接 */}
                        <ARKLabeledInput title={t("LINK")} condition={selectedType == "WEBSITE"}>
                            <input
                                className={inputStyle}
                                type={"url"}
                                {...register("link", { required: selectedType == "WEBSITE" ? t("LINK_REQUIRE") : false })} />

                            {selectedType == "WEBSITE" && (<div className={"text-alert"}>{errors.link && errors.link.message}</div>)}
                        </ARKLabeledInput>
                    </ContentBlock>

                    {/* 簡介 */}
                    <ContentBlock title={t("ACTIVITY_INTRO")} condition={selectedType == "ACTIVITY"} className={"max-[1022px]:mt-5"}>
                        <ARKTextareaInput
                            base={{
                                placeholder: t("ACTIVITY_INTRO"),
                                numLimit: 1000,
                                isRequired: selectedType == "ACTIVITY"
                            }}
                            regName={`introduction`}
                            errors={errors}
                            requirePrompt={t('ACTIVITY_INTRO_REQUIRE')}
                            register={register}
                            watch={watch} />
                    </ContentBlock>

                </ContentBlockGrid>

                {/* 相關圖片 */}
                <ContentBlock title={t("ACTIVITY_PHOTOS")} condition={selectedType == "ACTIVITY"}>
                    <ARKListImageInput
                        base={{ regName: "add_relate_image", isRequired: false, numLimit: 5 }}
                        register={register}
                        imgList={watch("add_relate_image")}
                        setValue={setValue}
                        errText={""}
                        thisErr={errors.add_relate_image} />
                </ContentBlock>

                <StdButton textContent={t("UPLOAD")} Icon={ArrowUpIcon} />



            </form>
        </ARKMain>
    );
}

export default NewActivity;