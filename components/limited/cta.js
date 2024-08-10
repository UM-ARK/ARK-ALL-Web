import React from "react";
import Container from "../container";
import { useTranslation } from "react-i18next";
import Link from "next/link";

import themeImg from '../../public/img/theme.png';

import { downloadBtnData } from "./common_data/download_btn_data";

const Cta = () => {
  const { t } = useTranslation();

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
        className="flex flex-col items-center justify-between w-full max-w-4xlmx-auto text-white bg-themeColor bg-indigo-600 px-7 py-5 lg:px-12 lg:py-8 rounded-xl drop-shadow-2xl">
        <div className={"flex min-[901px]:flex-wrap max-[900px]:flex-col items-center justify-between w-full gap-5"}>

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
                <Link href={item.link} target="_blank"><div className={`
                  flex flex-row 
                  min-[1026px]:w-[168px] max-[1025px]:w-[120px] gap-2 px-5 py-4 
                  text-md font-medium 
                  justify-center items-center text-left text-themeColor 
                  rounded-md bg-white 
                  hover:cursor-pointer hover:text-themeColorLight hover:scale-[1.02] 
                  max-[900px]:mx-auto max-[900px]:w-[200px]
                  transition-all`}>
                  <p>{item.source}</p>
                </div></Link>
              ))}
            </div>
          </div>
        </div>
      </div>

    </Container >
  );
}

export default Cta;