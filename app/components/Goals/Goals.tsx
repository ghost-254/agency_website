import Image from "next/image";
import React from "react";
import SupportImg from "@/public/goals.png";
import { FiCheckCircle } from "react-icons/fi";

const Goals = () => {
  return (
    <div className="pt-[5rem] pb-[3rem] ">
      <div className="w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[4rem] items-center">
        <div
          data-aos="fade-right"
          data-aos-anchor-placement="top-center"
          className="order-2 lg:order-1"
        >
          <Image src={SupportImg} alt="support" />
        </div>
        <div className="order-1 lg:order-2">
          <h1
            data-aos="fade-left"
            data-aos-anchor-placement="top-center"
            data-aos-delay="200"
            className="text-[20px] md:text-[25px] lg:text-[28px] text-[#02073e] font-bold leading-[2rem] md:leading-[3rem]"
          >
            Goals of Outreachconnect.org
          </h1>
          <p
            data-aos="fade-right"
            data-aos-anchor-placement="top-center"
            data-aos-delay="400"
            className="mt-[1.5rem] mb-[1.5rem] text-black opacity-90 text-[15px] md:text-[16px]"
          >
            Our goals focus on raising awareness, attracting grant providers, showcasing our impact, and facilitating communication. They are:
          </p>
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="top-center"
            data-aos-delay="600"
            className="flex items-start mb-[1rem] space-x-3"
          >
            <FiCheckCircle className="w-[1.3rem] h-[1.3rem] text-green-600 flex-shrink-0" />
            <p className="text-[17px] text-[#02073e] font-[500]">
              Raise awareness about the needs of homeless and underserved individuals.
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="top-center"
            data-aos-delay="800"
            className="flex items-start mb-[1rem] space-x-3"
          >
            <FiCheckCircle className="w-[1.3rem] h-[1.3rem] text-green-600 flex-shrink-0" />
            <p className="text-[17px] text-[#02073e] font-[500]">
              Establish a professional online presence to attract potential grant providers.
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="top-center"
            data-aos-delay="1000"
            className="flex items-start mb-[1rem] space-x-3"
          >
            <FiCheckCircle className="w-[1.3rem] h-[1.3rem] text-green-600 flex-shrink-0" />
            <p className="text-[17px] text-[#02073e] font-[500]">
              Highlight the impact of past community outreach projects.
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="top-center"
            data-aos-delay="1200"
            className="flex items-start mb-[1rem] space-x-3"
          >
            <FiCheckCircle className="w-[1.3rem] h-[1.3rem] text-green-600 flex-shrink-0" />
            <p className="text-[17px] text-[#02073e] font-[500]">
              Unite various agencies, organizations, and resources that provide shelter, food, clothing, and increase access to medical and mental healthcare.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;
