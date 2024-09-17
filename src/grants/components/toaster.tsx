'use client';

import { Toaster as BaseToaster } from 'react-hot-toast';

export const Toaster = () => {
  return (
    <BaseToaster
      toastOptions={{
        className: 'lg:ml-[248px]',
        style: {
          color: 'white',
          backgroundColor: '#2b2b2b',
        },
        success: {
          icon: '🎉',
          duration: 4000,
        },
      }}
    />
  );
};
