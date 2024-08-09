"use client"

import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import SendDraftButton from '@/components/SendDraftButton';
import SubmitApplicationButton from '@/components/SubmitApplicationButton';

interface Application {
  grantName: string;
  grantDescription: string;
  orgAddress: string;
  targetEmail: string;
  targetAddress: string;
  letterMessage: string;
}

const GrantApplication = () => {
  const { currentUser } = useAuth();
  const [selectedOption, setSelectedOption] = useState('create');
  const [grantName, setGrantName] = useState('');
  const [grantDescription, setGrantDescription] = useState('');
  const [orgAddress, setOrgAddress] = useState('');
  const [targetEmail, setTargetEmail] = useState('');
  const [targetAddress, setTargetAddress] = useState('');
  const [letterMessage, setLetterMessage] = useState('');
  const [applicationHistory, setApplicationHistory] = useState<Application[]>([]);
  const [emailError, setEmailError] = useState('');

  const orgAddressRef = useRef<HTMLTextAreaElement>(null);
  const targetAddressRef = useRef<HTMLTextAreaElement>(null);
  const letterMessageRef = useRef<HTMLTextAreaElement>(null);

  const orgAddressPlaceholder = `Outreach Connect,\n123 Main Street,\nSacramento, CA 95814,\nofficial@outreachconnect.org,\n[Today's Date].`;
  const targetAddressPlaceholder = `The Global Fund for Children,\n1101 14th St NW, Suite 420,\nWashington, DC 20005.`;
  const letterMessagePlaceholder = `Dear Grant Selection Committee,\n\nI am writing to express Outreach Connect's interest in partnering with The Global Fund for Children to expand our initiatives aimed at supporting vulnerable children within Sacramento and the surrounding communities...\n\n[Your Name]\n[Your Position]\nOutreach Connect\n[Your Contact Information]`;

  useEffect(() => {
    if (!currentUser) {
      window.location.href = '/login';
    }
  }, [currentUser]);

  if (!currentUser) return <p>Loading...</p>;

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    const newApplication = {
      grantName,
      grantDescription,
      orgAddress,
      targetEmail,
      targetAddress,
      letterMessage,
    };

    setApplicationHistory([...applicationHistory, newApplication]);

    // Clear form fields
    setGrantName('');
    setGrantDescription('');
    setOrgAddress('');
    setTargetEmail('');
    setTargetAddress('');
    setLetterMessage('');
  };

  const handleInput = (ref: React.RefObject<HTMLTextAreaElement>, placeholder: string, setState: React.Dispatch<React.SetStateAction<string>>) => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";

      if (ref.current.value === "") {
        setState(placeholder);
      }
    }
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTargetEmail(event.target.value);
    if (validateEmail(event.target.value)) {
      setEmailError('');
    } else {
      setEmailError('Invalid email format');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 mb-20 p-4 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4">Grant Applications</h2>
      <div className="mb-4">
        <label htmlFor="applicationType" className="block text-gray-700 mb-2">
          Select Application Type
        </label>
        <select
          id="applicationType"
          className="w-full p-2 border border-gray-300 rounded"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value="create">Create New Application</option>
          <option value="history">Application History</option>
        </select>
      </div>
      {selectedOption === 'create' && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Create New Application</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <label htmlFor="grantName" className="block text-gray-700 mb-2">Grant Name</label>
              <input
                type="text"
                id="grantName"
                className="w-full p-2 border border-gray-300 rounded"
                value={grantName}
                onChange={(e) => setGrantName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="grantDescription" className="block text-gray-700 mb-2">Grant Description</label>
              <textarea
                id="grantDescription"
                className="w-full p-2 border border-gray-300 rounded"
                value={grantDescription}
                onChange={(e) => setGrantDescription(e.target.value)}
                required
                rows={6}
              ></textarea>
            </div>
            <div className="mb-4">
            <h1 className='text-center font-bold text-3xl mb-4'>Apply for the Grant</h1>
              <label htmlFor="orgAddress" className="block text-gray-700 mb-2">Organization&apos;s Official Address</label>
              <textarea
                id="orgAddress"
                ref={orgAddressRef}
                className="w-full p-2 border border-gray-300 rounded"
                value={orgAddress}
                onChange={(e) => setOrgAddress(e.target.value)}
                onInput={() => handleInput(orgAddressRef, orgAddressPlaceholder, setOrgAddress)}
                required
                placeholder={orgAddressPlaceholder}
                rows={6}
              ></textarea>
              <small className="block text-gray-500">Enter address in the format: Outreach Connect, 123 Main Street, Sacramento, CA 95814, official@outreachconnect.org, [Today&apos;s Date].</small>
            </div>
            <div className="mb-4">
              <label htmlFor="targetEmail" className="block text-gray-700 mb-2">Target Organization&apos;s Email</label>
              <input
                type="email"
                id="targetEmail"
                className="w-full p-2 border border-gray-300 rounded"
                value={targetEmail}
                onChange={handleEmailChange}
                required
              />
              {emailError && <small className="text-red-600">{emailError}</small>}
            </div>
            <div className="mb-4">
              <label htmlFor="targetAddress" className="block text-gray-700 mb-2">Target Organization&apos;s Address</label>
              <textarea
                id="targetAddress"
                ref={targetAddressRef}
                className="w-full p-2 border border-gray-300 rounded"
                value={targetAddress}
                onChange={(e) => setTargetAddress(e.target.value)}
                onInput={() => handleInput(targetAddressRef, targetAddressPlaceholder, setTargetAddress)}
                required
                placeholder={targetAddressPlaceholder}
                rows={6}
              ></textarea>
              <small className="block text-gray-500">Enter address in the format: The Global Fund for Children, 1101 14th St NW, Suite 420, Washington, DC 20005.</small>
            </div>
            <div className="mb-4">
              <label htmlFor="letterMessage" className="block text-gray-700 mb-2">Letter Message</label>
              <textarea
                id="letterMessage"
                ref={letterMessageRef}
                className="w-full p-2 border border-gray-300 rounded"
                value={letterMessage}
                onChange={(e) => setLetterMessage(e.target.value)}
                onInput={() => handleInput(letterMessageRef, letterMessagePlaceholder, setLetterMessage)}
                required
                placeholder={letterMessagePlaceholder}
                rows={10}
              ></textarea>
              <small className="block text-gray-500">Enter the letter message in the proper format.</small>
            </div>
            <SendDraftButton
              orgAddress={orgAddress}
              targetEmail={targetEmail}
              targetAddress={targetAddress}
              letterMessage={letterMessage}
            />
            <p className="text-red-600 mb-4">Send a draft message to official@outreachconnect.org and preview before submitting the final letter.</p>
            <SubmitApplicationButton
              orgAddress={orgAddress}
              targetEmail={targetEmail}
              targetAddress={targetAddress}
              letterMessage={letterMessage}
              onSubmit={handleSubmit}
            />
          </form>
        </div>
      )}
      {selectedOption === 'history' && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Application History</h3>
          {applicationHistory.length === 0 ? (
            <p>No applications found.</p>
          ) : (
            <ul>
              {applicationHistory.map((app, index) => (
                <li key={index} className="mb-4 p-4 border border-gray-300 rounded">
                  <p><strong>Grant Name:</strong> {app.grantName}</p>
                  <p><strong>Grant Description:</strong> {app.grantDescription}</p>
                  <p><strong>Organization&pos;s Official Address:</strong></p>
                  <pre className="whitespace-pre-wrap">{app.orgAddress}</pre>
                  <p><strong>Target Organization&apos;s Email:</strong> {app.targetEmail}</p>
                  <p><strong>Target Organization&apos;s Address:</strong></p>
                  <pre className="whitespace-pre-wrap">{app.targetAddress}</pre>
                  <p><strong>Letter Message:</strong></p>
                  <pre className="whitespace-pre-wrap">{app.letterMessage}</pre>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default GrantApplication;
