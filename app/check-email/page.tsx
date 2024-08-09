// check-email/page.tsx

"use client"

import React from 'react';
import { useRouter } from 'next/navigation';

const CheckEmail: React.FC = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className="max-w-md mx-auto mt-20 mb-20 p-4 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4">Check Your Email</h2>
      <p className="mb-4">A verification email has been sent to your email address. Please check your inbox and click on the verification link to verify your email address.</p>
      <p className="mb-4">Once you have verified your email, you can proceed to the login page.</p>
      <button
        onClick={handleLogin}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Proceed to Login
      </button>
    </div>
  );
};

export default CheckEmail;
