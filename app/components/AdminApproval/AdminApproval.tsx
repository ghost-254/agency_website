// AdminApproval.tsx
import React, { useState } from 'react';
import axios from 'axios';

const AdminApproval: React.FC = () => {
  const [email, setEmail] = useState('');
  const [adminApprovalCode, setAdminApprovalCode] = useState('');
  const [message, setMessage] = useState('');

  const handleApproval = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/admin-approve', { email, adminApprovalCode });
      setMessage(res.data.msg);
    } catch (error) {
      setMessage('Error approving user: ' + error.response.data.msg);
    }
  };

  return (
    <form onSubmit={handleApproval} className="max-w-md mx-auto mt-8 p-4 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Admin Approval</h2>
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
        <label htmlFor="adminApprovalCode" className="block text-gray-700">Admin Approval Code</label>
        <input
          type="text"
          id="adminApprovalCode"
          className="w-full p-2 border border-gray-300 rounded mt-1"
          value={adminApprovalCode}
          onChange={(e) => setAdminApprovalCode(e.target.value)}
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Approve User
      </button>
    </form>
  );
};

export default AdminApproval;
