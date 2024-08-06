"use client";

import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import ButtonRed from '@/components/ButtonRed';
import { auth } from '@/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    specialChar: false,
    number: false,
    uppercase: false,
    lowercase: false,
  });
  const [passwordMatchError, setPasswordMatchError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const length = password.length >= 6;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const number = /\d/.test(password);
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);

    setPasswordChecks({ length, specialChar, number, uppercase, lowercase });

    return length && specialChar && number && uppercase && lowercase;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    setEmailError('');
    setPasswordError('');
    setPasswordMatchError('');

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('Password does not meet the criteria.');
      return;
    }

    if (password !== confirmPassword) {
      setPasswordMatchError('Passwords do not match.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('User created successfully');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="max-w-md mx-auto mt-20 mb-20 p-4 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          className="w-full p-2 border border-gray-300 rounded mt-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setEmailError(validateEmail(email) ? '' : 'Please enter a valid email address.')}
        />
        {emailError && <p className="text-red-600 mt-1">{emailError}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          className="w-full p-2 border border-gray-300 rounded mt-1"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
        />
        {passwordError && <p className="text-red-600 mt-1">{passwordError}</p>}
        <ul className="list-none mt-2">
          <li className={`flex items-center ${passwordChecks.length ? 'text-green-600' : 'text-red-600'}`}>
            {passwordChecks.length ? <FaCheck className="mr-2" /> : <FaTimes className="mr-2" />} 
            At least 6 characters
          </li>
          <li className={`flex items-center ${passwordChecks.specialChar ? 'text-green-600' : 'text-red-600'}`}>
            {passwordChecks.specialChar ? <FaCheck className="mr-2" /> : <FaTimes className="mr-2" />} 
            At least one special character
          </li>
          <li className={`flex items-center ${passwordChecks.number ? 'text-green-600' : 'text-red-600'}`}>
            {passwordChecks.number ? <FaCheck className="mr-2" /> : <FaTimes className="mr-2" />} 
            At least one number
          </li>
          <li className={`flex items-center ${passwordChecks.uppercase ? 'text-green-600' : 'text-red-600'}`}>
            {passwordChecks.uppercase ? <FaCheck className="mr-2" /> : <FaTimes className="mr-2" />} 
            At least one uppercase letter
          </li>
          <li className={`flex items-center ${passwordChecks.lowercase ? 'text-green-600' : 'text-red-600'}`}>
            {passwordChecks.lowercase ? <FaCheck className="mr-2" /> : <FaTimes className="mr-2" />} 
            At least one lowercase letter
          </li>
        </ul>
      </div>
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          className="w-full p-2 border border-gray-300 rounded mt-1"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {passwordMatchError && <p className="text-red-600 mt-1">{passwordMatchError}</p>}
      </div>
      <ButtonRed text="Sign Up" />
    </form>
  );
};

export default SignUp;
