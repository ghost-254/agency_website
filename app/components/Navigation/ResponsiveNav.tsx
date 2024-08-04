// components/Navigation/ResponsiveNav.tsx
"use client"

import React, { useState } from 'react';
import { FiMenu, FiMapPin } from 'react-icons/fi';
import Nav from './Nav';
import MobileNav from './MobileNav';
import { useAuth } from 'agency_website/context/AuthContext'

const ResponsiveNav: React.FC = () => {
  const [nav, setNav] = useState(false);
  const { currentUser, logout } = useAuth();

  const openNav = () => setNav(true);
  const closeNav = () => setNav(false);

  return (
    <>
      <Nav openNav={openNav} currentUser={currentUser} logout={logout} />
      <MobileNav nav={nav} closeNav={closeNav} currentUser={currentUser} logout={logout} />
    </>
  );
};

export default ResponsiveNav;
