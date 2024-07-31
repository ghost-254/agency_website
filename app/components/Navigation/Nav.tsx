import Link from "next/link";
import React from "react";
import Image from "next/image";
import ButtonBlue from "../Button/ButtonBlue";
import ButtonRed from "../Button/ButtonRed";
import { Bars3BottomRightIcon } from "@heroicons/react/16/solid";

interface Props {
  openNav: () => void;
}

const Nav = ({ openNav }: Props) => {
  return (
    <div className="h-[25vh] bg-white shadow-md ">
      <div className="w-[85%] flex items-center justify-between mx-auto h-[23vh]">
        <div className="flex items-center">
          <Image 
            src="/logo.png" 
            alt="Logo"
            width={150} // adjust as needed
            height={100} // adjust as needed
          />
        </div>
        <ul className="hidden lg:flex items-center space-x-10">
          <li className="text-[17px] cursor-pointer text-red-500">
            <Link href="/">Home</Link>
          </li>
          <li className="text-[17px] cursor-pointer hover:text-red-500 transition-all duration-200">
            <Link href="/">About</Link>
          </li>
          <li className="text-[17px] cursor-pointer hover:text-red-500 transition-all duration-200">
            <Link href="/">Services</Link>
          </li>
          <li className="text-[17px] cursor-pointer hover:text-red-500 transition-all duration-200">
            <Link href="/">Customer</Link>
          </li>
          <li className="text-[17px] cursor-pointer hover:text-red-500 transition-all duration-200">
            <Link href="/">Blog</Link>
          </li>
        </ul>
        <div className="flex items-center space-x-2 md:space-x-5">
          <ButtonBlue text="Login" />
          <ButtonRed text="Sign Up" />
          <Bars3BottomRightIcon
            onClick={openNav}
            className="w-[1.5rem] lg:hidden h-[1.5rem] text-slate-900 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;
