'use client';

import { Toaster, ToastBar } from 'react-hot-toast';

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          fontSize: '14px',
          borderRadius: '12px',
          padding: '12px 16px',
          background: 'white',
          color: '#111',
          boxShadow: '0px 4px 20px rgba(0,0,0,0.05)',
        },
        success: {
          iconTheme: {
            primary: '#34C759',
            secondary: '#fff',
          },
          style: {
            border: '1px solid #34C759',
            background: '#F6FFF9',
            color: '#15803D',
          },
        },
        error: {
          style: {
            border: '1px solid #FF3B30',
            background: '#FFF6F6',
            color: '#FF3B30',
          },
        },
      }}
    >
      {(t) => (
        <div
          className={`relative overflow-hidden transform transition-all ${
            t.visible ? 'animate-slide-in' : 'animate-slide-out'
          }`}
        >
          <ToastBar toast={t} />
        </div>
      )}
    </Toaster>
  );
}
