// components/MobileNav.tsx
import { XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import ButtonBlue from "@/components/ButtonBlue";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface Props {
  nav: boolean;
  closeNav: () => void;
  currentUser: any;
  logout: () => void;
}

const MobileNav: React.FC<Props> = ({ nav, closeNav, currentUser, logout }) => {
  const navRef = useRef<HTMLDivElement>(null);
  const [isBlogDropdownOpen, setBlogDropdownOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeNav();
        setBlogDropdownOpen(false);
      }
    };

    if (nav) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [nav, closeNav]);

  const navOpenStyle = nav ? "translate-x-0" : "translate-x-full";

  const toggleBlogDropdown = () => {
    setBlogDropdownOpen(!isBlogDropdownOpen);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setBlogDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setBlogDropdownOpen(false);
    }, 200);
  };

  return (
    <div
      className={`fixed top-0 right-0 z-[200] h-[100vh] w-[50vw] bg-[#6d096b] transform transition-all ${navOpenStyle} duration-500`}
      ref={navRef}
    >
      <XMarkIcon
        onClick={closeNav}
        className="w-[2rem] h-[2rem] absolute top-[2rem] text-white z-[202] right-[2rem]"
      />
      <ul className="relative z-[201] space-y-10 flex flex-col justify-center h-[100%] items-center">
        <li className="text-[25px] cursor-pointer text-yellow-300">
          <Link href="/" onClick={closeNav}>Home</Link>
        </li>
        <li className="text-[25px] cursor-pointer text-white hover:text-yellow-300 transition-all duration-200">
          <Link href="/about" onClick={closeNav}>About</Link>
        </li>
        <li className="text-[25px] cursor-pointer text-white hover:text-yellow-300 transition-all duration-200">
          <Link href="/data" onClick={closeNav}>Data</Link>
        </li>
        <li 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            className="flex items-center cursor-pointer text-[25px] text-white hover:text-yellow-300 transition-all duration-200"
            onClick={toggleBlogDropdown}
          >
            <span>Blog</span>
            {isBlogDropdownOpen ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />}
          </div>
          {isBlogDropdownOpen && (
            <ul className="fixed bg-[#6d096b] shadow-md mt-2 p-4 rounded-md z-10">
              <li className="p-3 hover:text-yellow-300 text-white">
                <Link href="/blog" onClick={closeNav}>Read Articles</Link>
              </li>
              <li className="p-3 hover:text-yellow-300 text-white">
                <Link href="/blog/create" onClick={closeNav}>Post a Blog</Link>
              </li>
            </ul>
          )}
        </li>
        {currentUser && (
          <>
            <li className="text-[25px] cursor-pointer text-white hover:text-yellow-300 transition-all duration-200">
              <Link href="/grant-application" onClick={closeNav}>Grant Applications</Link>
            </li>
            <li className="text-[25px] cursor-pointer text-white hover:text-yellow-300 transition-all duration-200">
              <button onClick={logout} className="bg-red-600 px-3 py-1 rounded">Logout</button>
            </li>
          </>
        )}
        {!currentUser && (
          <li className="flex flex-col space-y-4 mt-10">
            <div className="mt-10" />
            <Link href="/login" onClick={closeNav}>
                <ButtonBlue text="Admin Login" />
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default MobileNav;
