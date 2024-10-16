// components/Nav.tsx
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { FiMenu, FiMapPin } from "react-icons/fi";
import ButtonBlue from "./ButtonBlue";

interface Props {
  openNav: () => void;
  currentUser: any;
  logout: () => void;
}

const Nav: React.FC<Props> = ({ openNav, currentUser, logout }) => {
  return (
    <div className="h-[25vh] bg-white shadow-md">
      <div className="w-[85%] flex items-center justify-between mx-auto h-[23vh]">
        <div className="flex items-center">
          <Image 
            src="/logo.png" 
            alt="Logo"
            width={200} 
            height={100}
          />
        </div>
        <ul className="hidden lg:flex items-center space-x-10">
          <li className="text-[17px] cursor-pointer text-red-500">
            <Link href="/">Home</Link>
          </li>
          <li className="text-[17px] cursor-pointer hover:text-red-500 transition-all duration-200">
            <Link href="/about">About</Link>
          </li>
          <li className="text-[17px] cursor-pointer hover:text-red-500 transition-all duration-200">
            <Link href="/data">Data</Link>
          </li>
          {currentUser && (
            <li className="text-[17px] cursor-pointer hover:text-red-500 transition-all duration-200 relative">
              <Link href="/grant-application">Grant Applications</Link>
              <ul className="absolute bg-white shadow-md mt-2 hidden group-hover:block">
                <li className="p-2 hover:bg-gray-100">
                  <Link href="/grant-application?option=create">Create New Application</Link>
                </li>
                <li className="p-2 hover:bg-gray-100">
                  <Link href="/grant-application?option=history">Application History</Link>
                </li>
              </ul>
            </li>
          )}
        </ul>
        <div className="hidden lg:flex items-center space-x-2 md:space-x-5">
          <div className="flex items-center space-x-1 text-[17px] text-gray-700">
            <FiMapPin className="w-[1.5rem] h-[1.5rem] text-red-500" />
            <span>Sacramento, CA</span>
          </div>
          {currentUser ? (
            <button onClick={logout} className="bg-red-600 px-3 py-1 rounded">Logout</button>
          ) : (
            <>
              <Link href="/login">
                <ButtonBlue text="Admin Login" />
              </Link>
            </>
          )}
        </div>
        <FiMenu
          onClick={openNav}
          className="w-[1.5rem] lg:hidden h-[1.5rem] text-slate-900 cursor-pointer"
        />
      </div>
      {/* Location pin and text for small screens */}
      <div className="flex lg:hidden justify-center mt-4 text-gray-700">
        <FiMapPin className="w-[1.5rem] h-[1.5rem] text-red-500" />
        <span className="ml-1 text-[17px]">Sacramento, CA</span>
      </div>
    </div>
  );
};

export default Nav;
