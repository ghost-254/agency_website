import React from 'react';
import { FaStripe, FaPaypal, FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover } from 'react-icons/fa';

const Donate = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 flex flex-col justify-center sm:py-16">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-center text-gray-800">Support Our Mission</h2>
            <p className="mt-2 text-gray-600 text-center">
              Your donations help us continue our work in supporting homeless and underserved individuals.
            </p>
            <div className="mt-8">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md flex items-center justify-center space-x-2 hover:bg-blue-700 transition duration-300">
                <FaStripe className="text-2xl" />
                <span>Donate with Stripe</span>
              </button>
              <div className="flex justify-center mt-4 space-x-2 items-center text-gray-600">
                <span className="text-lg">Stripe Accepts Credit and Debit Cards:</span>
                <FaCcVisa className="text-2xl" />
                <FaCcMastercard className="text-2xl" />
                <FaCcAmex className="text-2xl" />
                <FaCcDiscover className="text-2xl" />
              </div>
              <button className="w-full bg-red-600 text-white py-2 px-4 rounded-md flex items-center justify-center space-x-2 mt-4 hover:bg-red-700 transition duration-300">
                <FaPaypal className="text-2xl" />
                <span>Donate with PayPal</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
