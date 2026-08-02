import Image from "next/image";
import React from "react";
import Link from "next/link";
import Container from "../container";
import themeImg from '../../public/img/theme_small.png';
import { useTranslation } from "react-i18next";
import home3 from "../../public/img/home_page/advertisements/Home3.png";
import { downloadBtnData } from "./common_data/download_btn_data";
import AppPublicStats from "../AppPublicStats";
import SupportArkCard from "../SupportArkCard";

const Ark = (props) => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <div className="relative flex flex-wrap w-full h-full py-20 z-0 md:animate-seaWaveMove"
        style={{
          backgroundImage: `url(${themeImg.src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          // backgroundAttachment: "fixed",
          // animation: "seaWaveMove 2s ease-in-out infinite",
        }}>

        <div
          className="absolute top-0 left-0 w-full h-full z-10 backdrop-blur-xl dark:backdrop-blur-[40px]
                      bg-gradient-to-tr from-white dark:from-[#171717] from-50% dark:from-55% dark:to-[#171717dd]" />
        <Container className={"grid grid-cols-1 min-[901px]:grid-cols-2 gap-x-8 z-20 items-center"}>
          {/* ARK介紹+下載按鈕 */}
          <div className="flex min-[901px]:flex-row max-[900px]:flex-col items-center w-full min-w-0 px-4 sm:px-8 py-20">
            <div className="w-full min-[901px]:max-w-2xl mb-8">
              <div className="flex gap-4 items-center">
                <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
                  ARK ALL
                </h1>
              </div>
              <p className="py-5 text-xl leading-normal whitespace-pre-line text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
                {t("arkText")}
              </p>

              <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
                {t("Download")}
              </p>

              <div className="grid grid-cols-2 min-[901px]:flex min-[901px]:flex-row gap-2 w-full min-[901px]:w-auto">
                {downloadBtnData.map((item) => (
                  <Link
                    key={item.source}
                    href={item.link}
                    target="_blank"
                    rel="noopener"
                    className="
                      group flex w-full min-[901px]:w-[168px] flex-row items-center justify-start gap-2.5
                      rounded-xl border border-themeColor/25 bg-themeColorUltraLight/80 px-3 py-3
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
                        width={16}
                        height={16}
                        className="h-4 w-4 object-contain"
                      />
                    </span>
                    <span className="truncate">{item.source}</span>
                  </Link>
                ))}
              </div>

              <Link
                href="/install"
                className="inline-block mt-4 text-themeColor hover:underline font-medium"
              >
                {t("Install")} →
              </Link>

              <SupportArkCard className="mt-4" />
              <AppPublicStats stats={props.appPublicStats} className="mt-5" />
            </div>
          </div>

          {/* 手機圖畫 */}
          <div className="hidden min-[1301px]:flex items-center justify-end justify-self-end w-full pr-8">
            <Image
              src={home3}
              height="auto"
              alt="tutorial"
              className="block object-contain w-[28rem] xl:w-[30rem] h-auto rounded-tl-lg rounded-tr-lg"
              placeholder="blur"
              blurDataURL={home3.src} />
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default Ark;
