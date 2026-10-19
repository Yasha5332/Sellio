'use client';

import React, { Suspense } from 'react';
import AuthSplitView from '../../components/auth-split-view';

export default function SignupPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#5B3DF5' }} />}>
      <AuthSplitView initialMode="register" />
    </Suspense>
  );
}
