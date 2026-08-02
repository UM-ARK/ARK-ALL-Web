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

const InstallSection = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-24">
    <h2 className="text-2xl font-bold text-themeColor mb-3">{title}</h2>
    <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3 whitespace-pre-line">
      {children}
    </div>
  </section>
);

const install = () => {
  const { t } = useTranslation();

  return (
    <ARKMain
      title={t("Install_seo_title")}
      description={t("Install_seo_desc")}
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
                <Link key={item.source} href={item.link} target="_blank" rel="noopener">
                  <div
                    className={`
                      flex flex-row w-[168px] gap-2 px-5 py-4
                      text-md font-medium
                      justify-center items-center text-left text-white
                      rounded-md bg-themeColor
                      hover:cursor-pointer hover:bg-themeColorLight hover:scale-[1.02]
                      transition-all`}
                  >
                    <Image src={item.icon} alt={item.source} className="w-[30px] h-[30px]" />
                    <p>{item.source}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <a
                href="https://github.com/UM-ARK/UM-All-Frontend/releases/latest"
                target="_blank"
                rel="noopener"
                className="text-gray-500 dark:text-gray-400 hover:text-themeColor transition-colors"
              >
                APK Release (GitHub)
              </a>
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
