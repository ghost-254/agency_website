// components/Nav.tsx
import Link from "next/link";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { FiMenu, FiMapPin, FiChevronDown, FiChevronUp } from "react-icons/fi";
import ButtonBlue from "./ButtonBlue";
import LoginPromptModal from "./LoginPromptModal";

interface Props {
  openNav: () => void;
  currentUser: any;
  logout: () => void;
}

const Nav: React.FC<Props> = ({ openNav, currentUser, logout }) => {
  const [isBlogDropdownOpen, setBlogDropdownOpen] = useState(false);
  const [isLoginPromptOpen, setLoginPromptOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref to store timeout

  const toggleBlogDropdown = () => {
    setBlogDropdownOpen(!isBlogDropdownOpen);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Clear timeout if hovering again
    }
    setBlogDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setBlogDropdownOpen(false);
    }, 200); // Delay before closing
  };

  const handlePostBlogClick = () => {
    if (!currentUser) {
      setLoginPromptOpen(true);
    }
  };

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
          <li 
            className="relative"
            onMouseEnter={handleMouseEnter} // Show dropdown on hover
            onMouseLeave={handleMouseLeave} // Hide dropdown when not hovering
          >
            <div 
              className="flex items-center cursor-pointer text-[17px] hover:text-red-500 transition-all duration-200"
              onClick={toggleBlogDropdown}
            >
              <span>Blog</span>
              {isBlogDropdownOpen ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />}
            </div>
            {isBlogDropdownOpen && (
              <ul className="fixed bg-white shadow-md mt-2 p-4 rounded-md">
                <li className="p-3 hover:bg-gray-100">
                  <Link href="/blog">Read Articles</Link>
                </li>
                <li className="p-3 hover:bg-gray-100">
                  <Link href="/blog/create" onClick={handlePostBlogClick} className="cursor-pointer">Post a Blog</Link>
                </li>
              </ul>
            )}
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
            <FiMapPin className="lg:inline-block w-[1.5rem] h-[1.5rem] text-red-500 hidden" />
            <span className="lg:inline-block hidden">Sacramento, CA</span>
          </div>
          {currentUser ? (
            <button onClick={logout} className="bg-red-600 px-3 py-1 rounded">Logout</button>
          ) : (
            <Link href="/login">
              <ButtonBlue text="Admin Login" />
            </Link>
          )}
        </div>
        <FiMenu
          onClick={openNav}
          className="w-[1.5rem] lg:hidden h-[1.5rem] text-slate-900 cursor-pointer"
        />
      </div>
      <LoginPromptModal isOpen={isLoginPromptOpen} onClose={() => setLoginPromptOpen(false)} />
    </div>
  );
};

export default Nav;
