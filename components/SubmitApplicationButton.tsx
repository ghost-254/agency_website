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
  onSubmit: () => void;
}

const SubmitApplicationButton: React.FC<Props> = ({ orgAddress, targetEmail, targetAddress, letterMessage, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const submitApplicationEmail = async () => {
    setLoading(true);
    const templateParams = {
      org_address: orgAddress,
      target_email: targetEmail,
      target_address: targetAddress,
      letter_message: letterMessage,
    };

    try {
      await emailjs.send('service_fgo95qv', 'template_w794gh8', templateParams, '2OlG4kowPvSlg-PPd');
      setNotification({ type: 'success', message: 'Application Submitted Successfully' });
      onSubmit();
    } catch (error) {
      setNotification({ type: 'error', message: 'Application Submission Failed. Try Again Later or Check Your Internet Connection.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={submitApplicationEmail}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-900 flex items-center justify-center"
      >
        {loading ? <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" /> : null}
        Submit Application
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

export default SubmitApplicationButton;
