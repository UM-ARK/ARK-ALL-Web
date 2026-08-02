import React from 'react';
import Link from "next/link";
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

  const faqdata = [
    {
      question: t("How to install or download ARK ALL?"),
      answer: (
        <>
          {t("A12")}{" "}
          <Link href="/install" className="text-themeColor underline hover:opacity-80">
            {t("Install")}
          </Link>
        </>
      ),
    },
    {
      question: t("How to publish events on the APP homepage?"),
      answer: t("A5"),
    },
    {
      question: t("How do we register our organization to be included in ARK ALL?"),
      answer: t("A6"),
    },
    {
      question: t("Is ARK ALL free?"),
      answer: t("A1"),
    },
    {
      question: t("Does ARK ALL make a profit?"),
      answer: t("A7"),
    },
    {
      question: t("What are ARK ALL's operating costs?"),
      answer: t("A8"),
    },
    {
      question: t("How to join the ARK development team?"),
      answer: t("A9"),
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
      question: t("ARK product lineup"),
      answer: t("A10"),
    },
    {
      question: t("ARK ALL's origin"),
      answer: t("A11"),
    },
    {
      question: t("I have feedback/suggestions to provide to the developers"),
      answer: t("A4"),
    },
  ];

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqdata.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: typeof item.answer === "string" ? item.answer : t("A12"),
      },
    })),
  };

  return (
    <ARKMain
      title={t("QA")}
      seoTitle={t("QA_seo_title")}
      description={t("QA_seo_desc")}
      canonicalPath="/qa"
      structuredData={faqStructuredData}
      withOutMargin={true}
    >
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
