'use client';

import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';
import { ArrowUpRight, X } from 'lucide-react';

import { getPersonProfile } from '@/people/data/get-people';

import { PersonProfileContent } from './person-profile-content';

export const PersonDrawer = ({
  login,
  onClose,
}: {
  login?: string;
  onClose: () => void;
}) => {
  const profile = useQuery({
    queryKey: ['person-profile', login],
    queryFn: () => getPersonProfile(login!),
    enabled: Boolean(login),
  });
  if (!login) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-end bg-black/65 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`People profile for ${login}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <aside className="size-full max-w-3xl overflow-y-auto border-l border-white/10 bg-[#090a0d] p-5 md:p-8">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href={`/people/${encodeURIComponent(login)}`}
            className="inline-flex items-center gap-1 text-sm text-sky-200 hover:text-sky-100"
          >
            Open shareable profile <ArrowUpRight className="size-4" />
          </Link>
          <button
            type="button"
            aria-label="Close person profile"
            className="rounded-lg border border-white/10 p-2 text-white/60 hover:bg-white/10 hover:text-white"
            onClick={onClose}
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        {profile.isLoading ? (
          <p className="py-20 text-center text-sm text-white/45">
            Loading @{login}…
          </p>
        ) : profile.data ? (
          <PersonProfileContent profile={profile.data} />
        ) : (
          <p className="py-20 text-center text-sm text-white/45">
            This person profile is unavailable.
          </p>
        )}
      </aside>
    </div>
  );
};
