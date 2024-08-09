import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

interface NotificationProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 p-4 rounded shadow-lg ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white flex items-center`}>
      <FontAwesomeIcon icon={type === 'success' ? faCheckCircle : faTimesCircle} className="mr-2" />
      <span>{message}</span>
      <button onClick={onClose} className="ml-4">
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

export default Notification;
