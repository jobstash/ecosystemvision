import type { Metadata } from 'next';

import {
  getPeopleActivityMap,
  getPeopleAtlas,
  getPeopleOverview,
} from '@/people/data/get-people';

import { PeoplePage } from '@/people/pages/people-page';

export const metadata: Metadata = {
  title: 'People · Ecosystem Vision',
  description:
    'Explore privacy-preserving aggregate developer activity and organization movement across the open-source ecosystem.',
};

export const dynamic = 'force-dynamic';

const Page = async () => {
  const [overview, activityMap, atlas] = await Promise.all([
    getPeopleOverview(),
    getPeopleActivityMap(),
    getPeopleAtlas(),
  ]);
  return (
    <PeoplePage
      initialOverview={overview}
      initialActivityMap={activityMap}
      initialAtlas={atlas}
    />
  );
};

export default Page;
