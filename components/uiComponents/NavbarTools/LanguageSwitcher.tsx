import React from "react";
import { useTranslation } from "react-i18next";
import { useLangStore } from "../../../states/state";

const langBtnData = [
    { text: "中", value: "zh" as const },
    { text: "En", value: "en" as const },
    { text: "日", value: "ja" as const },
];

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const curLang = useLangStore((state) => state.curLang);
    const setLang = useLangStore((state) => state.setLang);

    const handleLanguageChange = (selectedLanguage: "zh" | "en" | "ja") => {
        setLang(selectedLanguage);
        i18n.changeLanguage(selectedLanguage);
    };

    return (
        <div
            className={`
            flex flex-row 
            font-bold justify-between items-center 
            min-[901px]:w-24 max-[900px]:w-48 
            px-2 rounded-md
            hover:backdrop-blur-3xl 
            hover:bg-[#ffffff99] 
            dark:hover:bg-[#17171799] 
            hover:cursor-pointer
            transition-all
        `}
        >
            {langBtnData.map((item) => (
                <div
                    key={item.value}
                    onClick={() => {
                        handleLanguageChange(item.value);
                    }}
                    className={`
                        transition-all 
                        hover:text-themeColor 
                        hover:scale-[1.02] 
                        hover:cursor-pointer 
                        max-[900px]:text-2xl 
                        ${curLang === item.value ? "text-themeColor scale-[1.02]" : "text-[#000000aa] dark:text-white"}`}
                >
                    {item.text}
                </div>
            ))}
        </div>
    );
};

export default LanguageSwitcher;
