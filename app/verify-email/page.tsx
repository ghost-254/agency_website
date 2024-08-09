// pages/verify-email.tsx
"use client"

import React, { useEffect, useState } from 'react';
import { applyActionCode } from 'firebase/auth';
import { auth } from '@/firebaseConfig';

const VerifyEmail: React.FC = () => {
  const [message, setMessage] = useState('Verifying...');

  useEffect(() => {
    const verifyEmail = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const oobCode = urlParams.get('oobCode');

      if (oobCode) {
        try {
          await applyActionCode(auth, oobCode);
          setMessage('Email verified successfully. Redirecting to login...');
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
        } catch (error: any) {
          setMessage('Error verifying email: ' + error.message);
        }
      } else {
        setMessage('Invalid or missing verification code.');
      }
    };

    verifyEmail();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-20 mb-20 p-4 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4">Email Verification</h2>
      <p className="mb-4">{message}</p>
    </div>
  );
};

export default VerifyEmail;
