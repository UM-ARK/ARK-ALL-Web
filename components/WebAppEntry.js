import React from "react";
import Link from "next/link";
import { GlobeAltIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import { WEBAPP_URL } from "../utils/pathMap";

// 網頁版入口卡片：用於首頁大首頁與安裝頁
const WebAppEntry = ({ className = "" }) => {
  const { t } = useTranslation();

  return (
    <Link
      href={WEBAPP_URL}
      target="_blank"
      rel="noopener"
      className={`
        group flex flex-row items-center gap-4
        rounded-xl border border-themeColor/25 bg-themeColorUltraLight/80 px-4 py-4
        shadow-sm transition hover:-translate-y-0.5 hover:border-themeColor hover:bg-themeColorUltraLight hover:shadow-md
        dark:border-themeColor/40 dark:bg-themeColorUltraLight
        ${className}
      `}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-themeColor">
        <GlobeAltIcon className="h-6 w-6 text-white" />
      </span>

      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="flex items-center gap-2">
          <span className="font-bold text-themeColor dark:text-themeColorLight">
            {t("WebApp_title")}
          </span>
          <span className="rounded-full bg-themeColor px-2 py-0.5 text-[10px] font-bold uppercase leading-none text-white">
            {t("WebApp_badge")}
          </span>
        </span>
        <span className="text-sm leading-snug text-gray-500 dark:text-gray-300">
          {t("WebApp_desc")}
        </span>
        <span className="mt-1 text-sm font-medium text-themeColor dark:text-themeColorLight group-hover:underline">
          {t("WebApp_btn")} · umall.one/webAPP
        </span>
      </span>

      <ArrowTopRightOnSquareIcon className="h-5 w-5 shrink-0 text-themeColor/60 dark:text-themeColorLight/60" />
    </Link>
  );
};

export default WebAppEntry;
