// components/LoginPromptModal.tsx
import React from "react";
import { TbLockAccess } from "react-icons/tb";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const LoginPromptModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
        <div className="flex items-center mb-4 justify-center text-red-900">
          <TbLockAccess className="text-3xl mr-2" />
          <h2 className="text-lg font-semibold text-center">Access Restricted</h2>
        </div>

        <p className="mb-4">You need to be logged in to post a blog. Please log in to continue.</p>
        <div className="flex justify-center">
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={() => {
              onClose();
              window.location.href = "/login"; // Redirect to login page
            }}
          >
            Login
          </button>
          <button 
            className="ml-2 text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPromptModal;