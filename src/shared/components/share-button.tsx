'use client';

import { Button } from '@heroui/button';

import { FRONTEND_URL } from '@/shared/core/envs';

interface Props {
  id: string;
  routeSection: 'organizations' | 'projects';
}

export const ShareButton = ({ id, routeSection }: Props) => {
  const onClick = () => {
    if (typeof navigator !== 'undefined') {
      const path = `${FRONTEND_URL}/${routeSection}/${id}/details`;
      navigator.clipboard.writeText(path);
    }
  };

  return (
    <Button
      isIconOnly
      className="flex w-10 items-center justify-center rounded-md bg-white/10"
      onClick={onClick}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.4068 8.21744L15.4072 8.21783C15.5478 8.35848 15.7386 8.4375 15.9375 8.4375C16.1364 8.4375 16.3272 8.35848 16.4678 8.21783C16.6085 8.07718 16.6875 7.88641 16.6875 7.6875C16.6875 7.48859 16.6085 7.29782 16.4678 7.15717L12.5303 3.21967C12.3897 3.07902 12.1989 3 12 3C11.8011 3 11.6103 3.07902 11.4697 3.21967L7.53245 7.15689L7.53217 7.15717C7.39152 7.29782 7.3125 7.48859 7.3125 7.6875C7.3125 7.69951 7.31279 7.71153 7.31337 7.72353C7.32232 7.90976 7.40033 8.08599 7.53217 8.21783C7.67282 8.35848 7.86359 8.4375 8.0625 8.4375C8.26141 8.4375 8.45218 8.35848 8.59283 8.21783L8.59311 8.21755L12 4.81066L15.4068 8.21744Z"
          fill="#F9FAFB"
        />
        <path
          d="M12.75 14.25V3.75C12.75 3.33579 12.4142 3 12 3C11.5858 3 11.25 3.33579 11.25 3.75V14.25C11.25 14.6642 11.5858 15 12 15C12.4142 15 12.75 14.6642 12.75 14.25Z"
          fill="#F9FAFB"
        />
        <path
          d="M4.5 19.5V14.25C4.5 13.8358 4.16421 13.5 3.75 13.5C3.33579 13.5 3 13.8358 3 14.25V19.5C3 20.1213 3.43934 20.5607 3.43934 20.5607C3.87868 21 4.5 21 4.5 21H19.5C20.1213 21 20.5607 20.5607 20.5607 20.5607C21 20.1213 21 19.5 21 19.5V14.25C21 13.8358 20.6642 13.5 20.25 13.5C19.8358 13.5 19.5 13.8358 19.5 14.25V19.5H4.5Z"
          fill="#F9FAFB"
        />
      </svg>
    </Button>
  );
};
