import type { Metadata } from 'next';
import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

import { getPersonProfile } from '@/people/data/get-people';
import { PersonProfileContent } from '@/people/components/person-profile-content';

interface Props {
  params: Promise<{ login: string }>;
}

export const dynamic = 'force-dynamic';

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { login } = await params;
  return {
    title: `@${login} · People · Ecosystem Vision`,
    description: `Organization and maintainer history for @${login}.`,
  };
};

const Page = async ({ params }: Props) => {
  const { login } = await params;
  const profile = await getPersonProfile(login);
  return (
    <main className="min-h-screen bg-[#070708] px-4 pb-24 pt-28 text-white md:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/people"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/45 hover:text-white"
        >
          <ArrowLeft className="size-4" aria-hidden="true" /> Back to People
        </Link>
        <PersonProfileContent profile={profile} />
      </div>
    </main>
  );
};

export default Page;
