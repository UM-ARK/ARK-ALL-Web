import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Container from "../../components/container";
import PopupWidget from "../../components/popupWidget";
import { ARKMain } from "../../components/uiComponents/ContentBlock";
import { downloadBtnData } from "../../components/limited/common_data/download_btn_data";
import { getAppLinkSeoCopy, parseAppPath } from "../../utils/appLinkParse";

function isWeChatUA(ua = "") {
  return /MicroMessenger/i.test(ua);
}

const AppLinkLanding = ({
  link,
  isValid,
  seoTitle,
  seoDescription,
  fallbackTitle,
  fallbackDesc,
}) => {
  const { t } = useTranslation();
  const [inWeChat, setInWeChat] = useState(false);

  useEffect(() => {
    setInWeChat(isWeChatUA(navigator.userAgent || ""));
  }, []);

  // 標題／描述一律用 SSR props，避免 i18n 語系在客戶端切換造成 hydration mismatch
  const displayTitle = fallbackTitle;
  const displayDesc = fallbackDesc;
  const canonicalPath = isValid ? link.httpsPath : "/app";

  // 頁面專用文案固定中文（與 SSR SEO 一致）；Toast 在互動後觸發，可用 i18n
  const labels = {
    open: "在 ARK ALL 中開啟",
    web: "繼續在網頁查看",
    copy: "複製連結",
    download: "下載 ARK ALL",
    installGuide: "安裝指南",
    wechatTitle: "目前在微信內開啟",
    wechatBody:
      "請點擊右上角 ···，選擇「在瀏覽器打開」，再到外部瀏覽器點「在 ARK ALL 中開啟」。",
  };

  const openInApp = () => {
    if (!isValid || !link?.deepLink) return;
    // 僅在使用者主動點擊時喚起；不做自動跳轉
    window.location.href = link.deepLink;
  };

  const copyLink = async () => {
    const url =
      typeof window !== "undefined"
        ? window.location.href
        : `https://umall.one${canonicalPath}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success(t("App_link_copied", { defaultValue: "已複製連結" }));
    } catch {
      toast.error(t("App_link_copy_failed", { defaultValue: "複製失敗" }));
    }
  };

  return (
    <ARKMain
      title={seoTitle}
      seoTitle={seoTitle}
      description={seoDescription}
      canonicalPath={canonicalPath}
      withOutMargin={true}
    >
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Container className="min-[790px]:px-48 py-10">
          <div className="flex flex-col items-start gap-6 max-w-xl">
            <div className="flex items-center gap-4">
              <Image
                src="/img/logo.png"
                alt="ARK ALL"
                width={72}
                height={72}
                className="rounded-2xl shadow-sm"
                priority
              />
              <div>
                <p className="text-sm font-medium text-themeColor tracking-wide">
                  ARK ALL
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                  {displayTitle}
                </h1>
              </div>
            </div>

            <p className="text-lg text-gray-500 dark:text-gray-300 leading-relaxed">
              {displayDesc}
            </p>

            {inWeChat && (
              <div className="w-full rounded-xl border border-amber-300/60 bg-amber-50 dark:bg-amber-950/40 dark:border-amber-700/50 px-4 py-3 text-amber-900 dark:text-amber-100 text-sm leading-relaxed">
                <p className="font-medium mb-1">{labels.wechatTitle}</p>
                <p>{labels.wechatBody}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full">
              {isValid && !inWeChat && (
                <button
                  type="button"
                  onClick={openInApp}
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-xl bg-themeColor px-6 py-3.5
                    text-base font-semibold text-white shadow-sm
                    transition hover:-translate-y-0.5 hover:shadow-md hover:brightness-105
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-themeColor focus-visible:ring-offset-2
                  "
                >
                  {labels.open}
                </button>
              )}

              {isValid && link?.webUrl && (
                <a
                  href={link.webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-xl border border-themeColor/30 bg-white dark:bg-gray-900
                    px-6 py-3.5 text-base font-medium text-themeColor
                    transition hover:border-themeColor hover:bg-themeColorUltraLight
                    dark:border-themeColor/40 dark:hover:bg-themeColorUltraLight
                  "
                >
                  {labels.web}
                </a>
              )}

              <button
                type="button"
                onClick={copyLink}
                className="
                  inline-flex items-center justify-center gap-2
                  rounded-xl border border-gray-200 dark:border-gray-700
                  bg-white dark:bg-gray-900 px-6 py-3.5
                  text-base font-medium text-gray-700 dark:text-gray-200
                  transition hover:border-gray-300 hover:bg-gray-50
                  dark:hover:border-gray-600 dark:hover:bg-gray-800
                "
              >
                {labels.copy}
              </button>
            </div>

            <div className="w-full pt-4 border-t border-gray-100 dark:border-gray-800">
              <p className="text-base font-medium text-gray-700 dark:text-gray-200 mb-3">
                {labels.download}
              </p>
              <div className="flex flex-wrap gap-2">
                {downloadBtnData.map((item) => (
                  <Link
                    key={item.source}
                    href={item.link}
                    target="_blank"
                    rel="noopener"
                    className="
                      group flex w-[168px] flex-row items-center justify-center gap-2.5
                      rounded-xl border border-themeColor/25 bg-themeColorUltraLight/80 px-4 py-3
                      text-sm font-medium text-themeColor shadow-sm
                      transition hover:-translate-y-0.5 hover:border-themeColor hover:bg-themeColorUltraLight hover:shadow-md
                      dark:border-themeColor/40 dark:bg-themeColorUltraLight dark:text-themeColorLight
                    "
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-themeColor">
                      <Image
                        src={item.icon}
                        alt=""
                        aria-hidden="true"
                        className="h-4 w-4"
                      />
                    </span>
                    <span>{item.source}</span>
                  </Link>
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-400 dark:text-gray-500">
                <Link
                  href="/install"
                  className="hover:text-themeColor transition-colors underline-offset-2 hover:underline"
                >
                  {labels.installGuide}
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </motion.div>
      <Footer />
      <PopupWidget />
    </ARKMain>
  );
};

export default AppLinkLanding;

export async function getServerSideProps(context) {
  const { slug } = context.params || {};
  const { invite } = context.query || {};
  const link = parseAppPath(slug, { invite });
  const { displayTitle, seoTitle, seoDescription } = getAppLinkSeoCopy(link);

  return {
    props: {
      isValid: Boolean(link),
      link,
      seoTitle,
      seoDescription,
      fallbackTitle: displayTitle,
      fallbackDesc: seoDescription,
    },
  };
}
