import React from 'react';
import { FaChartLine, FaCity, FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa';

const Data = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-center mb-8 mt-8">Data</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <FaCity className="text-5xl text-blue-600 mr-4" />
          <div>
            <h3 className="text-xl font-semibold">Location</h3>
            <p className="text-gray-600">Sacramento, California</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <FaCalendarAlt className="text-5xl text-blue-600 mr-4" />
          <div>
            <h3 className="text-xl font-semibold">Date</h3>
            <p className="text-gray-600">January 2024</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <FaChartLine className="text-5xl text-blue-600 mr-4" />
          <div>
            <h3 className="text-xl font-semibold">PIT Count</h3>
            <p className="text-gray-600">6,615 people</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <FaExclamationTriangle className="text-5xl text-blue-600 mr-4" />
          <div>
            <h3 className="text-xl font-semibold">Decrease from 2022</h3>
            <p className="text-gray-600">28.7% (2,663 people)</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
          <p className="text-gray-600">
                The Point-in-Time (PIT) count is a snapshot survey conducted annually to estimate the number of homeless individuals on a given night. 
                It provides critical data to help communities understand the extent of homelessness, allocate resources effectively, and track progress over time. 
                Not every homeless person may be accounted for in the PIT count, as some live in hard-to-reach areas such as riverbanks, streets, and encampments. 
                The recorded decrease of 2,663 individuals from 2022 to 2024 does not necessarily represent that these people became housed.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">What This Data Means</h3>
          <p className="text-gray-600">
                This data highlights the complexity of addressing homelessness. 
                While the decrease in the PIT count suggests progress, it doesn&apos;t necessarily indicate that all those individuals have found permanent housing. 
                The figures should be interpreted cautiously, as they reflect only a snapshot of the situation. 
                The reduction could be influenced by various factors, including changes in counting methods, temporary relocations, or other external conditions. 
                This data underscores the ongoing need for targeted and sustained efforts to provide stable housing and support for those experiencing homelessness.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Data;
