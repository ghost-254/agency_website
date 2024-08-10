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
          <FeatureCard title="Advocacy & Awareness" image={Icon1.src} content={"We  promote advocacy & awareness for the homeless by collaborating with agencies and organizations established to provide for  homeless individuals."} />
        </div>
        <div
          data-aos="zoom-in"
          data-aos-delay="200"
          data-aos-anchor-placement="top-center"
        >
          <FeatureCard title="Community Outreach" image={Icon2.src} content={"Our community outreach programs operate directly at the locations of partnering agencies and organizations, engaging interactively with their staff and administration through in-person visits, meetings, and presentations."} />
        </div>
        <div
          data-aos="zoom-in"
          data-aos-delay="300"
          data-aos-anchor-placement="top-center"
        >
          <FeatureCard title="Partnership Building" image={Icon3.src} content={"To build a strong alliance, we actively participate in educational and healthcare related seminars, including  community chamber of commerce  activity to,  consistently maintain a presence while  engaging with local businesses and organizations to strengthen our campaign."} />
        </div>
        <div
          data-aos="zoom-in"
          data-aos-delay="400"
          data-aos-anchor-placement="top-center"
        >
          <FeatureCard title="Educational Workshops and Seminars" image={Icon4.src} content={"We design curricula focused on communication and soft skills training to support career development. This includes one-on-one mentoring sessions with coaching on employer-employee relationship management techniques."} />
        </div>
        <div
          data-aos="zoom-in"
          data-aos-delay="500"
          data-aos-anchor-placement="top-center"
        >
          <FeatureCard title="Workforce Reentry Support" image={Icon5.src} content={"We engage professionally with community vocational training programs, potential employers, and placement agencies to foster job readiness connections."} />
        </div>
        <div
          data-aos="zoom-in"
          data-aos-delay="600"
          data-aos-anchor-placement="top-center"
        >
          <FeatureCard title="HIV Testing Resources" image={Icon2.src} content={"Working with local agencies and organizations that provide HIV testing, monitoring and treatment. We ensure, information materials are accessible to homeless individuals requiring help. We actively promote the availability of street medicine and mobile health resources available. "} />
        </div>
      </div>
    </div>
  );
};

export default Features;
