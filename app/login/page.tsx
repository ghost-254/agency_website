// login/page.tsx

"use client"

import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import ButtonBlue from '@/components/ButtonBlue';
import { auth } from '@/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('Logged in successfully');
      // Redirect to homepage
      window.location.href = '/';
    } catch (error: any) {
      setMessage('Error logging in: ' + (error.response?.data?.msg || error.message));
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-20 mb-20 p-4 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      {message && <p className={`mb-4 ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
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
            {showPassword ? <FaEyeSlash className="text-black" /> : <FaEye className="text-black" />}
          </div>
        </div>
      </div>
      <ButtonBlue text="Admin Login" />
    </form>
  );
};

export default Login;
