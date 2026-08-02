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
  CalendarDaysIcon,
  Squares2X2Icon,
  NewspaperIcon,
} from "@heroicons/react/24/solid";
import BusImg from "../public/img/home_page/advertisements/Bus.png";
import EventImg from "../public/img/home_page/advertisements/Home3.png";
import CourseImg from "../public/img/home_page/advertisements/Course.png";
import FeaturesImg from "../public/img/home_page/advertisements/Features.png";
import NewsImg from "../public/img/home_page/advertisements/News.png";
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

  const demoData = [
    {
      name: t('USRST_num'),
      num: ">21000",
      unit: t('USRST_unit_ppl'),
      icon: UserIcon
    },
    {
      name: t('USRST_ch'),
      num: ">18500",
      unit: t('USRST_unit_ppl'),
      icon: LanguageIcon
    },
    {
      name: t("USRST_active"),
      num: ">4700",
      unit: t('USRST_unit_ppl'),
      icon: PresentationChartLineIcon
    },
  ];

  const benefitData = [
    {
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
    },
    {
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
    },
    {
      title: t("Course & Schedule Sim"),
      desc: t("CSSdesc"),
      image: CourseImg,
      bullets: [
        {
          title: t("CSSbullets1-title"),
          desc: t("CSSbullets1-desc"),
          icon: <CalendarDaysIcon />,
        },
      ],
    },
    {
      title: t("All Features Hub"),
      desc: t("AFHdesc"),
      image: FeaturesImg,
      bullets: [
        {
          title: t("AFHbullets1-title"),
          desc: t("AFHbullets1-desc"),
          icon: <Squares2X2Icon />,
        },
      ],
    },
    {
      title: t("News & Events"),
      desc: t("NEdesc"),
      image: NewsImg,
      bullets: [
        {
          title: t("NEbullets1-title"),
          desc: t("NEbullets1-desc"),
          icon: <NewspaperIcon />,
        },
      ],
    },
  ]

  return (
    <ARKMain
      title="澳大學生專用 APP"
      seoTitle={t("Home_seo_title")}
      description={t("Home_seo_desc")}
      canonicalPath="/"
      withOutMargin={true}
    >
      <Navbar fixed hideLogoTextBeforeScroll={true} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>

        {/** 大首頁 */}
        <Ark />

        {/** 用戶數據 */}
        <section>
          <SectionTitle
            pretitle={t('User Stats')}
            title={t(`USRST_title`)}>
            {/*t("arkText")*/}
          </SectionTitle>

          <div className={`flex md:w-[40rem] mx-auto mt-10 mb-24 min-[901px]:flex-row max-[900px]:flex-col gap-5`}>
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
        </section>

        {/* 好處 */}
        <section>
          <SectionTitle
            pretitle={t("More Features")}
            title={t("Why Use UM-ARK-ALL?")}>
            {t("arkText")}
          </SectionTitle>

          {benefitData.map((v, k) => (
            <Benefits key={k} data={v} imgPos={k % 2 == 0 ? "left" : "right"} />
          ))}

        </section>

        { /** FAQ */}
        <section>
          <SectionTitle
            pretitle={t("FAQ")}
            title={t("ARK ALL Frequently Asked Questions")}>
            {t("Frequently Asked Questions")}
          </SectionTitle>
          <Faq />
        </section>

        {/** 下載集合 */}
        <Cta />
      </motion.div>

      <Footer />
      <PopupWidget />
    </ARKMain>
  );
}

export default Home;
