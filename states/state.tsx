import { create, StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * 全局語言類型：中文、英文、日文
 */
export type LangType = "zh" | "en" | "ja";

export interface LangStore {
    curLang: LangType;
    isLangEverChanged: boolean;
    setLang: (lang: LangType) => void;
};

const langSlice: StateCreator<LangStore, [["zustand/persist", unknown]]> = (set) => ({
    curLang: "zh",
    isLangEverChanged: false,
    setLang: (lang: LangType) => set({ curLang: lang, isLangEverChanged: true }),
});

export const useLangStore = create<LangStore>()(
    persist(langSlice, {
        name: "curLang",
        storage: createJSONStorage(() => localStorage),
    })
);

/**
 * 登錄ID，token
 */

export interface LoginStore {
    curID: string;
    curToken: string;
    setLogin: (id: string, token: string) => void;
};

const loginSlice: StateCreator<LoginStore, [["zustand/persist", unknown]]> = (set) => ({
    curID: "",
    curToken: "",
    setLogin: (id: string, token: string) => set({ curID: id, curToken: token }),
});

export const useLoginStore = create<LoginStore>()(
    persist(loginSlice, {
        name: "loginInfo",
        storage: createJSONStorage(() => sessionStorage),
    })
);

/**
 * Warning Banner
 */
export interface DisplayWarningBannerStore {
    display: "true" | "false";        // 設置為真的布爾值就會初始化錯誤 -_-|||
    setDisplay: (display_: "true" | "false") => void;
};

const displawarningBannerSlice: StateCreator<DisplayWarningBannerStore, [["zustand/persist", unknown]]> = (set) => ({
    display: "true",
    setDisplay: (display_: "true" | "false") => set({ display: display_ }),
});

export const useDisplayWarningBannerStore = create<DisplayWarningBannerStore>()(
    persist(displawarningBannerSlice, {
        name: "displayWarning",
        storage: createJSONStorage(() => localStorage),
    })
);