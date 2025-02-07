'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Tab, Tabs } from '@heroui/tabs';

interface Props {
  tabs: { key: string; text: string; href: string }[];
}

export const DetailsTabs = ({ tabs }: Props) => {
  const params = useParams();
  const selectedTab = (params.tab as string) || 'overview';

  return (
    <Tabs
      aria-label="Details Tabs"
      variant="light"
      selectedKey={selectedTab}
      classNames={{
        cursor: 'bg-white/15',
      }}
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.key}
          title={tab.text}
          href={tab.href}
          as={Link}
          replace={true}
          // @ts-expect-error - routerOptions
          routerOptions={{ replace: true }}
        />
      ))}
    </Tabs>
  );
};
