import Head from "next/head";
import Ark from "../components/limited/ark";
import Navbar from "../components/navbar";
import SectionTitle from "../components/sectionTitle";
import { ARKMain } from "../components/uiComponents/ContentBlock"

// data

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

// 


import Video from "../components/video";
import Benefits from "../components/limited/benefits";
import Footer from "../components/footer";
import Testimonials from "../components/testimonials";
import Cta from "../components/limited/cta";
import Faq from "../components/limited/faq";
import PopupWidget from "../components/popupWidget";

import { useTranslation, I18nextProvider } from "react-i18next";

import { useRouter } from 'next/router';
import { motion } from "framer-motion"

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

  // data

  const router = useRouter();

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
        transition={{ duration: 0.5 }}
      >
        <Ark />

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