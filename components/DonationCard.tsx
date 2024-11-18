"use client"

import React from 'react';
import Link from 'next/link';
import { FaHandHoldingHeart } from 'react-icons/fa';

const DonationCard = () => {
  return (
    <div className="bg-gray-200 p-6 px-6 rounded-lg shadow-md mt-4">
      <h2 className="text-lg font-semibold text-center mb-1 flex items-center justify-center">
        Support Our Cause
      </h2>
      <p className="text-center mb-2">
       At OutreachConnect, we are dedicated to supporting individuals facing homelessness, mental health challenges, and the elderly, offering them the care and resources they need to regain stability and dignity. Your support is essential to expanding our reach and creating a brighter future for those in need. Together, we can make a meaningful difference in their lives.
      </p>
      <div className="text-center flex items-center justify-center mt-7">
        <Link href="/donate">
          <button className="flex text-center items-center justify-center bg-green-700 text-white py-4 px-4 rounded hover:bg-green-600">
          <FaHandHoldingHeart className="mr-2 text-orange-500" size={30}/>
            Donate Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DonationCard;