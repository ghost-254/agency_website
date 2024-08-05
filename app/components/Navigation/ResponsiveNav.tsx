// components/Navigation/ResponsiveNav.tsx
"use client"

import React, { useState } from 'react';
import Nav from './Nav';
import MobileNav from './MobileNav';

const ResponsiveNav: React.FC = () => {
  const [nav, setNav] = useState(false);

  const openNav = () => setNav(true);
  const closeNav = () => setNav(false);

  return (
    <>
      <Nav openNav={openNav} />
      <MobileNav nav={nav} closeNav={closeNav} />
    </>
  );
};

export default ResponsiveNav;
