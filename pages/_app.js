import { ThemeProvider } from "next-themes";
import "../css/tailwind.css";
import React, { useEffect } from 'react'

import i18n from "i18next";
import { I18nextProvider } from "react-i18next";
import { useLangStore } from "../states/state"; // 全局語言狀態管理
import { resolveDeviceLang } from "../utils/functions/resolveDeviceLang";

import { useRouter } from 'next/router';
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";


function MyApp({ Component, pageProps }) {

  const router = useRouter();
  const curLang = useLangStore(state => state.curLang) || "zh";

  const navigateToPage = (page) => {
    router.push(page);
  };

  // 僅初始化一次，避免每次 render 重跑 init
  if (!i18n.isInitialized) {
    i18n.init({
      interpolation: { escapeValue: false },
      lng: curLang,
      fallbackLng: "zh",
      resources: {
        en: {
          translation: require("../public/translations.json").en
        },
        zh: {
          translation: require("../public/translations.json").zh
        },
        ja: {
          translation: require("../public/translations.json").ja
        }
      }
    });
  }

  // 持久化還原後：未手動選過語言則跟隨系統語系；之後同步 i18n
  useEffect(() => {
    const syncFromStoreOrDevice = () => {
      const { isLangEverChanged, curLang: storedLang, setDetectedLang } = useLangStore.getState();

      if (isLangEverChanged) {
        i18n.changeLanguage(storedLang);
        return;
      }

      const browserLang = navigator.language || navigator.languages?.[0];
      const detected = resolveDeviceLang(browserLang) || "zh";

      if (detected !== storedLang) {
        setDetectedLang(detected);
      }
      i18n.changeLanguage(detected);
    };

    if (useLangStore.persist.hasHydrated()) {
      syncFromStoreOrDevice();
    } else {
      const unsubHydration = useLangStore.persist.onFinishHydration(syncFromStoreOrDevice);
      return unsubHydration;
    }
  }, []);

  // 手動切換語言時同步 i18n
  useEffect(() => {
    if (i18n.language !== curLang) {
      i18n.changeLanguage(curLang);
    }
  }, [curLang]);

  return (
    <I18nextProvider i18n={i18n}>
      <AnimatePresence>
        <ThemeProvider attribute="class">
          <Component {...pageProps} navigateToPage={navigateToPage} />
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 2000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 2000,
                iconTheme: {
                  primary: '#27ae60',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 3000,
                iconTheme: {
                  primary: '#f75353',
                  secondary: '#fff',
                },
              },
            }}
          />
        </ThemeProvider>
      </AnimatePresence>
    </I18nextProvider>
  );
}

export default MyApp;
