import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const Disclaimer: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg text-center transform transition-transform hover:scale-105 hover:shadow-xl">
        <div className="flex items-center justify-center mb-4">
          <FaExclamationTriangle className="text-red-600 text-4xl mr-2" />
          <h2 className="text-2xl font-semibold text-red-600">Disclaimer</h2>
        </div>
        <p className="text-gray-700 mb-4 text-left">
          The purpose of Outreachconnect.org is to raise awareness of the needs of the homeless. 
          There is no intent or reference to indicate that Outreachconnect.org is a provider of services. 
          Our aim is to educate the public, advocate for better support systems, and connect individuals with the resources they need. 
          While we highlight various services and support systems, our platform serves as an informational and advocacy tool. 
          Outreachconnect.org does not directly provide housing, medical care, or financial assistance. 
          Instead, we strive to empower communities and individuals to take meaningful action to support the homeless population.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;
