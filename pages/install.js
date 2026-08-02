import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Container from "../components/container";
import PopupWidget from "../components/popupWidget";
import { ARKMain } from "../components/uiComponents/ContentBlock";
import { downloadBtnData } from "../components/limited/common_data/download_btn_data";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { APPSTORE_URL, BASE_HOST, PLAYSTORE_URL } from "../utils/pathMap";
import AppPublicStats from "../components/AppPublicStats";
import { fetchAppPublicStats } from "../lib/appPublicStats";

const InstallSection = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-24">
    <h2 className="text-2xl font-bold text-themeColor mb-3">{title}</h2>
    <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3 whitespace-pre-line">
      {children}
    </div>
  </section>
);

const install = ({ appPublicStats }) => {
  const { t } = useTranslation();
  const appStructuredData = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "ARK ALL",
    alternateName: "UM ALL",
    description: t("Install_seo_desc"),
    url: "https://umall.one/install",
    image: "https://umall.one/img/logo.png",
    applicationCategory: "EducationalApplication",
    operatingSystem: "iOS, Android",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: 0,
      priceCurrency: "MOP",
    },
    downloadUrl: [
      APPSTORE_URL,
      PLAYSTORE_URL,
      `${BASE_HOST}/static/release/app-release.apk`,
    ],
    publisher: {
      "@type": "Organization",
      name: "ARK",
      url: "https://umall.one",
    },
  };

  return (
    <ARKMain
      title={t("Install_seo_title")}
      seoTitle={t("Install_seo_title")}
      description={t("Install_seo_desc")}
      canonicalPath="/install"
      structuredData={appStructuredData}
      withOutMargin={true}
    >
      <Navbar selected={"Install"} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Container className="min-[790px]:px-48 py-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            {t("Install_h1")}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-300 mb-8 whitespace-pre-line">
            {t("Install_intro")}
          </p>

          {/* 下載 CTA */}
          <div className="mb-12">
            <p className="text-xl font-medium text-gray-700 dark:text-gray-200 mb-4">
              {t("Download")}
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
            <AppPublicStats stats={appPublicStats} className="mt-5 max-w-2xl" />
            <div className="flex flex-wrap gap-4 mt-4">
              <a
                href="https://wiki.umall.one/wiki/ARK_ALL"
                target="_blank"
                rel="noopener"
                className="text-gray-500 dark:text-gray-400 hover:text-themeColor transition-colors"
              >
                {t("Install_wiki_link")}
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <InstallSection id="ios" title={t("Install_ios_title")}>
              <p>{t("Install_ios_body")}</p>
              <div className="rounded-lg bg-themeColorUltraLight dark:bg-gray-800 px-4 py-3 text-gray-700 dark:text-gray-200">
                {t("Install_ios_note")}
              </div>
            </InstallSection>

            <InstallSection id="android" title={t("Install_android_title")}>
              <p>{t("Install_android_body")}</p>
            </InstallSection>

            <InstallSection id="apk" title={t("Install_apk_title")}>
              <p>{t("Install_apk_body")}</p>
            </InstallSection>

            <InstallSection id="huawei" title={t("Install_huawei_title")}>
              <p>{t("Install_huawei_body")}</p>
            </InstallSection>
          </div>
        </Container>
      </motion.div>
      <Footer />
      <PopupWidget />
    </ARKMain>
  );
};

export default install;

export async function getStaticProps() {
  return {
    props: {
      appPublicStats: await fetchAppPublicStats(),
    },
    revalidate: 86400,
  };
}
