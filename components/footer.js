import Link from "next/link";
import Image from "next/image";
import React from "react";
import Container from "./container";

import { useTranslation } from "react-i18next";

import { useRouter } from 'next/router';

import { MapPinIcon, GlobeAltIcon, EnvelopeIcon } from '@heroicons/react/24/solid';

export default function Footer() {

  const router = useRouter();
  const navigateToPage = (page) => {
    router.push(page);
  };

  const { t } = useTranslation();

  const navigationData = [
    "ClubSignin",
    "Tutorial",
    "QA",
    "User_Agreement",
    "About_us",
  ];

  const contactData = [
    {
      index: "地址",
      value: "Avenida da Universidade, Taipa, Macau, China",
      link: "/",
      icon: MapPinIcon
    },
    {
      index: "Wiki",
      value: "wiki.umall.one",
      link: "https://wiki.umall.one",
      icon: GlobeAltIcon
    },
    {
      index: "Email",
      value: "umacark@gmail.com",
      link: "mailto:umacark@gmail.com",
      icon: EnvelopeIcon
    }
  ];

  const followUsData = [
    {
      name: "XiaoHongShu",
      link: "https://www.xiaohongshu.com/user/profile/64266e3f00000000120119c8",
      icon: XiaoHongShu
    },
    {
      name: "Instagram",
      link: "https://instagram.com",
      icon: Instagram
    },
    {
      name: "GitHub",
      link: "https://www.github.com/UM-ARK",
      icon: Github
    }
  ];

  return (
    <div className="relative">
      <Container>
        <div className="flex gap-5 min-[901px]:flex-row max-[900px]:flex-col justify-around pt-10 mx-auto mt-5">
          {/* Logo */}
          <div className={`flex mx-auto`}>
            <Link href="/" className={``}>
              <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
                <span>
                  <Image
                    src="/img/logo.png"
                    alt="N"
                    width="32"
                    height="32"
                    className="w-8 rounded-md"
                  />
                </span>
                <span className="text-themeColor font-bold">
                  ARK ALL
                </span>
              </span>
            </Link>
          </div>

          {/* 導航項 */}
          <div className={`flex w-64 px-5 flex-col mx-auto`}>
            {navigationData.map((menu, index) => (
              <div
                key={index}
                onClick={() => navigateToPage('/' + menu.toLowerCase())}
                className={`
                            block items-center text-center px-4 py-2 rounded-md 
                            text-gray-500 dark:text-gray-300 
                            max-[900px]:mx-auto 
                            hover:cursor-pointer hover:text-themeColor hover:bg-themeColorUltraLight 
                            focus:text-themeColor focus:bg-themeColorUltraLight focus:outline-none 
                            dark:hover:text-themeColor dark:hover:bg-gray-800 dark:focus:bg-gray-800
                            transition-all
                          `}>
                <div className={`block items-center`}>{t(menu)}</div>
              </div>
            ))}
          </div>

          {/* 通訊方式 */}
          <div className={`flex w-[300px] min-[901px]:px-5 max-[900px]:pr-2 max-[900px]:pl-5 flex-col mx-auto gap-5`}>
            <div className={`max-[900px]:text-center text-themeColor font-bold`}>
              {`通訊方式`}
            </div>
            {contactData.map((item, index) => (
              <div className={`grid grid-cols-2 gap-2 grid-cols-[0.3fr_0.9fr] text-gray-500 dark:text-gray-300 `}>
                <div className={`items-top`}>
                  <div className={`flex flex-row items-center gap-2`}>
                    <item.icon className={`w-4 h-4`} />
                    {item.index}
                  </div>
                </div>
                <div>
                  <Link href={item.link} target={`_blank`}>
                    {item.value}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* 追蹤我們 */}
          <div className={`px-5 mx-auto`}>
            <div className={`max-[900px]:text-center text-themeColor font-bold`}>
              {t("Follow us")}
            </div>
            <div className="flex mt-5 space-x-5 text-gray-400 dark:text-gray-500">
              {followUsData.map((item, idx) => (
                <a
                  className="hover:opacity-50"
                  href={item.link}
                  target="_blank"
                  rel="noopener">
                  <span className="sr-only">{item.name}</span>
                  <item.icon />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Sign */}
        <div className="my-10 text-sm text-center text-gray-600 dark:text-gray-400">
          Copyright © {new Date().getFullYear()}. Made with ♥ by{" "}
          <a
            className="hover:opacity-50"
            href="https://github.com/UM-ARK"
            target="_blank"
            rel="noopener">
            ARK All.
          </a>{" "}
        </div>
      </Container>
    </div>
  );
}

const Twitter = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor">
    <path d="M24 4.37a9.6 9.6 0 0 1-2.83.8 5.04 5.04 0 0 0 2.17-2.8c-.95.58-2 1-3.13 1.22A4.86 4.86 0 0 0 16.61 2a4.99 4.99 0 0 0-4.79 6.2A13.87 13.87 0 0 1 1.67 2.92 5.12 5.12 0 0 0 3.2 9.67a4.82 4.82 0 0 1-2.23-.64v.07c0 2.44 1.7 4.48 3.95 4.95a4.84 4.84 0 0 1-2.22.08c.63 2.01 2.45 3.47 4.6 3.51A9.72 9.72 0 0 1 0 19.74 13.68 13.68 0 0 0 7.55 22c9.06 0 14-7.7 14-14.37v-.65c.96-.71 1.79-1.6 2.45-2.61z" />
  </svg>
);

const Facebook = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor">
    <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07" />
  </svg>
);

const Instagram = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor">
    <path d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z" />
  </svg>
);

const Github = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 64 64"
    xmlnsXlink="http://www.w3.org/1999/xlink">
    <path
      d="M32 0a32.021 32.021 0 0 0-10.1 62.4c1.6.3 2.2-.7 2.2-1.5v-6c-8.9 1.9-10.8-3.8-10.8-3.8-1.5-3.7-3.6-4.7-3.6-4.7-2.9-2 .2-1.9.2-1.9 3.2.2 4.9 3.3 4.9 3.3 2.9 4.9 7.5 3.5 9.3 2.7a6.93 6.93 0 0 1 2-4.3c-7.1-.8-14.6-3.6-14.6-15.8a12.27 12.27 0 0 1 3.3-8.6 11.965 11.965 0 0 1 .3-8.5s2.7-.9 8.8 3.3a30.873 30.873 0 0 1 8-1.1 30.292 30.292 0 0 1 8 1.1c6.1-4.1 8.8-3.3 8.8-3.3a11.965 11.965 0 0 1 .3 8.5 12.1 12.1 0 0 1 3.3 8.6c0 12.3-7.5 15-14.6 15.8a7.746 7.746 0 0 1 2.2 5.9v8.8c0 .9.6 1.8 2.2 1.5A32.021 32.021 0 0 0 32 0z"
      data-name="layer2"
      fill="currentColor"
    />
    <path
      d="M12.1 45.9c-.1.2-.3.2-.5.1s-.4-.3-.3-.5.3-.2.6-.1c.2.2.3.4.2.5zm1.3 1.5a.589.589 0 0 1-.8-.8.631.631 0 0 1 .7.1.494.494 0 0 1 .1.7zm1.3 1.8a.585.585 0 0 1-.7-.3.6.6 0 0 1 0-.8.585.585 0 0 1 .7.3c.2.3.2.7 0 .8zm1.7 1.8c-.2.2-.5.1-.8-.1-.3-.3-.4-.6-.2-.8a.619.619 0 0 1 .8.1.554.554 0 0 1 .2.8zm2.4 1c-.1.3-.4.4-.8.3s-.6-.4-.5-.7.4-.4.8-.3c.3.2.6.5.5.7zm2.6.2c0 .3-.3.5-.7.5s-.7-.2-.7-.5.3-.5.7-.5c.4.1.7.3.7.5zm2.4-.4q0 .45-.6.6a.691.691 0 0 1-.8-.3q0-.45.6-.6c.5-.1.8.1.8.3z"
      data-name="layer1"
      fill="currentColor"
    />
  </svg>
);

