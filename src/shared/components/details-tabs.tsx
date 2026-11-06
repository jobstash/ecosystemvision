'use client';

import { useParams } from 'next/navigation';

import { Tabs } from '@heroui/react';

import { TEST_IDS } from '@/shared/core/constants';

interface Props {
  tabs: { key: string; text: string; href: string }[];
}

export const DetailsTabs = ({ tabs }: Props) => {
  const params = useParams();
  const selectedTab = (params.tab as string) || 'overview';

  return (
    <Tabs
      data-testid={TEST_IDS.DETAILS_PANEL_TABS}
      selectedKey={selectedTab}
    >
      <Tabs.List aria-label="Details Tabs">
        {tabs.map((tab) => (
          <Tabs.Tab key={tab.key} id={tab.key} href={tab.href}>
            {tab.text}
            <Tabs.Indicator className="bg-white/15" />
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
};
