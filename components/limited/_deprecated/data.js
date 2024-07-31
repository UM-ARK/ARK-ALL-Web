import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

import BusImg from "../public/img/接駁車(宣傳).png";
import EventImg from "../public/img/社團活動(宣傳).png";

import { useTranslation } from "react-i18next";

const benefitOne = {
  title: ("Take the Bus!"),
  desc: "為了方便學生搭乘校園巴士，開啟App中的【巴士報站】功能後，可切換到巴士報站頁面，實時查看巴士到站信息。",
  image: BusImg,
  bullets: [
    {
      title: "'九點半的課快到時間了，快上巴士!'",
      desc: "特別是住在蔡繼有書院的同學更有用哦",
      icon: <FaceSmileIcon />,
    },
    // {
    //   title: "Improve acquisition",
    //   desc: "aaabbb",
    //   icon: <ChartBarSquareIcon />,
    // },
    // {
    //   title: "Drive customer retention",
    //   desc: "This will be your last bullet point in this section.",
    //   icon: <CursorArrowRaysIcon />,
    // },
  ],
};

const benefitTwo = {
  title: "社團活動追蹤",
  desc: "為了讓學生輕鬆掌握校園社團的最新消息和活動，開啟App中【社團】功能。學生可以選擇感興趣的社團，App會實時推送社團的活動預告、報名通知等信息。在活動詳情頁內，學生可以查看活動時間、地點、費用等信息",
  image: EventImg,
  bullets: [
    {
      title: "豐富多彩的社團選擇!",
      desc: "已入駐超過20+社團!",
      icon: <DevicePhoneMobileIcon />,
    },
    // {
    //   title: "aaabbb",
    //   desc: "aaabbb",
    //   icon: <AdjustmentsHorizontalIcon />,
    // },
    // {
    //   title: "aaabbb",
    //   desc: "aaabbb",
    //   icon: <SunIcon />,
    // },
  ],
};


export { benefitOne, benefitTwo };
