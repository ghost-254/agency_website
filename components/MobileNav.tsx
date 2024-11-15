// components/MobileNav.tsx
import { XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import ButtonBlue from "@/components/ButtonBlue";
import ButtonRed from "@/components/ButtonRed";

interface Props {
  nav: boolean;
  closeNav: () => void;
  currentUser: any;
  logout: () => void;
}

const MobileNav: React.FC<Props> = ({ nav, closeNav, currentUser, logout }) => {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeNav();
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
        <li className="text-[25px] cursor-pointer text-white hover:text-yellow-300 transition-all duration-200">
          <Link href="/blog" onClick={closeNav}>Blog</Link>
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
