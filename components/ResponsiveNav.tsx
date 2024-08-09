"use client"

import React, { useState } from 'react';
import Nav from './Nav';
import MobileNav from '@/components/MobileNav';
import { useAuth } from '@/context/AuthContext';

const ResponsiveNav: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [nav, setNav] = useState(false);

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
