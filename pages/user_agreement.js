import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Container from "../components/container";

import { useTranslation } from "react-i18next";

import SectionTitle from "../components/sectionTitle";
import { user_agreement_section_data } from 'public/data/user_agreement';

import { motion } from "framer-motion"

const UASection = (props) => {
  const { pretitle, title, list } = props;
  return (
    <React.Fragment>
      <SectionTitle
        className={`sticky top-[64px] backdrop-blur-3xl bg-[#ffffff99] dark:bg-[#17171799] rounded-lg`}
        pretitle={pretitle}
        title={title}>
      </SectionTitle>
      <Container className="flex flex-wrap w-full h-full lg:mx-60 md:mx-20 sm:mx-0">
        <ol>
          {list.map((text, index) => (
            <li className={"flex flex-row gap-3"}>
              <p className={"text-right text-themeColor font-bold"}>{`${index + 1}. `}</p>
              <p>{`${text}`}</p>
            </li>
          ))}
        </ol>
      </Container>
    </React.Fragment>
  );
};

const user_agreement = () => {

  return (
    <div>
      <Navbar selected={"User_Agreement"} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Container className="flex flex-wrap w-full h-full justify-center">
          {Object.entries(user_agreement_section_data).map(([k, content]) => (
            <UASection
              pretitle={content.pretitle}
              title={content.title}
              list={content.list} />
          ))}
          <br /><br />
        </Container>
      </motion.div>
      <Footer />
    </div>
  );
};

export default user_agreement;