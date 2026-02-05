"use client";
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const preventZoom = (e) => {
      if (e.touches.length > 1) e.preventDefault();
    };
    document.addEventListener('touchstart', preventZoom, { passive: false });
    return () => document.removeEventListener('touchstart', preventZoom);
  }, []);

  return (
    <main style={{ 
      width: '100vw', height: '100dvh', overflow: 'hidden', 
      position: 'fixed', inset: 0, backgroundColor: '#131316' 
    }}>
      <iframe
        src="/api/proxy" // Manggil route proxy internal
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-storage-access-by-user-activation"
        allow="storage-access; clipboard-read; clipboard-write"
      />
    </main>
  );
}
