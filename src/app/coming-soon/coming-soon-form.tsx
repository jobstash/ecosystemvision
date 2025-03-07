'use client';

import { useState } from 'react';

import { Button } from '@heroui/button';
import { Input } from '@heroui/input';

import { useAddToWaitlist } from '@/shared/hooks/use-add-to-waitlist';

const EmailIcon = () => (
  <svg
    fill="none"
    strokeWidth={1.5}
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="pointer-events-none size-6 shrink-0 text-default-400"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
    />
  </svg>
);

const CompanyIcon = () => (
  <svg
    fill="none"
    strokeWidth={1.5}
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="pointer-events-none size-6 shrink-0 text-default-400"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
    />
  </svg>
);

const RoleIcon = () => (
  <svg
    fill="none"
    strokeWidth={1.5}
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="pointer-events-none size-6 shrink-0 text-default-400"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
    />
  </svg>
);

const inputs = [
  {
    name: 'email',
    placeholder: 'Email',
    icon: <EmailIcon />,
  },
  {
    name: 'company',
    placeholder: 'Company',
    icon: <CompanyIcon />,
  },
  {
    name: 'role',
    placeholder: 'Role',
    icon: <RoleIcon />,
  },
];

const DEFAULT_FORM_STATE = {
  email: '',
  company: '',
  role: '',
};

export const ComingSoonForm = () => {
  const [formState, setFormState] = useState(DEFAULT_FORM_STATE);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { mutate, isPending } = useAddToWaitlist();

  const handleSubmit = () => {
    mutate(formState, { onSuccess: () => setFormState(DEFAULT_FORM_STATE) });
  };

  return (
    <div className="w-full max-w-xs space-y-4">
      {inputs.map((input) => (
        <Input
          key={input.name}
          size="lg"
          startContent={input.icon}
          fullWidth
          variant="bordered"
          placeholder={input.placeholder}
          name={input.name}
          isDisabled={isPending}
          value={formState[input.name as keyof typeof formState]}
          onChange={handleChange}
        />
      ))}
      <div className="pt-4">
        <Button
          fullWidth
          className="is-active font-medium"
          isLoading={isPending}
          onClick={handleSubmit}
        >
          Join Waitlist
        </Button>
      </div>
    </div>
  );
};
