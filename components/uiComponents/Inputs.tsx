import { useRef, useState } from "react";
import { IF } from "./ContentBlock";

import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { duplicateFile } from "../../utils/functions/u_format";
import React from "react";

const TextInputStyles = {
    border: {
        focused: "border-opacity-100",
        blurred: "border-opacity-50"
    },
    label: {
        focused: "text-md opacity-100",
        blurred: "text-sm opacity-80"
    }
}


/**
 * 基於reac-hook-form封裝的ARK標準表單輸入框。
 * @param {*} props 
 * @prop {placeholder:string, type:string, isRequired:bool} base - 基礎表單屬性
 * @prop {string} regName - 注冊名，用於辨識表單中不同的輸入框。
 * @prop {*} thisErr - 由UseFormState提供的errors項。
 * @prop {function} register - react-hook-form提供的register函數，將regName注冊到表單中。
 * @example
*   <ARKTextInput
        base={{ placeholder: t("CLUB_PWD"), type: "password", isRequired: true }}
        regName={"password"}
        thisErr={errors.password}
        errText={"請輸入密碼"}
        register={register}
    />
 * @returns 
 */
export const ARKTextInput = (props) => {
    // 表單屬性
    let { placeholder, type, isRequired } = props.base;
    let { regName, thisErr, errText, register } = props;

    // 樣式屬性
    let [m_borderStyle, setBorderStyle] = useState(TextInputStyles.border.blurred);
    let [m_labelStyle, setLabelStyle] = useState(TextInputStyles.label.blurred);

    let labelRef = useRef();

    return (
        <div>
            <p className={`text-themeColor font-bold ${m_labelStyle} transition-all`} ref={labelRef}>
                {placeholder}
            </p>
            <input
                className={`border-2 border-themeColor ${m_borderStyle} outline-none rounded-lg h-10 p-2`}
                placeholder={placeholder}
                type={type || "text"}
                {...register(regName, { required: isRequired ? (errText || "未正確輸入") : false })}

                onFocus={() => {
                    setBorderStyle(TextInputStyles.border.focused);
                    setLabelStyle(TextInputStyles.label.focused);
                }}
                onBlur={() => {
                    setBorderStyle(TextInputStyles.border.blurred);
                    setLabelStyle(TextInputStyles.label.blurred);
                }}>
            </input>

            <IF condition={thisErr}>
                <p className={"text-alert text-sm font-bold"}>
                    {errText || "未正確輸入！"}
                </p>
            </IF>

        </div>
    );
}

/**
 * 
 * @param {*} props 
 * @returns 
 */
export const ARKLabeledInput = (props) => {
    const { title, condition } = props;
    return (
        <IF condition={condition || condition == void 0}>
            <div className="flex items-center mb-3 gap-3">
                <span className="text-themeColor font-bold mr-5">
                    {props.title || "項目"}
                </span>
                {props.children}
            </div>
        </IF>
    );
}


