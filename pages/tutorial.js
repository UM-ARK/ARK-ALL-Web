import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Container from '../components/container';
import PopupWidget from "../components/popupWidget";
import Image from "next/image";

import { ARKMain } from '../components/uiComponents/ContentBlock';
import { StdButton } from "../components/uiComponents/StdButton";
import { ChevronLeftIcon } from "@heroicons/react/24/solid"

import img_0 from '../public/img/web_tur/0.png';
import img_1 from '../public/img/web_tur/1.png';
import img_2 from '../public/img/web_tur/2.png';
import img_3 from '../public/img/web_tur/3.png';
import img_4 from '../public/img/web_tur/4.png';
import img_5 from '../public/img/web_tur/5.png';
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion"

const ImagePreview = (props) => {
  const { displayPreview, setDisplayPreview } = props;
  return (
    displayPreview && (
      <div className={`bg-[#000000dd] fixed top-0 bottom-0 left-0 right-0 z-[100] py-[5em] md:px-[10em] lg:px-[5em] flex flex-col items-center gap-5`}>
        <StdButton textContent="返回" Icon={ChevronLeftIcon} onClickFunc={() => { setDisplayPreview(null) }} />
        <Image
          src={displayPreview}
          height="auto"
          alt="tutorial"
          className="block object-cover rounded-tl-lg rounded-tr-lg"
          placeholder="blur"
          blurDataURL={displayPreview.src} />
      </div>
    )
  );
};

const tutorial = () => {

  const { t } = useTranslation();
  const [m_displayPreview, setDisplayPreview] = useState(null);

  const tur_arr = [
    { img: img_0, title: `登錄社團賬號`, txt: `若要登錄社團賬號，請點擊導航欄中的“社團登錄”，並輸入自己社團的賬號密碼。然後點擊登錄按鈕即可登錄。` },
    { img: img_1, title: `社團賬號主頁`, txt: `社團賬號主頁包含了所有賬號相關的訊息，包括社團名稱、封面、頭像、簡介、tag、等訊息。在這裏，您可以選擇編輯社團主頁或新增一個活動。您也可以點擊底部的活動卡片來查看活動詳情。` },
    { img: img_2, title: `編輯社團主頁`, txt: `編輯社團簡介，新增或減少您的聯係方式。可刪除或添加社團圖片。請注意，社團圖片不可超過5張。 點擊上傳即可保存您的改動，若要放棄改動請點擊取消。` },
    { img: img_3, title: `新增活動`, txt: `若要新增一個活動，請填寫活動名稱、簡介、類型和時間，並上傳活動封面。“普通活動”類型的活動可以上傳相關圖片，且可以填寫地點。“網頁”類型的活動需填寫鏈接。編輯完成後，點擊上傳即可。` },
    { img: img_4, title: `查看活動`, txt: `在活動詳情頁面，您可以看到活動的標題、封面、時間、地點、簡介、相關圖片等訊息。您還可以點擊編輯活動按鈕來修改活動内容。` },
    { img: img_5, title: `編輯活動`, txt: `兩種類型的活動修改的部分大同小異，具體可看上圖。請注意，活動開始時間不可在結束時間之後。此外，相關圖片總數不可超過5張。若要刪除活動，請點擊“刪除活動”按鈕。` },
  ]
  return (
    <ARKMain title={"使用教學"} withOutMargin={true}>
      {/**
      <ImagePreview displayPreview={m_displayPreview} setDisplayPreview={setDisplayPreview} />
      */}
      <Navbar selected={"Tutorial"} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Container className={"flex flex-wrap gap-5 items-top justify-center"}>

          {tur_arr.map(itm => (

            <div
              className={"block h-full items-top w-[512px] justify-center mx-auto hover:cursor-pointer hover:scale-[1.01] transition-all"}
              onClick={() => { setDisplayPreview(itm.img) }}>
              <Image
                src={itm.img}
                height="auto"
                alt="tutorial"
                className="block object-cover rounded-tl-lg rounded-tr-lg border-[3px] border-themeColorUltraLight dark:border-gray-800"
                placeholder="blur"
                blurDataURL={itm.img.src} />
              <div className={"rounded-bl-lg rounded-br-lg text-themeColor bg-themeColorUltraLight dark:bg-gray-800 px-5 py-3"}>
                <p className={"text-center text-sm font-bold"}>
                  {itm.title}
                </p>
                <p>
                  {`${itm.txt}`}
                </p>
              </div>

            </div>

          ))}
        </Container>
      </motion.div>

      <Footer />
      <PopupWidget />
    </ARKMain>
  );
};

export default tutorial;