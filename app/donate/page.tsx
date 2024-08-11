import React from 'react';
import PayPalButton from '@/components/PayPalButton';  // Adjust the path based on your project structure

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
              <div className="mt-8">
                <PayPalButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
