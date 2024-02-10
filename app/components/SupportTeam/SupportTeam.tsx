import React from "react";
import Icon1 from "@/public/icon1.png";
import Icon2 from "@/public/icon2.png";
import SupportTeamImg from "@/public/supportteam.jpg";
import Image from "next/image";

const SupportTeam = () => {
  return (
    <div className="pt-[7rem] pb-[3rem]">
      <div className="w-[80%] mx-auto items-center grid grid-cols-1 lg:grid-cols-2 gap-[2rem] ">
        <div>
          <h1 className="text-[27px] md:text-[35px] lg:text-[40px] mb-[1rem] font-bold text-[#02073e] leading-[2.4rem] md:leading-[4rem]">
            Do you need help? Our Support Team ready to help you
          </h1>
          <p className="text-gray-900 opacity-90 text-[17px] mt-[1rem]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Praesentium voluptate asperiores laborum quibusdam cumque corrupti
            dignissimos architecto libero veniam rerum, aspernatur voluptatibus
            at blanditiis voluptates.
          </p>
          <div className="flex items-center space-x-6 mt-[2rem]">
            <Image src={Icon1} alt="icon" width={60} height={60} />
            <div>
              <h1 className="text-[18px] text-gray-900 font-[500] mb-[0.5rem]">
                Email client support
              </h1>
              <p className="md:w-[70%] w-[90%] text-[15px] text-black opacity-85">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Nostrum, laboriosam.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-6 mt-[2rem]">
            <Image src={Icon2} alt="icon" width={60} height={60} />
            <div>
              <h1 className="text-[18px] text-gray-900 font-[500] mb-[0.5rem]">
                Live ticket support
              </h1>
              <p className="md:w-[70%] w-[90%] text-[15px] text-black opacity-85">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Nostrum, laboriosam.
              </p>
            </div>
          </div>
        </div>
        <div data-aos="fade-left" data-aos-anchor-placement="top-center">
          <Image src={SupportTeamImg} alt="support" />
        </div>
      </div>
    </div>
  );
};

export default SupportTeam;
