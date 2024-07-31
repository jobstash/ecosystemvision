import { memo } from 'react';

export const TwitterIcon = memo(() => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 6.25C0 2.79822 2.79822 0 6.25 0H13.75C17.2018 0 20 2.79822 20 6.25V13.75C20 17.2018 17.2018 20 13.75 20H6.25C2.79822 20 0 17.2018 0 13.75V6.25Z"
        fill="black"
      />
      <path
        d="M11.0164 9.08313L15.3195 3.75H13.3989L10.1145 7.82312L7.20078 3.75H3.01953L7.89828 10.5687L3.31328 16.25H5.23453L8.80016 11.8313L11.9633 16.25H16.1445L11.0164 9.08313ZM9.52891 10.9269L8.62578 9.665L5.11953 4.76688H6.56328L9.39328 8.715L10.2952 9.9775L14.0564 15.2331H12.6127L9.52891 10.9269Z"
        fill="white"
      />
    </svg>
  );
});

TwitterIcon.displayName = 'TwitterIcon';
