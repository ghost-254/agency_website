import React from "react";
import ButtonBlue from "@/components/ButtonBlue";
import ButtonRed from "./ButtonRed";
import Image from "next/image";
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <div className="py-16 flex items-center justify-center bg-white">
      <div className="w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-5 items-center gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h1
            data-aos="fade-right"
            className="text-[27px] md:text-[35px] lg:text-[40px] mb-[1rem] font-bold text-[#02073e] leading-[2.4rem] md:leading-[4rem]"
          >
            Welcome to Outreach Connect
          </h1>
          <p
            data-aos="fade-left"
            data-aos-delay="200"
            className="md:text-[17px] text-[15px] mb-[2rem] text-black opacity-90 font-[400]"
          >
            We are dedicated to helping homeless and underserved individuals in our community.
            We want to connect the resources to the people who need them by providing references, training, 
            and support to empower the underserved in the community.
            Your support can make a difference. Learn more about our programs and how you can help.
          </p>
          <div
            data-aos="zoom-in"
            data-aos-delay="400"
            className="flex items-center space-x-4 md:space-x-6"
          >
            <Link to="supportTeam" smooth={true} duration={700}>
              <ButtonBlue text="Get in Touch" />
            </Link>
      
              <ButtonRed text="Donate to Us" />
  
          </div>
        </div>
        <div
          data-aos="fade-left"
          data-aos-delay="500"
          className="lg:col-span-3 lg:justify-self-end mt-4 lg:mt-0"
        >
          <Image 
            src="/homelesschild.jpeg" 
            alt="Homeless Child"
            width={600}
            height={300}
            className="rounded-lg mx-auto lg:mx-0"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
