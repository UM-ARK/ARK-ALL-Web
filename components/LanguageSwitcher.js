import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { useLangStore } from "../states/state";


const LanguageSwitcher = () => {
    const { t, i18n } = useTranslation();

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

    return (

        <div className={`
            flex flex-row font-bold justify-between items-center w-24 px-2 rounded-md
            hover:backdrop-blur-3xl hover:bg-[#ffffff99] dark:hover:bg-[#17171799] hover:cursor-pointer
            transition-all
        `}>
            {langBtnData.map((item, idx) => (
                <div onClick={() => { handleLanguageChange(item.value) }}
                    className={`
                        transition-all 
                        hover:text-themeColor hover:scale-[1.02] hover:cursor-pointer
                        ${curLang === item.value ? "text-themeColor scale-[1.02]" : "text-[#000000aa] dark:text-white"}`}>
                    {item.text}
                </div>
            ))}
        </div>
    );


};

export default LanguageSwitcher;