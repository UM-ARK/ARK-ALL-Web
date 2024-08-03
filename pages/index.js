import Head from "next/head";
import Ark from "../components/limited/ark";
import Navbar from "../components/navbar";
import SectionTitle from "../components/sectionTitle";
import { ARKMain } from "../components/uiComponents/ContentBlock"
import {
  FaceSmileIcon,
  DevicePhoneMobileIcon,
  ArrowDownIcon,
  LanguageIcon,
  UserIcon,
  PresentationChartLineIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/solid";
import BusImg from "../public/img/接駁車(宣傳).png";
import EventImg from "../public/img/社團活動(宣傳).png";
import Benefits from "../components/limited/benefits";
import Footer from "../components/footer";
import Cta from "../components/limited/cta";
import Faq from "../components/limited/faq";
import PopupWidget from "../components/popupWidget";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion"
import { ARKDemoFrame } from "../components/uiComponents/Frames";
import Container from "../components/container";

const Home = () => {

  const { t } = useTranslation();

  const benefitOne = {
    title: t("Take the Bus!"),
    desc: t("THBdesc"),
    image: BusImg,
    bullets: [
      {
        title: t("THBbullets1-title"),
        desc: t("THBbullets1-desc"),
        icon: <FaceSmileIcon />,
      },
    ],
  };

  const benefitTwo = {
    title: t("Club Activity Tracking"),
    desc: t("CATdesc"),
    image: EventImg,
    bullets: [
      {
        title: t("CATbullets1-title"),
        desc: t("CATbullets1-desc"),
        icon: <DevicePhoneMobileIcon />,
      },
    ],
  };

  const demoData = [
    {
      name: t('USRST_num'),
      num: ">7800",
      unit: t('USRST_unit_ppl'),
      icon: UserIcon
    },
    {
      name: t('USRST_ch'),
      num: ">7000",
      unit: t('USRST_unit_ppl'),
      icon: LanguageIcon
    },
    {
      name: t("USRST_active"),
      num: ">1100",
      unit: t('USRST_unit_ppl'),
      icon: PresentationChartLineIcon
    },
    {
      name: t("USRST_rate"),
      num: ">70%",
      unit: "",
      icon: HandThumbUpIcon
    },
  ];

  return (
    <ARKMain withOutMargin={true}>
      <Head>
        <title>UM-ARK-ALL</title>
        <meta
          name="description"
          content={t("arkText")}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar fixed hideLogoTextBeforeScroll={true} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        <Ark />

        <SectionTitle
          pretitle={t('User Stats')}
          title={t(`USRST_title`)}>
          {/*t("arkText")*/}
        </SectionTitle>


        <div className={`flex md:w-[40rem] mx-auto my-10 min-[901px]:flex-row max-[900px]:flex-col gap-5`}>
          {demoData.map((data, index) => (
            <div key={index} className={`flex flex-col gap-3 w-48 h-full mx-auto text-center items-center justify-center`}>
              <div>
                <p className={`text-themeColor font-bold text-sm`}>{data.name}</p>
              </div>
              <data.icon className={`w-10 mx-auto text-themeColor`} />
              <div className={`flex flex-row items-end font-bold text-themeColor`}>
                <p className={`text-3xl`}>{data.num}</p>
                <p className={`text-sm opacity-50`}>{data.unit}</p>
              </div>
            </div>
          ))}
        </div>



        <SectionTitle
          pretitle={t("More Features")}
          title={t("Why Use UM-ARK-ALL?")}>
          {t("arkText")}
        </SectionTitle>

        <Benefits data={benefitOne} />
        <Benefits imgPos="right" data={benefitTwo} />

        <SectionTitle
          pretitle={t("FAQ")}
          title={t("ARK ALL Frequently Asked Questions")}>
          {t("Frequently Asked Questions")}
        </SectionTitle>
        <Faq />
        <Cta />
      </motion.div>

      <Footer />
      <PopupWidget />
    </ARKMain>
  );
}

export default Home;