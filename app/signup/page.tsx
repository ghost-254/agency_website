"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ButtonBlue from '@/components/ButtonBlue';
import { auth } from '@/firebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from 'firebase/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [userExists, setUserExists] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.endsWith('@outreachconnect.org')) {
      setMessage('Error: Only emails with @outreachconnect.org can sign up.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send verification email with action URL
      const actionCodeSettings = {
        url: 'https://www.outreachconnect.org/verify-email',
        handleCodeInApp: true,
      };

      await sendEmailVerification(user, actionCodeSettings);
      setMessage('Verification email sent. Please check your inbox.');

      // Sign out the user after successful signup
      await signOut(auth);

      // Redirect to email verification page
      router.push('/check-email');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setMessage('User Already Exists');
        setUserExists(true);
      } else {
        setMessage('Error signing up: ' + (error.response?.data?.msg || error.message));
      }
    }
  };

  const handleProceedToLogin = () => {
    router.push('/login');
  };

  return (
    <form onSubmit={handleSignup} className="max-w-md mx-auto mt-20 mb-20 p-4 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      {message && <p className={`mb-4 ${message.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>{message}</p>}
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          className="w-full p-2 border border-gray-300 rounded mt-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4 relative">
        <label htmlFor="password" className="block text-gray-700">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="w-full p-2 border border-gray-300 rounded mt-1 pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
          </div>
        </div>
      </div>
      <ButtonBlue text="Sign Up" />
      {userExists && (
        <button
          type="button"
          onClick={handleProceedToLogin}
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Proceed to Login
        </button>
      )}
    </form>
  );
};

export default Signup;
