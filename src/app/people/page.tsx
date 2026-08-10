import type { Metadata } from 'next';

import {
  getPeopleActivityMap,
  getPeopleAtlas,
  getPeopleDirectory,
  getPeopleOverview,
} from '@/people/data/get-people';

import { PeoplePage } from '@/people/pages/people-page';

export const metadata: Metadata = {
  title: 'People · Ecosystem Vision',
  description:
    'Explore internal contributors, maintainers, organizations, and movement across the open-source ecosystem.',
};

export const dynamic = 'force-dynamic';

const Page = async () => {
  const [overview, activityMap, atlas, directory] = await Promise.all([
    getPeopleOverview(),
    getPeopleActivityMap(),
    getPeopleAtlas(),
    getPeopleDirectory(),
  ]);
  return (
    <PeoplePage
      initialOverview={overview}
      initialActivityMap={activityMap}
      initialAtlas={atlas}
      initialDirectory={directory}
    />
  );
};

export default Page;
