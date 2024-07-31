import React from "react";
import { FiMapPin } from "react-icons/fi";

const Footer = () => {
  return (
    <div className="font-mono text-gray-400 pt-[3rem] pb-[3rem] bg-green-500">
      <div className="w-[80%] mx-auto grid grid-cols-1 border-b-[1.5px] border-b-slate-300 pb-[2rem] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[2rem] items-start">
        <div className="md:mx-auto mx-0">
          <h1 className="text-[17px] text-gray-900 font-semibold mb-[1.5rem] ">
            Company
          </h1>
          <p className="text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer hover:text-white">
            Affiliations
          </p>
          <p className="text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer hover:text-white">
            Careers & Culture
          </p>
          <p className="text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer hover:text-white">
            Blog
          </p>
        </div>
        
        <div className="md:mx-auto mx-0">
          <h1 className="text-[17px] text-gray-900 font-semibold mb-[1.5rem] ">
            Essentials
          </h1>
          <p className="text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer hover:text-white">
            Disclaimer
          </p>
          <p className="text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer hover:text-white">
            About Us
          </p>
          <p className="text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer hover:text-white">
            Mission & Vision
          </p>
          <p className="text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer hover:text-white">
            Popular Campaigns
          </p>
        </div>

        <div className="md:mx-auto mx-0">
          <h1 className="text-[17px] text-gray-900 font-semibold mb-[1.5rem] ">
            Contact Information
          </h1>
          <p className="text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer hover:text-white">
            Email: info@outreachconnect.org
          </p>
          <p className="text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer hover:text-white">
            Phone: +1 (916) 212-9617
          </p>
        </div>

        <div className="md:mx-auto mx-0">
          <h1 className="text-[17px] text-gray-900 font-semibold mb-[1.5rem] ">
            Social Media
          </h1>
          <p className="text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer hover:text-white">
            Facebook
          </p>
          <p className="text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer hover:text-white">
            Twitter
          </p>
          <p className="text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer hover:text-white">
            LinkedIn
          </p>
        </div>
        
      </div>
      <div className="w-[80%] mx-auto mt-[1rem] flex flex-col items-center space-y-2">
        <div className="flex items-center space-x-1 text-[17px] text-gray-700">
          <FiMapPin className="w-[1.5rem] h-[1.5rem] text-white" />
          <span className="text-white">Sacramento, CA</span>
        </div>
        <div className="text-black text-center text-[15px] opacity-75">
          Copyright © 2024 Outreach Connect
        </div>
      </div>
    </div>
  );
};

export default Footer;
