'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AuthSplitView from '../../components/auth-split-view';

function LoginPageInner() {
  const searchParams = useSearchParams();
  const initialMode = searchParams.get('tab') === 'register' ? 'register' : 'login';
  return <AuthSplitView initialMode={initialMode} />;
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#5B3DF5' }} />}>
      <LoginPageInner />
    </Suspense>
  );
}