const XiaoHongShu = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 256 256"
    xmlnsXlink="http://www.w3.org/1999/xlink">
    <path
      d="M289.44 256h188.23c17.93 0 33.86 15.57 34.33 33.48v188.24A35.09 35.09 0 0 1 477.66 512H289.5a35.14 35.14 0 0 1-33.5-34.36V289.56c.43-17.63 15.81-33.06 33.44-33.56Zm16.73 91.44c-.13 19.87-.06 39.75-.16 59.63a2.1 2.1 0 0 1-2.13 2.6c-2.39.14-4.79.06-7.19.08 1.61 4 3.35 7.86 5.15 11.73 4.52-.15 9.68.79 13.54-2.17 3.47-2.58 4.58-7.17 4.51-11.3 0-20.19 0-40.39-.09-60.58-4.54-.02-9.09-.03-13.63.01Zm56.08-.9q-5.08 11.67-10.36 23.24c-1 2.31-2.21 5.37-.11 7.46 2.69 2.44 6.64 1.5 9.94 1.72-2.29 5.78-5.3 11.27-7.23 17.19-1.07 2.92 1.6 5.89 4.52 5.92 5.29.36 10.6 0 15.9.14 1.73-3.87 3.47-7.73 5.17-11.62-3.09 0-6.21.22-9.25-.39 3.29-8.26 7.19-16.25 10.68-24.41-4.27-.5-9.1.89-13-.77 1.9-6.4 5.36-12.27 7.8-18.5-4.7-.02-9.38-.05-14.06.02Zm72.75.05v5.21h-9.18v13.93c3.07 0 6.13 0 9.19.06q.12 6 0 12.08c-4.6.09-9.21 0-13.81.07-.06 4.64-.05 9.27 0 13.9 4.61.05 9.23 0 13.84 0v29.59h13.85v-29.57c6.74 0 13.47-.1 20.21 0 2.37-.2 5.08 1.46 5 4.07a110.67 110.67 0 0 1 0 11.08 2.26 2.26 0 0 1-2.12 2.39c-3.85.28-7.71 0-11.57.13 1.7 4 3.35 8 5.28 11.95 6.35-.33 14.11 1.27 18.95-4 4.6-4.26 3.22-11 3.41-16.56-.29-5.85 1.14-12.46-2.49-17.58-3.09-4.34-8.66-5.52-13.68-5.61-.3-7 1.37-15.19-3.78-20.88-4.8-5.38-12.53-5.4-19.17-5.14v-5.2c-4.7.05-9.32.06-13.93.08Zm-49.42 5.22v13.92h8.69v41.74c-4.15.07-8.31 0-12.46.05-2.15 4.62-4.25 9.26-6.34 13.9 15.48.06 31 0 46.44 0v-13.9c-4.45 0-8.91 0-13.36-.05V365.7h8.72v-13.93c-10.54.02-21.11 0-31.69.04Zm91.35 1.28c-3.88 2.94-2.61 8.32-2.78 12.51 2.59 0 5.19.14 7.78-.09 4.16-.38 7.29-5.23 5.62-9.15-1.31-4.3-7.12-6.17-10.62-3.27ZM283 365.72c-.7 9.12-1.41 18.23-2.07 27.35a22.12 22.12 0 0 1-1.32 6.06c2.34 5.35 4.68 10.7 7.18 16 5.6-7.49 7.68-16.93 8.26-26.1.49-7.8 1.36-15.59 1.64-23.4-4.59.16-9.15.05-13.69.09Zm46.13 0 2 25.37c.73 8.48 2.92 17.12 8.1 24 2.47-5.29 4.83-10.63 7.17-16A21.67 21.67 0 0 1 345 393c-.66-9.09-1.38-18.18-2.08-27.27q-6.92-.04-13.82-.01Zm17.16 54.69c7.08 2.09 14.58.66 21.85 1.05 2.14-4.63 4.27-9.27 6.35-13.93-7.27-.28-14.67.76-21.8-1.07q-3.27 6.95-6.43 13.95Z"
      style={{
        fill: "currentColor",
      }}
      transform="translate(-256 -256)"
    />
    <path
      d="M448.77 365.77c3 .43 7-1.22 9.29 1.2.38 3.65.1 7.32.14 11h-9.34q-.09-6.1-.09-12.2Z"
      style={{
        fill: "#00000000",
      }}
      transform="translate(-256 -256)"
    />
    <path
      d="M306.17 347.44h13.63c.13 20.19.08 40.39.09 60.58.07 4.13-1 8.72-4.51 11.3-3.86 3-9 2-13.54 2.17-1.8-3.87-3.54-7.77-5.15-11.73 2.4 0 4.8.06 7.19-.08a2.1 2.1 0 0 0 2.13-2.6c.1-19.89-.01-39.77.16-59.64ZM362.25 346.54c4.68-.07 9.36 0 14 0-2.44 6.23-5.9 12.1-7.8 18.5 3.92 1.66 8.75.27 13 .77-3.49 8.16-7.39 16.15-10.68 24.41 3 .61 6.16.39 9.25.39-1.7 3.89-3.44 7.75-5.17 11.62-5.3-.09-10.61.22-15.9-.14-2.92 0-5.59-3-4.52-5.92 1.93-5.92 4.94-11.41 7.23-17.19-3.3-.22-7.25.72-9.94-1.72-2.1-2.09-.88-5.15.11-7.46q5.31-11.6 10.42-23.26ZM435 346.59h13.84v5.2c6.64-.26 14.37-.24 19.17 5.14 5.15 5.69 3.48 13.9 3.78 20.88 5 .09 10.59 1.27 13.68 5.61 3.63 5.12 2.2 11.73 2.49 17.58-.19 5.57 1.19 12.3-3.41 16.56-4.84 5.23-12.6 3.63-18.95 4-1.93-3.91-3.58-7.94-5.28-11.95 3.86-.11 7.72.15 11.57-.13a2.26 2.26 0 0 0 2.12-2.39 110.67 110.67 0 0 0 0-11.08c.07-2.61-2.64-4.27-5-4.07-6.74-.1-13.47 0-20.21 0v29.57h-13.85v-29.59h-13.84v-13.9c4.6 0 9.21 0 13.81-.07q.13-6 0-12.08c-3.06-.05-6.12-.09-9.19-.06v-13.93h9.18Zm13.77 19.18q0 6.1.09 12.2h9.34c0-3.66.24-7.33-.14-11-2.29-2.42-6.29-.77-9.29-1.2Z"
      style={{
        fill: "#00000000",
      }}
      transform="translate(-256 -256)"
    />
    <path
      d="M385.58 351.81h31.72v13.93h-8.72v41.77c4.45.05 8.91 0 13.36.05v13.9H375.5c2.09-4.64 4.19-9.28 6.34-13.9 4.15 0 8.31 0 12.46-.05v-41.74h-8.69q-.06-7-.03-13.96ZM476.93 353.09c3.5-2.9 9.31-1 10.62 3.27 1.67 3.92-1.46 8.77-5.62 9.15-2.59.23-5.19.1-7.78.09.17-4.19-1.1-9.6 2.78-12.51ZM283 365.72c4.57 0 9.13.07 13.69-.11-.28 7.81-1.15 15.6-1.64 23.4-.58 9.17-2.66 18.61-8.26 26.1-2.5-5.28-4.84-10.63-7.18-16a22.12 22.12 0 0 0 1.32-6.06c.63-9.05 1.34-18.21 2.07-27.33ZM329.1 365.72h13.83c.7 9.09 1.42 18.18 2.08 27.27a21.67 21.67 0 0 0 1.32 6.15c-2.34 5.35-4.7 10.69-7.17 16-5.18-6.91-7.37-15.55-8.1-24s-1.29-16.96-1.96-25.42ZM346.26 420.41q3.17-7 6.4-13.95c7.13 1.83 14.53.79 21.8 1.07-2.08 4.66-4.21 9.3-6.35 13.93-7.27-.39-14.77 1.04-21.85-1.05Z"
      style={{
        fill: "#00000000",
      }}
      transform="translate(-256 -256)"
    />
  </svg>
)