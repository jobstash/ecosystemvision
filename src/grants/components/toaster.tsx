'use client';

import { Toaster as BaseToaster } from 'react-hot-toast';

export const Toaster = () => {
  return (
    <BaseToaster
      toastOptions={{
        className: 'lg:ml-[248px]',
        style: {
          color: 'white',
          backgroundColor: 'rgba(255,255,255,0.10)',
        },
        success: {
          icon: '🎉',
          duration: 4000,
        },
      }}
    />
  );
};
