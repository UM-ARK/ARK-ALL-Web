// 包引用
import React, { useState, useEffect } from 'react';
import {
    PlusCircleIcon,
    MinusCircleIcon,
    ArrowUpIcon,
    TrashIcon
} from "@heroicons/react/24/solid";

// 本地引用
import { BASE_URI, BASE_HOST, GET, POST } from '../../utils/pathMap';

// UI組件
import NavBarSecondary from '../../components/navBarSecondary';
import { ARKMain, ContentBlock, ContentBlockGrid } from '../../components/uiComponents/ContentBlock';
import { SecondTitle } from '../../components/uiComponents/LayeredTitles';
import { StdButton, StdButtonGrid } from '../../components/uiComponents/StdButton';

// 工具函數
import { upload } from '../../utils/functions/u_server';

// 設定
import { SubmitHandler, useForm } from 'react-hook-form';
import { authGuard } from '../../lib/authentication';
import { appendListToFormData, getClubXX } from '../../lib/serverActions';
import { IEditClubInfo, IGetClubInfo } from '../../types/index.d';
import { ARKListImageInput, ARKTextareaInput } from '../../components/uiComponents/Inputs';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';


export default function clubInfoEdit() {
    const { t } = useTranslation();
    const router = useRouter();

    const [m_clubData, setClubData] = useState<IGetClubInfo>(null);
    const { register, handleSubmit, setValue, formState: { errors }, watch, reset } = useForm<IEditClubInfo>();
    const _del_club_photos = watch("del_club_photos");

    // 獲取club number，驗證登錄
    useEffect(() => {
        const clubNum = authGuard({ urlParamName: "club_num" }, router);
        getClubXX(clubNum, GET.CLUB_INFO_NUM, setClubData, void 0, true);
    }, []);

    // 更新表單默認值
    useEffect(() => {
        reset({
            intro: m_clubData?.content.intro || "",
            contact: m_clubData?.content.contact || []
        });
    }, [m_clubData]);

    const onSubmit: SubmitHandler<IEditClubInfo> = async (_data: IEditClubInfo) => {

        // let fdata = createFormData(_data);

        // upload(fdata, BASE_URI + POST.CLUB_EDIT_INFO, void 0, `./clubInfo?club_num=${m_clubData?.content.club_num}`);

        // return;

        let fd = new FormData();

        //簡介
        fd.append("intro", watch("intro") || "");

        // 聯係方式
        appendListToFormData(fd, "contact", watch("contact"), "array");

        // 社團圖片 - 添加
        appendListToFormData(fd, "add_club_photos", watch("add_club_photos"), "object");

        // 社團圖片 - 減少
        appendListToFormData(fd, "del_club_photos", watch("del_club_photos"), "array");

        upload(fd, BASE_URI + POST.CLUB_EDIT_INFO, void 0, `./clubInfo?club_num=${m_clubData?.content.club_num}`);
    }

    return (
        <ARKMain title={"社團訊息編輯"}>
            {/* 頂欄*/}
            <NavBarSecondary returnLocation={`./clubInfo?club_num=${m_clubData?.content.club_num}`} returnStr={t("PG_CLUB_INFO")} />

            <form onSubmit={handleSubmit(onSubmit)}>
                <ContentBlockGrid>
                    {/* 基礎訊息 */}
                    <ContentBlock title={t("CLUB_BASIC_INFO")} condition={true}>
                        {/* 活動簡介 （Intro） */}
                        <div>
                            <SecondTitle>{t("CLUB_INTRO")}</SecondTitle>
                            <ARKTextareaInput
                                base={{
                                    placeholder: t("ACTIVITY_INTRO"),
                                    numLimit: 300,
                                    isRequired: false
                                }}
                                regName={`intro`}
                                errors={errors}
                                requirePrompt={t('ACTIVITY_INTRO_REQUIRE')}
                                register={register}
                                watch={watch} />
                        </div>


                        {/* 聯係方式 */}
                        <div>
                            <SecondTitle>{t("CLUB_CONTACT")}</SecondTitle>
                            <ul>
                                {
                                    watch("contact")?.map((item, index) => item.num != void 0 && (
                                        <div key={index} >
                                            <div className="flex flex-row max-[1280px]:flex-col gap-5 items-center mb-5">
                                                {/*方式：如email */}
                                                <input
                                                    className=" border-4 border-themeColor rounded-lg h-10 p-2"
                                                    placeholder={`聯係方式`}
                                                    {...register(`contact.${index}.type`)} />

                                                {/*内容：如example@example.com */}
                                                <input
                                                    className=" border-4 border-themeColor rounded-lg h-10 p-2"
                                                    placeholder={"内容"}
                                                    {...register(`contact.${index}.num`)} />

                                                {/* 刪除某個聯係方式*/}

                                                <MinusCircleIcon
                                                    className="w-10 h-10 text-alert hover:opacity-70 hover:cursor-pointer"
                                                    onClick={() => {
                                                        let _contact = watch("contact");
                                                        let contact = _contact.filter((item, i) => i != index);
                                                        setValue("contact", contact);
                                                    }} />
                                            </div>
                                        </div>
                                    ))
                                }
                            </ul>

                            {/* 添加聯係方式 */}
                            <StdButtonGrid>
                                <PlusCircleIcon
                                    className="w-10 h-10 text-themeColor hover:opacity-70 hover:cursor-pointer"
                                    onClick={() => {
                                        setValue("contact", (watch("contact") ? [...watch("contact"), { "type": "", "num": "" }] : [{ "type": "", "num": "" }]));
                                    }} />
                            </StdButtonGrid>

                            <br />
                        </div>
                    </ContentBlock>

                    {/* 相關圖片 (如果沒有相關圖片就不展示該模塊) */}
                    <ContentBlock title={t("CLUB_PHOTOS")} condition={true} className={`max-[1022px]:mt-5`}>

                        {/* 刪除圖片 */}
                        <div>
                            <SecondTitle>{t("CLUB_PHOTOS_PRESENT")}</SecondTitle>
                            <div className="grid grid-cols-4 gap-4 items-top justify-center mt-5">
                                {/* 相關圖片 */}
                                {m_clubData?.content.club_photos_list.map((url, index) =>
                                    <img
                                        key={index}
                                        src={BASE_HOST + url}
                                        className={`w-40 h-24 rounded-md hover:scale-[1.05] transition-all hover:cursor-pointer ${_del_club_photos && _del_club_photos.indexOf(url) != -1 && "hidden"} object-cover`}
                                        onClick={() => {

                                            if (!_del_club_photos) {
                                                setValue("del_club_photos", [url]);
                                                return;
                                            }

                                            // 圖片已經在列表中，將其移出列表
                                            if (_del_club_photos.indexOf(url) != -1) {
                                                let [url, ...rest] = _del_club_photos;
                                                setValue("del_club_photos", rest);
                                                return;
                                            }

                                            // 圖片不在列表中，將其推入列表
                                            setValue("del_club_photos", [..._del_club_photos, url]);
                                        }} />
                                )}
                            </div>
                        </div>

                        {/* 新增圖片 */}
                        <div>
                            <SecondTitle>{t("CLUB_PHOTOS_NEW")}</SecondTitle>
                            <ARKListImageInput
                                base={
                                    {
                                        regName: "add_club_photos",
                                        isRequired: false,
                                        mode: "object",
                                        numLimit: 5 - m_clubData?.content.club_photos_list.length + (_del_club_photos ? _del_club_photos.length : 0),
                                    }
                                }
                                register={register}
                                imgList={watch("add_club_photos")}
                                setValue={setValue}
                                errText={"圖片總數不能超過5張！"}
                                thisErr={errors.add_club_photos?.message}
                            />
                        </div>
                    </ContentBlock>
                </ContentBlockGrid>

                {/* 操作陣列 */}
                <StdButtonGrid>
                    {/* 上傳 */}
                    <StdButton
                        textContent={t("UPLOAD")}
                        Icon={ArrowUpIcon} />
                    <StdButton
                        textContent={t("BTN_EDIT_DISCARD")}
                        type={"button"}
                        Icon={TrashIcon}
                        onClickFunc={() => {
                            reset({
                                intro: m_clubData?.content.intro || "",
                                contact: m_clubData?.content.contact || []
                            });
                        }} />
                </StdButtonGrid>

            </form>
        </ARKMain>
    )
}
