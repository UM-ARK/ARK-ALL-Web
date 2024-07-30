import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { useLangStore } from "../states/state";


const LanguageSwitcher = () => {
    const { t, i18n } = useTranslation();

    // 語言配置
    const defaultLang = "zh";
    const availableLang = ["en", "ja"];

    // 全局語言狀態
    const curLang = useLangStore((state) => state.curLang);
    const setCurLangStore = useLangStore((state) => state.setLang);

    const langBtnData = [
        { text: "中", value: "zh" },
        { text: "En", value: "en" },
        { text: "日", value: "ja" }
    ];

    const handleLanguageChange = (selectedLanguage) => {
        // 設定當前語言，並固定狀態
        setCurLangStore(selectedLanguage);
        i18n.changeLanguage(curLang);
    };

    useEffect(() => {
        let deviceLang = navigator.language || navigator.userLanguage;

        // 無法檢測設備語言/設備語言不在支持列表内，則默認中文
        if (!deviceLang || availableLang.indexOf(deviceLang) == -1) {
            return;
        }

        // 設備語言在支持列表内，更換為設備語言
        handleLanguageChange(deviceLang);

    }, []);

    return (

        <div className={`
            flex flex-row font-bold justify-between items-center min-[901px]:w-24 max-[900px]:w-48 px-2 rounded-md
            hover:backdrop-blur-3xl hover:bg-[#ffffff99] dark:hover:bg-[#17171799] hover:cursor-pointer
            transition-all
        `}>
            {langBtnData.map((item, idx) => (
                <div onClick={() => { handleLanguageChange(item.value) }}
                    className={`
                        transition-all 
                        hover:text-themeColor hover:scale-[1.02] hover:cursor-pointer max-[900px]:text-2xl 
                        ${curLang === item.value ? "text-themeColor scale-[1.02]" : "text-[#000000aa] dark:text-white"}`}>
                    {item.text}
                </div>
            ))}
        </div>
    );


};

export default LanguageSwitcher;