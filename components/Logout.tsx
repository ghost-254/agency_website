"use client"

import React, { useState } from 'react';
import { auth } from '@/firebaseConfig';
import { FaSpinner } from 'react-icons/fa';

const Logout = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await auth.signOut();
      setLoading(false);
      window.location.href = '/';
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 flex items-center justify-center"
    >
      {loading ? <FaSpinner className="animate-spin mr-2" /> : "Logout"}
    </button>
  );
};

export default Logout;
