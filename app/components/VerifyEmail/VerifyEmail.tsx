// VerifyEmail.tsx
import React, { useState } from 'react';
import axios from 'axios';

const VerifyEmail: React.FC = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/verify-email', { email, code });
      setMessage(res.data.msg);
    } catch (error) {
      setMessage('Error verifying email: ' + error.response.data.msg);
    }
  };

  return (
    <form onSubmit={handleVerify} className="max-w-md mx-auto mt-8 p-4 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Verify Email</h2>
      {message && <p className="mb-4 text-red-600">{message}</p>}
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
      <div className="mb-4">
        <label htmlFor="code" className="block text-gray-700">Verification Code</label>
        <input
          type="text"
          id="code"
          className="w-full p-2 border border-gray-300 rounded mt-1"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Verify Email
      </button>
    </form>
  );
};

export default VerifyEmail;
