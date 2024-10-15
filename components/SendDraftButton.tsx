import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Notification from '@/components/Notification';

interface Props {
  orgAddress: string;
  targetEmail: string;
  targetAddress: string;
  letterMessage: string;
}

const SendDraftButton: React.FC<Props> = ({ orgAddress, targetEmail, targetAddress, letterMessage }) => {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const sendDraftEmail = async () => {
    setLoading(true);
    const templateParams = {
      org_address: orgAddress,
      target_email: targetEmail,
      target_address: targetAddress,
      letter_message: letterMessage,
    };

    try {
      await emailjs.send('service_xzi5hkl', 'template_pn5xvx3', templateParams, 'bJQc_7O9C5RU7aAR-');
      setNotification({ type: 'success', message: 'Draft Sent Successfully' });
    } catch (error) {
      setNotification({ type: 'error', message: 'Draft Send Failed. Try Again Later or Check Your Internet Connection.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={sendDraftEmail}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-900 flex items-center justify-center mb-4"
      >
        {loading ? <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" /> : null}
        SEND DRAFT FIRST
      </button>
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  );
};

export default SendDraftButton;
