import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Container from "../components/container";

import { useTranslation } from "react-i18next";

import SectionTitle from "../components/sectionTitle";

const user_agreement = () => {

  const { t } = useTranslation();

  var showdown = require('showdown'),
    converter = new showdown.Converter(),
    text = `# ARK ALL 用戶使用協議

    更新時間: 2023-8-23 11:04:56
    
    ## 特別提示
    
    1. 為使用本手機應用程式及其服務，您應閱讀並遵守《ARK ALL 用戶使用協議》（以下簡稱“本協議”）。請您務必審慎閱讀、充分理解各條款內容，以及同意或使用某項服務的單獨協議，並選擇接收或不接受。
    
    2. 除非您已閱讀並接收本協議的所有條款，否則您不應、無權繼續使用本軟件及其相關服務。您的使用、獲取賬號、登錄等行為即視為您已閱讀並同意遵守本協議的約束。
    
    3. ARK ALL 應用程式由澳門大學學生自主發起、開發、發佈，並非澳門大學官方應用，而屬於個人開發者或第三方開發者，以下簡稱“本組織”。
    
    ## 用戶對象
    
    ### 個人用戶 或 遊客用戶
    
    1. 本軟件並非澳大官方應用。
    2. 本軟件代碼在 Github 開源。
    3. 用戶是自願、信任地使用其中的功能。
    4. 用戶隨時可以通過自己的瀏覽器打開相關功能。
    
    ### 組織用戶（社團、組織賬號）
    
    1. 組織用戶應遵守當地的各項法律法規，不發佈與傳播不良內容。
    2. 如某組織用戶屢次受到舉報，或有任何嚴重違法行為。本組織將收回該組織賬號的使用權，並刪除其發佈的內容。
    3. 組織用戶所發佈的內容不代表本組織立場。
    4. 本軟件不需收取組織用戶的費用。
    5. 組織用戶應妥善保存在本軟件註冊的賬號和密碼，確保該賬號沒有被錯誤使用。
    6. 組織用戶應合理使用本軟件的宣傳資源，活動、公告等時效性內容不應過早發佈。
    7. 如 APP 內提示，更新不及時，組織賬號應以本頁的協議內容為準。
    
    ### 全體用戶
    
    1. 本軟件旨為整合澳大資訊，需要所有用戶共同監管內容的合理和合法性。
    2. 本組織歡迎各種途徑的反饋，但本組織非專業團隊，只能盡力為用戶解決問題。
    3. 用戶可以向第三方推廣、分享本軟件的資訊。
    
    ## 服務內容與授權使用範圍
    
    1. 本軟件根據用戶實際需求提供服務，例如發佈活動、修改信息等。
    1. 組織活動發佈系統、選咩課、論壇、第三方媒體公眾號的功能為本組織開發。
    1. 服務頁除本組織開發的功能外，跳轉的網站都屬於澳大相關部門所設立，澳大相關部門保留其解釋權利。
    1. 本組織保留隨時變更、中斷或終止部分或全部本組織開發功能、本 APP 的權利。
    
    ### 本軟件的授權使用範圍：
    
    1. 用戶可以在手機上安裝、使用、顯示、運行本軟件及其相關服務。
    2. 保留權利：未明示授權的其他一切權利均由本組織所有。    
    `,
    html = converter.makeHtml(text);
  return (
    <div>
      <Navbar />
      <Container className="flex flex-wrap w-full h-full">
        <SectionTitle
          pretitle={"更新時間: 2023-8-23 11:04:56"}
          title={"ARK ALL 用戶使用協議"}>
        </SectionTitle>
        <Container className="flex flex-wrap w-full h-full lg:mx-60 md:mx-20 sm:mx-0">
          <ol>
            <li>1. 為使用本手機應用程式及其服務，您應閱讀並遵守《ARK ALL 用戶使用協議》（以下簡稱“本協議”）。請您務必審慎閱讀、充分理解各條款內容，以及同意或使用某項服務的單獨協議，並選擇接收或不接受。</li>
            <li>2. 除非您已閱讀並接收本協議的所有條款，否則您不應、無權繼續使用本軟件及其相關服務。您的使用、獲取賬號、登錄等行為即視為您已閱讀並同意遵守本協議的約束。</li>
            <li>3. ARK ALL 應用程式由澳門大學學生自主發起、開發、發佈，並非澳門大學官方應用，而屬於個人開發者或第三方開發者，以下簡稱“本組織”。</li>
          </ol>
        </Container>
        <SectionTitle
          pretitle={"用戶對象"}
          title={"個人用戶-或-遊客用戶"}>
        </SectionTitle>
        <Container className="flex flex-wrap w-full h-full lg:mx-80 md:mx-20 sm:mx-0">
          <ol>
            <li>1. 本軟件並非澳大官方應用。</li>
            <li>2. 本軟件代碼在 Github 開源。</li>
            <li>3. 用戶是自願、信任地使用其中的功能。</li>
            <li>4. 用戶隨時可以通過自己的瀏覽器打開相關功能。</li>
          </ol>
        </Container>
        <SectionTitle
          title={"組織用戶（社團、組織賬號）"}>
        </SectionTitle>
        <Container className="flex flex-wrap w-full h-full lg:mx-60 md:mx-20 sm:mx-0">
          <ol>
            <li>1. 組織用戶應遵守當地的各項法律法規，不發佈與傳播不良內容。</li>
            <li>2. 如某組織用戶屢次受到舉報，或有任何嚴重違法行為。本組織將收回該組織賬號的使用權，並刪除其發佈的內容。</li>
            <li>3. 組織用戶所發佈的內容不代表本組織立場。</li>
            <li>4. 本軟件不需收取組織用戶的費用。</li>
            <li>5. 組織用戶應妥善保存在本軟件註冊的賬號和密碼，確保該賬號沒有被錯誤使用。</li>
            <li>6. 組織用戶應合理使用本軟件的宣傳資源，活動、公告等時效性內容不應過早發佈。</li>
            <li>7. 如 APP 內提示，更新不及時，組織賬號應以本頁的協議內容為準。</li>
          </ol>
        </Container>
        <SectionTitle
          title={"全體用戶"}>
        </SectionTitle>
        <Container className="flex flex-wrap w-full h-full lg:mx-80 md:mx-20 sm:mx-0">
          <ol>
            <li>1. 本軟件旨為整合澳大資訊，需要所有用戶共同監管內容的合理和合法性。</li>
            <li>2. 本組織歡迎各種途徑的反饋，但本組織非專業團隊，只能盡力為用戶解決問題。</li>
            <li>3. 用戶可以向第三方推廣、分享本軟件的資訊。</li>
          </ol>
        </Container>
        <SectionTitle
          title={"服務內容與授權使用範圍"}>
        </SectionTitle>
        <Container className="flex flex-wrap w-full h-full lg:mx-60 md:mx-20 sm:mx-0">
          <ol>
            <li>1. 本軟件根據用戶實際需求提供服務，例如發佈活動、修改信息等。</li>
            <li>2. 組織活動發佈系統、選咩課、論壇、第三方媒體公眾號的功能為本組織開發。</li>
            <li>3. 服務頁除本組織開發的功能外，跳轉的網站都屬於澳大相關部門所設立，澳大相關部門保留其解釋權利。</li>
            <li>4. 本組織保留隨時變更、中斷或終止部分或全部本組織開發功能、本 APP 的權利。</li>
          </ol>
        </Container>
        <SectionTitle
          title={"本軟件的授權使用範圍："}>
        </SectionTitle>
        <Container className="flex flex-wrap w-full h-full lg:mx-60 md:mx-20 sm:mx-0">
          <ol>
            <li>1. 用戶可以在手機上安裝、使用、顯示、運行本軟件及其相關服務。</li>
            <li>2. 保留權利：未明示授權的其他一切權利均由本組織所有。</li>
          </ol>
        </Container>
      </Container>
      <Footer />
    </div>
  );
};

export default user_agreement;