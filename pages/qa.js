import React from 'react';
import Container from "../components/container";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import PopupWidget from "../components/popupWidget";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion"

const qa = () => {

  const { t } = useTranslation();

  var showdown = require('showdown'),
    converter = new showdown.Converter(),
    text = `# hello, markdown!`,
    html = converter.makeHtml(text);

  const faqdata = [
    {
      question: "我們組織想進駐 ARK ALL，要如何註冊呢？",
      answer: converter.makeHtml(`# 只要一封電郵即可，在此之前您還應閱讀和同意在我們網站對組織用戶的用戶協議。
      聯絡郵箱：'umacark@gmail.com'

      Email 請包括以下內容：

      - 組織名: [組織名]
      - 賬號名: [賬號名]
      - 登錄密碼: [登錄密碼]
      - 組織類型: [組織類型]
      - 組織 Logo: [附件]
      - 組織證明: [組織證明]
      - 發件人姓名

      # 說明: 
      
      - 組織名(自定義)。展示用途，不宜過長，中文更好，亦可以是大家熟知的簡稱。
        - 例如電腦學會，攝影學會等。
      - 賬號名(自定義)。在 ARK ALL 登錄時輸入。
        - 支持英文、數字。
      - 登錄密碼(自定義)。在 ARK ALL 登錄時輸入。
        - 支持英文、數字。
      - 組織類型。以下為可選項，請選擇最匹配的類型。
        - 學生會。工作、活動性質與學生會正相關，例如榮譽學院學生會。
        - 學會。總體偏學術類型的協會/學會，例如電腦學會、香港工程師學會。
        - 社團。更貼近競賽、體育、娛樂等類型的組織可選。
        - 書院。工作、活動性質與書院正相關，例如 LCWC 院生會。
        - 澳大官方。官方，或需要官方性質定義的組織。
        - 媒體。請先電郵聯繫開發者。
        - 商業。請先電郵聯繫開發者。
        - (此類型並非澳大官方定義的類型，
          組織可以自行決定其屬於哪種類型，但我們都可能會對組織的分類提出建議)
      - 組織 Logo。正方形或圓形圖片，jpg/png。
      - 組織證明。任何一種可以證明貴組織是在澳大運作的組織的證明。
        - 可以是圖片、文件等。
      - 發件人姓名。
      
        請發件人使用澳大電郵
        ("xxx@um.edu.mo" 或 "xxx@connect.um.edu.mo" 或 "xxx@umac.mo")
        將以上註冊信息發送到 "umacark@gmail.com"。
        
        # 發件人的姓名和 UM ID 將被記錄。如有冒名、違反用戶協議等行為，則依法追究。
    `),
    },
    {
      question: t("Is ARK ALL free?"),
      answer: t("A1"),
    },
    {
      question: t("Does ARK ALL collect my password?"),
      answer: t("A2"),
    },
    {
      question: t("Is ARK ALL an official app of the University of Macau?"),
      answer: t("A3"),
    },
    {
      question: t("ARK ALL's origin"),
      answer: converter.makeHtml(`
      ARK ALL 是 2022 年暑假，幾位不知名的 FST 同學奮戰兩個月做出來的，
      整個應用全程都是由我們自主開發，其中都踩了不少坑，掉了不少頭髮 QAQ。  
      
      ARK ALL 的前身是 ARK 微信小程式。
      該小程式已集成 ARK 學術分享會發佈、UM 校園巴士等功能，
      也是首次由第三方聯合 FST 的眾學會、社團，
      為如今的 ARK ALL 運作模式提供了寶貴的經驗。  
      
      小程式於 2021 年 9 月發佈，2022 年 4 月停運。
      2個月後作者與這幾位不知名同學正式成立新 ARK 開發團隊
      ARK ALL 項目正式立項開始開發。
      `),
    },
    {
      question: t("ARK ALL's Add Drop feature is not working properly."),
      answer: "因為澳大系統的固有設計問題，例如 Add Drop 此類網頁會需要彈窗操作，盡量在電腦上操作會更便利。因此留下複製鏈接和在瀏覽器打開的功能。該功能主要是為新同學準備，初來乍到並不知道舊生所講的服務是何，ARK ALL 可以讓同學對澳大服務先有直觀的了解。",
    },
    {
      question: t("Will ARK ALL have a desktop version?"),
      answer: "Web、Mac，Windows 等一切皆有可能。但目前來講網頁版在緊張施工中，第一步先為組織賬號可在電腦使用的操作平台，更方便發佈資訊。接下來很有可能再將部分重要功能移植到 Web。But anyway，碼農作為新時代農民工，我們還是很希望有發燒友加入到我們的開發隊列中，共同向 ARK ALL 的目標邁進！",
    },
    {
      question: t("I have feedback/suggestions to provide to the developers"),
      answer: t("A4"),
    },
  ];

  return (
    <div>
      <Navbar selected={"QA"} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Container className="!p-0">
          <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
            {faqdata.map((item, index) => (
              <div key={item.question} className="mb-5">
                <Disclosure>
                  {({ open }) => (
                    <React.Fragment>
                      <Disclosure.Button
                        className="flex items-center justify-between w-full px-4 py-4 
                          text-lg text-left text-gray-800 
                          rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none 
                          focus-visible:ring focus-visible:ring-indigo-100 
                          focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200">
                        <span>{item.question}</span>
                        <ChevronUpIcon
                          className={`${open ? "transform rotate-180" : ""
                            } w-5 h-5 text-themeColor`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel
                        className="px-4 pt-4 pb-2 text-gray-500 dark:text-gray-300"
                        as="ul">
                        <div dangerouslySetInnerHTML={{ __html: item.answer }}></div>
                      </Disclosure.Panel>
                    </React.Fragment>
                  )}
                </Disclosure>
              </div>
            ))}
          </div>
        </Container>
      </motion.div>
      <Footer />
      <PopupWidget />
    </div>
  );
};

export default qa;