import React from "react";
import Container from "../container";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import themeImg from '../../public/img/theme.png';

import apple_logo from "../../public/img/home_page/company_logos/AppleLogo.png";
import google_play_logo from "../../public/img/home_page/company_logos/GooglePlayLogo.png";
import huawei_logo from "../../public/img/home_page/company_logos/HuaweiLogo.png";
import android_logo from "../../public/img/home_page/company_logos/AndroidLogo.png";

const Cta = () => {
  const { t } = useTranslation();

  const downloadBtnData = [
    {
      source: "App Store",
      link: "https://apps.apple.com/us/app/um-all/id1636670554",
      icon: apple_logo
    },
    {
      source: "Play Store",
      link: "https://play.google.com/store/apps/details?id=one.umall",
      icon: google_play_logo
    },
    {
      source: "HUAWEI",
      link: "https://umall.one/static/release/app-release.apk",
      icon: huawei_logo
    },
    {
      source: "Android",
      link: "https://umall.one/static/release/app-release.apk",
      icon: android_logo
    }
  ];

  const DownloadBtn = (props) => {
    return (
      <div className="flex-shrink-0 w-full text-center lg:w-auto">
        <a
          href={props.link}
          target="_blank"
          rel="noopener"
          className="inline-block py-3 mx-auto text-themeColor text-lg font-medium text-center bg-white rounded-md px-7 lg:px-8 lg:py-3 hover:scale-[1.02] transition-all">
          {props.children}
        </a>
      </div>
    );
  }

  return (
    <Container>
      <div
        style={{
          backgroundImage: `url(${themeImg.src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="flex flex-col items-center justify-between w-full max-w-4xlmx-auto text-white bg-themeColor bg-indigo-600 px-7 py-5 lg:px-12 lg:py-8 lg:flex-nowrap rounded-xl drop-shadow-2xl">
        <div className={"flex flex-wrap items-center justify-between w-full gap-5"}>
          <div className="flex-grow text-center lg:text-left drop-shadow-lg">
            <h2 className="text-2xl font-medium lg:text-3xl">
              {t("Are you ready to use the App?")}
            </h2>
            <p className="mt-2 font-medium text-white text-opacity-90 lg:text-xl">
              {t("new world")}
            </p>
          </div>
          <div className={"flex flex-col gap-1 mx-auto "}>
            <div className={"font-bold drop-shadow-md text-center mb-3"}>{t("Download")}</div>
            <div className="flex min-[901px]:flex-row max-[900px]:flex-col gap-2 ">
              {downloadBtnData.map((item, idx) => (
                <div
                  onClick={() => { router.push(item.link); }}
                  className={`
                  flex flex-row 
                  min-[901px]:w-[168px] max-[900px]:w-[80%] gap-2 px-5 py-4 
                  text-md font-medium 
                  justify-center items-center text-left text-themeColor 
                  rounded-md bg-white 
                  hover:cursor-pointer hover:text-themeColorLight hover:scale-[1.02] 
                  max-[900px]:mx-auto max-[900px]:w-96
                  transition-all`}>
                  <p>{item.source}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </Container>
  );
}

export default Cta;