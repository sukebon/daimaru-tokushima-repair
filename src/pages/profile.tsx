import { UserProfile } from '@/conponents/UserProfile';
import React, { FC, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
const profile = () => {
  return (
    <div>
      <UserProfile />
    </div>
  );
};

export default profile;