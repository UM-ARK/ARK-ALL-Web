import Image from "next/image";
import React from "react";
import Container from "../container";
import { Canvas } from '@react-three/fiber';
import { Map } from "../Map"

const Benefits = (props) => {
  const { data } = props;
  return (

    <Container className="flex flex-wrap lg:flex-nowrap w-full h-full">

      {/** 圖片 */}
      <div className={`flex items-center justify-center w-full h-full lg:w-1/2 ${props.imgPos == "right" && "lg:order-1"}`}>
        <Image
          src={data.image}
          width="521"
          height="auto"
          alt="Benefits"
          className={"object-cover p-5"}
          placeholder="blur"
          blurDataURL={data.image.src}
          style={{ borderRadius: "30px" }} />
      </div>

      {/** 説明 */}
      <div className={`flex flex-wrap items-center w-full lg:w-1/2`}>
        <div className={`mx-auto`}>
          {/** 大點 */}
          <div className="flex flex-col w-full mt-4">
            {/* 標題 */}
            <h3 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
              {data.title}
            </h3>
            {/* 說明 */}
            <p className={`max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300 text-justify`}>
              {data.desc}
            </p>
          </div>

          {/** 小點 */}
          <div className="w-full mt-5">
            {data.bullets.map((item, index) => (
              <BenefitDescription key={index} title={item.title} icon={item.icon}>
                {item.desc}
              </BenefitDescription>
            ))}
          </div>
        </div>
      </div>

    </Container>
  );
};

function BenefitDescription(props) {
  return (

    <div className="flex items-start mt-8 space-x-3">
      <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-themeColor bg-indigo-500 rounded-md w-11 h-11 ">
        {React.cloneElement(props.icon, {
          className: "w-7 h-7 text-indigo-50",
        })}
      </div>
      <div>
        <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200">
          {props.title}
        </h4>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          {props.children}
        </p>
      </div>
    </div>

  );
}

export default Benefits;
