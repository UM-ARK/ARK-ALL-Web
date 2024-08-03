import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Container from "../components/container";

import { motion } from "framer-motion"

const str = `
# ARK ALL的由來？
ARK ALL 是 2022 年暑假，幾位不知名的 FST 同學奮戰兩個月做出來的，整個應用全程都是由我們自主開發，其中都踩了不少坑，掉了不少頭髮 QAQ。

## ARK 小程式
ARK ALL 的前身是 ARK 微信小程式，該小程式已集成 ARK 學術分享會發佈、UM 校園巴士等功能，也是首次由第三方聯合 FST 的眾學會、社團，為如今的 ARK ALL 運作模式提供了寶貴的經驗。
小程式於 21 年 9 月發佈，22 年 4 月停運，2 個月後作者與這幾位不知名同學正式成立新 ARK 開發團隊，ARK ALL 項目正式立項開始開發。

# ARK ALL免費吗？
ARK ALL 為免費軟件，組織申請進駐也無需費用。作者為愛發電 ing。。。
希望 ARK ALL 能越來越壯大，最後能真正包羅 UM 的所有。同學們的喜歡與讚揚就是對作者最大的支持~~

# ARK ALL是澳大官方應用程式嗎？
非也~ 至少在作者寫下這段文字時仍不是。如有改善 ARK ALL 的功能和體驗的方法、渠道，開發者團隊都會盡力去嘗試的！

# 那幾位不知名同學是？
ARK ALL 第一批代碼貢獻者：
- Rookie, yyyyyyounger
- Tony, tony153
- Box, BoxMars
- Syukugen, Syukugen
- Kalo, K4Lok 
- Kelvin, keltam27
- YZ Huang 為第一版的 UI 設計師，製作了大部分的設計稿。
kevin、Mega、Mane、Ray 等大佬都提供了友情技術支援。
`;

const mdStyles = {
  "# ": "font-bold text-3xl mt-5 text-themeColor",
  "## ": "font-bold text-2xl text-themeColor",
  "### ": "font-bold text-xl",
  "- ": "list-disc",
};

const toMD = (_str) => {
  const lines = _str.split("\n");


  const parseLink = (text) => {

    // Markdown风格的链接 [text](url)
    const markdownLinkPattern = /\[*?\]\(*?\)/g;
    text = text.replace(markdownLinkPattern, (_, text, url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`);
    return text;
  };

  const elements = lines.map((line, idx) => {
    let element = void 0;

    let haveStyle = Object.entries(mdStyles).some(([startCode, style]) => {
      const content = parseLink(line.slice(startCode.length));
      element = <p key={idx} className={style}>{content}</p>;
      if (line.startsWith(startCode) && startCode.startsWith('#')) {
        element = <p key={idx} className={style}>{content}</p>;
        return true;
      } else if (line.startsWith(startCode) && startCode.startsWith('-')) {
        element = <li key={idx} className={style}>{content}</li>;
        return true;
      }
      return false;
    });

    if (!haveStyle) {
      element = <p key={idx} className={`font-regular mt-2`}>{line}</p>
    }

    return element;
  });

  return <div className={`min-[790px]:px-48`}>{elements}</div>
}

const about_us = () => {
  // toMD(str);
  return (
    <div className="relative">
      <Navbar selected={"About_us"} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Container>
          {toMD(str)}
        </Container>
      </motion.div>
      <Footer />
    </div>
  );
};

export default about_us;