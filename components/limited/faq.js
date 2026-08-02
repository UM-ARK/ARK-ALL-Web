import React from "react";
import Link from "next/link";
import Container from "../container";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

import { useTranslation } from "react-i18next";

const Faq = () => {

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
      question: t("Is ARK ALL free?"),
      answer: t("A1"),
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
      question: t("I have feedback/suggestions to provide to the developers"),
      answer: t("A4"),
    },
  ];

  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqdata.map((item, index) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <div>
                  <Disclosure.Button className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${open ? "transform rotate-180" : ""
                        } w-5 h-5 text-themeColor`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-500 dark:text-gray-300">
                    {item.answer}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Faq;
