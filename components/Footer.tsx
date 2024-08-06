import React from "react";
import { FiMapPin } from "react-icons/fi";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="font-mono text-gray-400 pt-[3rem] pb-[3rem] bg-slate-300 px-0">
      <div className="w-[80%] mx-auto grid grid-cols-1 pb-[2rem] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[2rem] items-start">
        <div className="md:mx-auto mx-0">
          <h1 className="text-[17px] text-gray-900 font-semibold mb-[1.5rem] ">
            Company
          </h1>
          <p className="text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer hover:text-green-700">
            <Link href="/disclaimer">Disclaimer</Link>
          </p>
          <p className="text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer hover:text-green-700">
            <Link href="/data">Data</Link>
          </p>
        </div>
        
        <div className="md:mx-auto mx-0">
          <h1 className="text-[17px] text-gray-900 font-semibold mb-[1.5rem] ">
            Essentials
          </h1>
          <p className="text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer hover:text-green-700">
            <Link href="/about"> About</Link>
          </p>
          <p className="text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer hover:text-green-700">
            <Link href="/mission_vision"> Mission & Vision</Link>
          </p>
        </div>

        <div className="md:mx-auto mx-0">
          <h1 className="text-[17px] text-gray-900 font-semibold mb-[1.5rem] ">
            Contact Information
          </h1>
          <p className="text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer hover:text-green-700">
            Email: <Link href="mailto:official@outreachconnect.org">
              <span className="hover:text-blue-500">official@outreachconnect.org</span>
            </Link>
          </p>
          <p className="text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer hover:text-green-700">
            Phone: +1 (916) 212-9617
          </p>
        </div>

        <div className="md:mx-auto mx-0">
          <h1 className="text-[17px] text-gray-900 font-semibold mb-[1.5rem] ">
            Social Media
          </h1>
          <p className="text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer hover:text-green-700">
            Facebook
          </p>
          <p className="text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer hover:text-green-700">
            Twitter
          </p>
          <p className="text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer hover:text-green-700">
            LinkedIn
          </p>
        </div>
      </div>
      <div className="w-[80%] mx-auto my-4">
        <div className="h-[3px] bg-gradient-to-r from-transparent via-white to-transparent"></div>
      </div>
      <div className="w-[80%] mx-auto mt-[1rem] flex flex-col items-center space-y-2">
        <div className="flex items-center space-x-1 text-[17px] text-gray-700">
          <FiMapPin className="w-[1.5rem] h-[1.5rem] text-green-700" />
          <span className="text-green-700">Sacramento, CA</span>
        </div>
        <div className="text-black text-center text-[15px] opacity-75">
          Copyright © 2024 Outreach Connect
        </div>
      </div>
    </div>
  );
};

export default Footer;
