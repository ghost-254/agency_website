"use client";

import React from 'react';
import { FaBullseye, FaEye } from 'react-icons/fa';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';

const MissionVision: React.FC = () => {
  const images = [
    '/image106.jpg',
    '/image104.jpg',
    '/image108.jpg',
    '/image101.jpg',
    '/image102.jpg',
    '/image103.jpg',
    '/image105.jpg',
    '/image107.jpg',
  ];

  return (
    <div className="container mx-auto px-4 py-8 lg:px-28 xl:px-28">
      <h2 className="text-3xl font-semibold text-center mb-8 mt-8">Mission and Vision</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FaBullseye className="text-5xl text-blue-600 mr-4" />
            <h3 className="text-2xl font-semibold">Mission Statement</h3>
          </div>
          <p className="text-gray-600">
            Our mission at Outreachconnect.org is to bridge the gap between the homeless and essential support services through dedicated advocacy, ethical practices, and community engagement. We strive to promote human dignity and social responsibility by connecting individuals with the resources they need to improve their quality of life and achieve stability.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FaEye className="text-5xl text-blue-600 mr-4" />
            <h3 className="text-2xl font-semibold">Vision Statement</h3>
          </div>
          <p className="text-gray-600">
            Our vision is a society where homelessness is effectively addressed through comprehensive support systems, ensuring that every individual has access to the necessary resources to lead a dignified and stable life. We envision a world where communities work collaboratively to eliminate homelessness and foster an environment of inclusion, respect, and care for all.
          </p>
        </div>
      </div>
      <div className="p-2">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          className="w-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="flex justify-center">
                <Image
                  src={image}
                  alt={`Slide ${index + 1}`}
                  width={600} // Set your desired width
                  height={400} // Set your desired height
                  style={{ objectFit: 'cover' }}
                  className="rounded"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MissionVision;
