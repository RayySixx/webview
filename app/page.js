"use client";
import { useEffect } from 'react';

export default function Home() {
  const WEBVIEW_URL = "http://privserv.my.id:2025"; 

  useEffect(() => {
    // 1. Matikan Zoom lewat Gesture Dua Jari (Pinch)
    const preventZoom = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // 2. Matikan Zoom lewat Double Tap
    let lastTouchEnd = 0;
    const preventDoubleTap = (e) => {
      const now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    document.addEventListener('touchstart', preventZoom, { passive: false });
    document.addEventListener('touchend', preventDoubleTap, { passive: false });

    return () => {
      document.removeEventListener('touchstart', preventZoom);
      document.removeEventListener('touchend', preventDoubleTap);
    };
  }, []);

  return (
    <main style={{ 
      width: '100vw', 
      height: '100vh', 
      height: '100dvh', // Support dynamic viewport height di HP
      overflow: 'hidden', 
      margin: 0, 
      padding: 0,
      position: 'fixed',
      inset: 0,
      backgroundColor: '#131316' // Samain sama warna background web lu
    }}>
      <iframe
        src={WEBVIEW_URL}
        style={{ 
          width: '100%', 
          height: '100%', 
          border: 'none', 
          margin: 0, 
          padding: 0,
          display: 'block' // Ngilangin sela bawah iframe
        }}
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-storage-access-by-user-activation"
        allow="storage-access; clipboard-read; clipboard-write"
      />
    </main>
  );
}
