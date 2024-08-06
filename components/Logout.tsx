// Logout.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { auth } from '@/firebaseConfig';

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
