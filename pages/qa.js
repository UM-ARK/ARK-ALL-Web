import React from 'react';
import Container from "../components/container";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import PopupWidget from "../components/popupWidget";
import { ARKMain } from "../components/uiComponents/ContentBlock";

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
      question: t("如何在APP首頁發佈活動？"),
      answer: t("首頁是為澳大組織專設的活動公告欄，供同學集中獲取社團活動資訊。組織賬號申請可見下方說明，普通用戶可使用論壇發佈話題討論~"),
    },
    {
      question: "如何註冊組織賬號，進駐 ARK ALL？",
      answer: `請將註冊電郵發送到'umacark@gmail.com'，在此之前您還應閱讀和同意組織用戶的用戶協議。

      Email 請至少包括以下內容：
        組織名: [組織名]
        賬號名: [賬號名]
        登錄密碼: [登錄密碼]
        組織類型: [組織類型]
        組織 Logo: [附件]
        組織證明: [組織證明]
        發件人姓名

        說明: 
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
        
          請發件人使用澳大電郵發送
          ("xxx@um.edu.mo" 或 "xxx@connect.um.edu.mo" 或 "xxx@umac.mo" 或 社團正在使用的Email)。
          
          發件人的姓名和 UM ID 將被記錄。如有冒名、違反用戶協議等行為，則依法追究。`
    },
    {
      question: t("Is ARK ALL free?"),
      answer: t("A1"),
    },
    {
      question: t("ARK ALL 盈利嗎？"),
      answer: t("ARK ALL是非盈利項目，可以直觀感受到APP的乾淨整潔，ARK ALL沒有收取任何廣告費用。\nARK ALL也是開放平台，也歡迎珠澳臨近的寶藏高質商戶/活動能宣傳到澳大師生群體中。發佈推廣前，請判斷是否適合澳大師生群體。"),
    },
    {
      question: t("ARK ALL 的運作成本？"),
      answer: t("目前每年淨支出約1,500RMB，未包含開發維護費用。每年純支出，0收入，希望各界人士多多捐贈支持！捐贈頁：https://github.com/UM-ARK/Donate"),
    },
    {
      question: t("如何加入 ARK 開發團隊？"),
      answer: t("隨時歡迎先，通過電腦學會 / GitHub / Email交流！我們歡迎各專業的同學在ARK中發光發熱，實現你的idea~ 打造全澳最強、廣東最強、中國最強校園APP！"),
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
      question: t("ARK 系列產品組成"),
      answer: t("截止2026年，目前ARK由APP: ARK ALL，Harbor論壇: harbor.umall.one，百科: wiki.umall.one，組織賬號系統: umall.one組成。"),
    },
    {
      question: t("ARK ALL's origin"),
      answer: `
      ARK ALL 是 2022 年暑假，由幾位 FST(ECE+CIS) 同學奮戰兩個月做出來的，
      整個應用全程由澳大同學自主開發，踩了不少坑，掉了不少頭髮 QAQ。  
      
      ARK ALL 的前身是 ARK 微信小程式。
      該小程式已集成 ARK 學術分享會發佈、UM 校園巴士等功能，
      也是首次由第三方聯合 FST 的眾學會、社團，
      為如今的 ARK ALL 運作模式提供了寶貴的經驗。  
      
      小程式於 2021 年 9 月發佈，2022 年 4 月停運。
      2個月後正式成立新 ARK 開發團隊，ARK ALL 項目正式立項開始開發。
      
      2022/2023學年 Sem1 ARK ALL 1.0版本正式上線。
      首個名稱是UM ALL，因為某些原因改名為ARK ALL。
      `,
    },
    {
      question: t("I have feedback/suggestions to provide to the developers"),
      answer: t("A4"),
    },
  ];

  return (
    <ARKMain withOutMargin={true}>
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
                        <div className={`whitespace-pre-wrap`}>{item.answer}</div>
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
    </ARKMain>
  );
};

export default qa;