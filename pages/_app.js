import { ThemeProvider } from "next-themes";
import "../css/tailwind.css";
import React, { useState, useEffect } from 'react'

import i18n from "i18next";
import { I18nextProvider } from "react-i18next";
import { useLangStore } from "../states/state"; // 全局語言狀態管理

import { useRouter } from 'next/router';
import { AnimatePresence } from "framer-motion";


function MyApp({ Component, pageProps }) {

  const router = useRouter();

  const navigateToPage = (page) => {
    router.push(page);
  };

  i18n.init({
    interpolation: { escapeValue: false },
    lng: useLangStore(state => state.curLang) || "zh",
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

  return (
    <I18nextProvider i18n={i18n}>
      <AnimatePresence>
        <ThemeProvider attribute="class">
          <Component {...pageProps} navigateToPage={navigateToPage} />
        </ThemeProvider>
      </AnimatePresence>
    </I18nextProvider>
  );
}

export default MyApp;
