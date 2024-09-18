import Image from "next/image";
import React, { useEffect, useRef } from "react";
import SupportImg from "@/public/goals.png";
import { FiCheckCircle } from "react-icons/fi";

const Goals = () => {
  // Create an audio ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Use effect to handle audio loading or any operations you want to perform
  useEffect(() => {
    // Safely access the audio element
    const audioElement = audioRef.current;
    if (audioElement) {
      // You can add additional logic here if necessary
      console.log("Audio element loaded:", audioElement);
    }
  }, []);

  return (
    <div className="pt-[5rem] pb-[3rem]">
      <div className="w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[4rem] items-center">
        <div
          data-aos="fade-right"
          data-aos-anchor-placement="top-center"
          className="order-2 lg:order-1"
        >
          <Image src={SupportImg} alt="support" />
        </div>
        <div className="order-1 lg:order-2">
          <h1
            data-aos="fade-left"
            data-aos-anchor-placement="top-center"
            data-aos-delay="200"
            className="text-[20px] md:text-[25px] lg:text-[28px] text-[#02073e] font-bold leading-[2rem] md:leading-[3rem]"
          >
            Goals of Outreachconnect.org
          </h1>
          <p
            data-aos="fade-right"
            data-aos-anchor-placement="top-center"
            data-aos-delay="300"
            className="mt-[1.5rem] mb-[1.5rem] text-black opacity-90 text-[15px] md:text-[16px]"
          >
            Our goals focus on raising awareness, attracting grant providers, showcasing our impact, and facilitating communication. They are:
          </p>
          {/* Goals list */}
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="top-center"
            data-aos-delay="400"
            className="flex items-start mb-[1rem] space-x-3"
          >
            <FiCheckCircle className="w-[1.3rem] h-[1.3rem] text-green-600 flex-shrink-0" />
            <p className="text-[17px] text-[#02073e] font-[500]">
              Raise awareness about the needs of homeless and underserved individuals.
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="top-center"
            data-aos-delay="500"
            className="flex items-start mb-[1rem] space-x-3"
          >
            <FiCheckCircle className="w-[1.3rem] h-[1.3rem] text-green-600 flex-shrink-0" />
            <p className="text-[17px] text-[#02073e] font-[500]">
              Establish a professional online presence to attract potential grant providers.
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="top-center"
            data-aos-delay="600"
            className="flex items-start mb-[1rem] space-x-3"
          >
            <FiCheckCircle className="w-[1.3rem] h-[1.3rem] text-green-600 flex-shrink-0" />
            <p className="text-[17px] text-[#02073e] font-[500]">
              Highlight the impact of past community outreach projects.
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="top-center"
            data-aos-delay="700"
            className="flex items-start mb-[1rem] space-x-3"
          >
            <FiCheckCircle className="w-[1.3rem] h-[1.3rem] text-green-600 flex-shrink-0" />
            <p className="text-[17px] text-[#02073e] font-[500]">
              Unite various agencies, organizations, and resources that provide shelter, food, clothing, and increase access to medical and mental healthcare.
            </p>
          </div>
        </div>
      </div>

      {/* New Audio Commentary Section */}
      <div
        id="lowVisionCard"
        className="w-[80%] max-w-[600px] mx-auto mt-[4rem] bg-[#0d0d0d] text-center p-8 rounded-lg shadow-lg transform transition-transform hover:scale-105"
        style={{
          boxShadow: "0 0 20px 10px rgba(0, 255, 0, 0.5)",
        }}
      >
        <h2 className="text-[20px] md:text-[24px] text-[#00FF00] font-bold">
          Focusing on Low Vision
        </h2>
        <p className="mt-[1.5rem] mb-[1.5rem] text-[#f0f0f0] opacity-90 text-[15px] md:text-[16px]">
          At Outreach Connect, we also focus on supporting individuals living with low vision.
          Living with low vision brings a unique set of challenges, transforming even the simplest tasks into daunting obstacles.
          Everyday activities like stepping outside or handling household chores can trigger anxiety, making what was once routine feel overwhelming.
          The constant need to adapt only amplifies this struggle, but the right support makes all the difference.
          From assistive technologies and home modifications to emotional care and understanding from friends, associates and loved ones.
        </p>

        <audio ref={audioRef} className="mt-[1.5rem] w-full" controls autoPlay>
          <source src="/audio.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default Goals;
