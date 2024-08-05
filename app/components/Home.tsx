// Home.tsx

"use client";

import React, { useEffect } from "react";
import Hero from "./Hero/Hero";
import Features from "./Features/Features";
import Goals from "./Goals/Goals";
import SupportTeam from "./SupportTeam/SupportTeam";
import Company from "./Company/Company";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
      anchorPlacement: "top-bottom",
    });
  }, []);

  return (
    <div>
      <Hero />
      <Features />
      <Goals />
      <SupportTeam />
      <Company />
    </div>
  );
};

export default Home;
