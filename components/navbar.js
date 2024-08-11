import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image"

import WarningBanner from "/components/micros/WarningBanner";
import { HamburgerBtn } from "components/uiComponents/HamburgerBtn"

import { useTranslation } from "react-i18next";
import NavbarTools from "./uiComponents/NavbarTools/NavbarTools";

const navigation = [
  "Home",
  "ClubSignin",
  "Tutorial",
  "QA",
  "User_Agreement",
  "About_us",
];

const Navbar = (props) => {
  const { selected = "", fixed, hideLogoTextBeforeScroll = false } = props;
  const { t } = useTranslation();

  /** 移動menu是否打開 */
  const [m_mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /** 監聽瀏覽器窗口滾動高度 */
  const [m_atTop, setAtTop] = useState(true);

  const handleScroll = () => {
    const position = window.scrollY;
    setAtTop(position == 0);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const NBLink = (props) => {
    const { destination, isMobile, isSelected = false, } = props;
    const styles = {
      "PC": `inline-block min-[1550px]:w-[180px] px-4 py-2 text-lg ${isSelected ? "text-themeColor font-bold" : "text-gray-800 dark:text-gray-200 font-normal"} no-underline rounded-md  hover:text-themeColor hover:bg-themeColorUltraLight dark:hover:text-themeColor dark:hover:bg-gray-800 hover:scale-[1.02] transition-all focus:text-themeColor focus:bg-themeColorUltraLignt focus:outline-none dark:focus:bg-gray-800 hover:cursor-pointer`,
      "Mobile": "w-full px-4 py-5 text-2xl text-gray-500 dark:text-gray-200 hover:text-themeColor hover:bg-[#0000000d] dark:hover:text-themeColor dark:hover:bg-[#ffffff0d] focus:text-themeColor focus:bg-themeColorUltraLignt focus:outline-none dark:focus:bg-gray-800 hover:cursor-pointer"
    };

    return (
      <Link href={destination == 'home' ? '/' : '/' + destination}>
        <div className={isMobile ? styles.Mobile : styles.PC}>
          {props.children}
        </div>
      </Link>
    );
  };

  return (
    <div className={`${fixed ? "fixed" : "sticky"} top-0 w-full ${m_atTop && !m_mobileMenuOpen ? "" : "backdrop-blur-3xl bg-[#ffffff99] dark:bg-[#17171799]"} z-[99] transition-all`}>
      <nav className="container relative w-full flex flex-wrap items-center justify-between pt-4 py-4 px-0 mx-auto lg:justify-between xl:px-0 ">

        {/* Logo and Mobile Menu  */}
        <div className="flex flex-wrap items-center justify-between w-full lg:w-auto gap-1">
          {/* Logo */}
          <Link href="/" className={`mx-5`}>
            <div className="flex flex-row items-left space-x-5 text-2xl font-medium text-indigo-500 dark:text-gray-100">
              <Image
                src="/img/logo.png"
                alt="N"
                width="32"
                height="32"
                className="w-8 rounded-md"
              />
              <div className={`max-[1280px]:hidden text-themeColor font-bold opacity-${(hideLogoTextBeforeScroll && m_atTop) ? "0" : "100"} transition-all`}>
                ARK ALL
              </div>
            </div>
          </Link>

          {/* Hamburger */}
          <HamburgerBtn setMobileMenuOpen={setMobileMenuOpen} />
        </div>

        {/* menu  */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex gap-3">
            {navigation.map((menu, index) => (
              <li className="nav__item" key={index}>
                <NBLink destination={menu.toLowerCase()} isSelected={selected == menu}>
                  {menu.toLowerCase() == 'home' ? t('PG_HOME') : t(menu)}
                </NBLink>
              </li>
            ))}
          </ul>
        </div>

        {/** 語言、主題切換 */}
        <NavbarTools mode={"PC"} />
      </nav>

      <WarningBanner />

      {/* 移動端menu */}
      <div className={`lg:hidden w-full items-center text-center 
                        ${!m_mobileMenuOpen ? "max-h-0" : "max-h-[600px]"} 
                        overflow-clip 
                        transition-all`}>
        <ul className={`items-center justify-end flex-1 list-none lg:pt-0 lg:flex gap-7 pb-5`}>
          <li>
            {/** 語言、主題切換 */}
            <NavbarTools mode={"Mobile"} />
          </li>
          {/**
                    <li>
            <NBLink destination={""} isMobile>{t("PG_HOME")}</NBLink>
          </li> */}
          {navigation.map((menu, index) => (
            <li className="nav__item " key={index}>
              <NBLink destination={menu.toLowerCase()} isMobile>
                {t(menu)}
              </NBLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
