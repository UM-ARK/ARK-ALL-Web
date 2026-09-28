import React from 'react';
import Container from "../components/container";
import { ARKMain } from "../components/uiComponents/ContentBlock";

import { useTranslation } from "react-i18next";

import SectionTitle from "../components/sectionTitle";
import { user_agreement_section_data } from 'public/data/user_agreement';


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
  const { t } = useTranslation();

  return (
    <ARKMain title={t("User_Agreement")} withOutMargin={true}>
      <div>
        <Container className="flex flex-wrap w-full h-full justify-center">
          {Object.entries(user_agreement_section_data).map(([k, content]) => (
            <UASection
              pretitle={content.pretitle}
              title={content.title}
              list={content.list} />
          ))}
          <br /><br />
        </Container>
      </div>
    </ARKMain>
  );
};

// 導航欄、頁腳由 _app 的公開頁佈局統一渲染，換頁時不重新掛載
user_agreement.layout = { navbar: { selected: "User_Agreement" }, popup: true };

export default user_agreement;