export const ARKImageInput = (props: {
    base: {
        regName: string,
        isRequired?: boolean,
        initialImgURL?: string
    },
    register: any,
    setValue: any,
    errText: string,
    thisErr: any
}) => {
    const { regName, isRequired, initialImgURL } = props.base;
    const { register, setValue, errText, thisErr } = props;

    const [m_imageURL, setImageURL] = useState(void 0);
    const [m_iconDisplay, setIconDisplay] = useState(true);
    const imageInputRef = React.createRef<HTMLInputElement>();

    return (
        <div
            className="flex flex-col w-96 h-96 items-center justify-center mx-auto bg-themeColorUltraLight dark:bg-gray-700 rounded-lg border-4 border-themeColor border-dashed min-h-24 hover:cursor-pointer hover:opacity-50 hover:scale-[1.02] transition-all"
            style={{
                backgroundImage: `url(${m_imageURL || initialImgURL})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
            onClick={() => imageInputRef.current.click()}>

            {/* Icon 部分 */}
            <IF condition={m_iconDisplay && !initialImgURL}>
                <div className="flex flex-col justify-center">
                    <div className="flex items-center justify-center mb-2">
                        <PlusCircleIcon className="w-10 h-10 text-themeColor" />
                    </div>
                    <div>
                        <h3 className="font-bold text-xl text-themeColor">封面圖片</h3>
                    </div>
                </div>
            </IF>

            {/* 輸入邏輯部分 */}
            <input
                type={"file"}
                accept={"image/*"}
                className={"hidden"}
                {...register(regName, { required: isRequired ? (errText || "需要圖片") : false })}
                ref={imageInputRef}
                onChange={(e) => {
                    let fileObj = e.target.files[0];
                    if (!fileObj) {
                        return;
                    }
                    setIconDisplay(false);
                    setImageURL(URL.createObjectURL(fileObj));
                    setValue(regName, fileObj);
                }} />
        </div>
    );
}




/**
 * 基於react-hook-form封裝的ARK標準圖片列表輸入框。
 * @param {*} props 
 * @prop {{regName: string, isRequired: boolean, numLimit: int}} - 基礎表單屬性。
 * @prop {function} register - react-hook-form提供的register函數，將regName注冊到表單中。
 * @prop {function} setValue - react-hook-form提供的setValue函數，將值寫入表單中。
 * @prop {string} errText - 輸入錯誤時的提示文字。
 * @prop {object} thisErr - 當前表單欄位的錯誤訊息。
 * @prop {array} imgList - 當前表單欄位的值，在表單中通過watch(regName)傳入。
 * @returns 
 */
export const ARKListImageInput = (props: {
    base: {
        regName: string,
        isRequired?: boolean,
        numLimit?: number
        mode?: "array" | "object"
    }
    register: any,
    imgList: any,
    setValue: any,
    errText?: string,
    thisErr: any
}) => {
    const { regName, isRequired, numLimit = 4, mode = "object" } = props.base;
    const { register, imgList, setValue, errText, thisErr } = props;

    const imageInputRef = React.createRef<HTMLInputElement>();
    const [m_hovering, setHovering] = useState("");

    /** 向JSON格式的Object列表中添加元素 */
    const AddToObjList = (e: React.ChangeEvent<HTMLInputElement>, regName: string, imgList: File[], numLimit: number, setValue: any) => {
        // 獲取新增的文件列表
        let fileObjArr = e.target.files;

        // 檢查數量是否符合要求
        let fileObjArrLen = fileObjArr.length;                          // Array
        let imgListLen = imgList ? Object.keys(imgList).length : 0;   // Object List
        if (fileObjArrLen > numLimit || fileObjArrLen + imgListLen > numLimit) {
            alert(errText || `圖片不能超過${numLimit}張！`);
            return;
        }

        // 將原有圖片轉換成數組（如果不為空）
        let arr = [];
        imgList && Object.keys(imgList).map(key => { arr.push(imgList[key]); });

        // 將傳入文件列表中的所有文件複製一份，並推入數組
        Object.entries(fileObjArr).map(([key, value]) => {
            let newFile = duplicateFile(value);
            arr.push(newFile);
        })

        // 把新數組解析成對象
        const filesAsObj = Object.fromEntries(
            Array.from(arr, (file, index) => [index, file])
        );

        setValue(regName, filesAsObj);
    }

    /** 向數組中添加元素 */
    const AddToArrayList = (e: React.ChangeEvent<HTMLInputElement>, regName: string, imgList: File[], numLimit: number, setValue: any) => {
        let fileObjArr = e.target.files;

        let fileArrLen = fileObjArr.length;
        let imgListLen = imgList ? imgList.length : 0;
        if (fileArrLen > numLimit || fileArrLen + imgListLen > numLimit) {
            alert(`圖片不能超過${numLimit}張`);
            return;
        }

        if (!imgList) {
            setValue(regName, fileObjArr);
            return;
        }

        if (imgList.length > 1) {
            setValue(regName, [...imgList, ...Array.from(fileObjArr)]);
        } else {
            setValue(regName, [imgList[0], ...Array.from(fileObjArr)]);
        }

    }


    return (
        <div className={"flex flex-row items-center justify-left"}>
            <div className={`lg:grid md:flex md:flex-col grid-cols-${numLimit} gap-4 object-cover`}>
                {imgList && Object.entries(imgList).map(([key, value]) => (
                    <div className={"relative"}>
                        <div
                            className={`absolute -top-12 left-[2rem] opacity-${m_hovering != key ? "0" : "100"} transition-all bg-white drop-shadow-lg border border-[2.5px] border-themeColorLight rounded-full px-2 py-1`}>
                            點擊以刪除
                        </div>
                        <img
                            src={URL.createObjectURL(value as File)}
                            className={"w-40 h-24 rounded-md hover:scale-[1.05] transition-all hover:cursor-pointer"}
                            onMouseOver={(e) => { setHovering(key); }}
                            onMouseLeave={(e) => { setHovering(""); }}
                            onClick={(e) => {
                                let imgList_ = Object.fromEntries(
                                    Object.entries(imgList).filter(([k, v]) => k != key)
                                );
                                setValue(regName, imgList_);
                            }} />
                    </div>
                ))}

                <div
                    className="flex flex-col w-40 h-24 items-center justify-center bg-themeColorUltraLight dark:bg-gray-700 rounded-lg border-4 border-themeColor border-dashed min-h-24 hover:cursor-pointer hover:opacity-50 hover:scale-[1.02] transition-all"
                    onClick={() => imageInputRef.current.click()}>

                    {/* Icon 部分 */}
                    <div className="flex items-center justify-center mb-2">
                        <PlusCircleIcon className="w-10 h-10 text-themeColor" />
                    </div>
                    {/* 輸入邏輯部分 */}
                    <input
                        type={"file"}
                        accept={"image/*"}
                        multiple
                        className={"hidden"}
                        {...register(regName, { required: isRequired ? (errText || "需要圖片") : false })}
                        ref={imageInputRef}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            switch (mode) {
                                case "object":
                                    console.log("Using Object Mode.");
                                    AddToObjList(e, regName, imgList, numLimit, setValue);
                                    break;
                                case "array":
                                    console.log("Using Array Mode.");
                                    AddToArrayList(e, regName, imgList, numLimit, setValue);
                                    break;
                            }
                            return;

                            // 獲取新增的文件列表
                            let fileObjArr = e.target.files;

                            // 檢查數量是否符合要求
                            let fileObjArrLen = fileObjArr.length;                          // Array
                            let imgListLen = imgList ? Object.keys(imgList).length : 0;   // Object List
                            if (fileObjArrLen > numLimit || fileObjArrLen + imgListLen > numLimit) {
                                alert(`圖片不能超過${numLimit}張！`);
                                return;
                            }

                            // 將原有圖片轉換成數組（如果不為空）
                            let arr = [];
                            imgList && Object.keys(imgList).map(key => { arr.push(imgList[key]); });

                            // 將傳入文件列表中的所有文件複製一份，並推入數組
                            Object.entries(fileObjArr).map(([key, value]) => {
                                let newFile = duplicateFile(value);
                                arr.push(newFile);
                            })

                            // 把新數組解析成對象
                            const filesAsObj = Object.fromEntries(
                                Array.from(arr, (file, index) => [index, file])
                            );

                            setValue(regName, filesAsObj);
                        }} />
                </div>
            </div>
        </div>
    );
}



/** */