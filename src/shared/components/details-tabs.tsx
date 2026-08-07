'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Tab, Tabs } from '@heroui/tabs';

import { TEST_IDS } from '@/shared/core/constants';

interface Props {
  tabs: { key: string; text: string; href: string }[];
}

export const DetailsTabs = ({ tabs }: Props) => {
  const params = useParams();
  const selectedTab = (params.tab as string) || 'overview';

  return (
    <Tabs
      aria-label="Details Tabs"
      data-testid={TEST_IDS.DETAILS_PANEL_TABS}
      variant="light"
      selectedKey={selectedTab}
      classNames={{
        cursor: 'bg-white/15',
      }}
    >
      {tabs.map((tab) => (
        <Tab key={tab.key} title={tab.text} href={tab.href} as={Link} />
      ))}
    </Tabs>
  );
};
