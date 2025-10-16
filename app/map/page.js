'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import KakaoMap from '@/components/KakaoMap';
import AuthModal from '@/components/AuthModal';

function MapContent() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const searchParams = useSearchParams();
  const university = searchParams.get('university');

  const handleAuthModalOpen = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header onAuthModalOpen={handleAuthModalOpen} university={university} />
      
      <main className="flex-1 relative">
        <KakaoMap university={university} />
      </main>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        setMode={setAuthMode}
      />
    </div>
  );
}

export default function MapPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
      <MapContent />
    </Suspense>
  );
}
