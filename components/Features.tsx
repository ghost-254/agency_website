import React from "react";
import SectionHeading from "@/components/SectionHeading";
import FeatureCard from "@/components/FeatureCard";
import Icon1 from "@/public/icon1.png";
import Icon2 from "@/public/icon2.png";
import Icon3 from "@/public/icon3.png";
import Icon4 from "@/public/icon4.png";
import Icon5 from "@/public/icon5.png";

const Features = () => {
  return (
    <div className="pt-[5rem] pb-[3rem]">
      <SectionHeading
        headingMini="Making Long-lasting Impact"
        headingPrimary="Our Services"
      />
      <div className="pt-[5rem] w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-[1.4rem]">
        <div data-aos="zoom-in" data-aos-anchor-placement="top-center">
          <FeatureCard title="Advocacy & Awareness Campaigns" image={Icon1.src} />
        </div>
        <div
          data-aos="zoom-in"
          data-aos-delay="200"
          data-aos-anchor-placement="top-center"
        >
          <FeatureCard title="Community Outreach Programs" image={Icon2.src} />
        </div>
        <div
          data-aos="zoom-in"
          data-aos-delay="300"
          data-aos-anchor-placement="top-center"
        >
          <FeatureCard title="Partnership Building" image={Icon3.src} />
        </div>
        <div
          data-aos="zoom-in"
          data-aos-delay="400"
          data-aos-anchor-placement="top-center"
        >
          <FeatureCard title="Educational Workshops and Seminars" image={Icon4.src} />
        </div>
        <div
          data-aos="zoom-in"
          data-aos-delay="500"
          data-aos-anchor-placement="top-center"
        >
          <FeatureCard title="Workforce Reentry Assistance" image={Icon5.src} />
        </div>
        <div
          data-aos="zoom-in"
          data-aos-delay="600"
          data-aos-anchor-placement="top-center"
        >
          <FeatureCard title="HIV Testing Services" image={Icon2.src} />
        </div>
      </div>
    </div>
  );
};

export default Features;
