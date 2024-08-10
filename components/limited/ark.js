import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Container from "../container";
import themeImg from '../../public/img/theme_small.png';
// import Streets from "../../components/models/Streets"
// import { Canvas } from '@react-three/fiber';
// import { Cube1 } from "./Cube1";
// import { Cube2 } from "./Cube2";
// import { Phone } from "./Phone";

import { useTranslation } from "react-i18next";
import phones from "../../public/img/home_page/phones.png";
import { downloadBtnData } from "./common_data/download_btn_data";
import { useRouter } from "next/router";
// import appleLogo from "../../public/img/home_page/company_logos";
import { ARKDemoFrame } from "../uiComponents/Frames";

const Ark = (props) => {
  const { t } = useTranslation();
  const router = useRouter();

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
        <Container className={"flex flex-wrap z-20"}>
          {/* ARK介紹+下載按鈕 */}
          <div className="flex min-[901px]:flex-row max-[900px]:flex-col items-center w-full min-[901px]:w-1/2 px-8 py-20">
            <div className="min-[901px]:max-w-2xl mb-8">
              <div className="flex gap-4 items-center">
                <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
                  ARK ALL
                </h1>
              </div>
              <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
                {t("arkText")}
              </p>

              <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
                {t("Download")}
              </p>

              <div className="flex min-[901px]:flex-row max-[900px]:flex-col gap-2 ">
                {downloadBtnData.map((item, idx) => (
                  <Link href={item.link} target="_blank"><div
                    // onClick={() => { router.push(item.link); }}
                    className={`
                      flex flex-row 
                      min-[901px]:w-[168px] max-[900px]:w-[80%] gap-2 px-5 py-4 
                      text-md font-medium 
                      justify-center items-center text-left text-white 
                      rounded-md bg-themeColor 
                      hover:cursor-pointer hover:bg-themeColorLight hover:scale-[1.02] 
                      max-[900px]:mx-auto max-[900px]:w-96
                      transition-all`}>
                    <Image src={item.icon} className={`w-[30px] h-[30px]`} />
                    <p>{item.source}</p>
                  </div></Link>
                ))}
              </div>

              {/* View Github Repository */}
              <div className="flex mt-5">
                <a
                  href="https://github.com/UM-ARK"
                  target="_blank"
                  rel="noopener"
                  className="flex items-center space-x-2 mr-auto text-gray-500 dark:text-gray-400 hover:opacity-50">
                  <svg
                    role="img"
                    width="24"
                    height="24"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <title>GitHub</title>
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  <span>View Github Repository</span>
                </a>
              </div>
            </div>
          </div>

          {/* 手機圖畫 */}
          <div className="flex items-center justify-center w-full lg:w-1/2 max-[1300px]:hidden">
            <Image
              src={phones}
              height="auto"
              alt="tutorial"
              className="block object-cover rounded-tl-lg rounded-tr-lg"
              placeholder="blur"
              blurDataURL={phones.src} />
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default Ark;