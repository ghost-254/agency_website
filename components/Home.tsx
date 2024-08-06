// Home.tsx

"use client";

import React, { useEffect } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Goals from "@/components/Goals";
import SupportTeam from "@/components/SupportTeam";
import Company from "@/components/Company";
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
