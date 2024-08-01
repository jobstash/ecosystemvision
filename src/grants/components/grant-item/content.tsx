import { Avatar, AvatarGroup } from '@nextui-org/react';

import { formatNumber } from '@/shared/utils/format-number';

import { Grant } from '@/grants/core/types';

interface Props {
  grant: Grant;
  cta: React.ReactNode;
}

type Detail = { label: string; value: string | number };
const DetailItem = ({ label, value }: Detail) => (
  <span>{`${label} ${value}`}</span>
);

const List = ({ label, items }: { label: string; items: string[] }) => (
  <div className="flex shrink-0 items-center gap-4">
    <span>{label}</span>
    {items.map((item) => (
      <span key={item}>{item}</span>
    ))}
  </div>
);

type Network = { name: string; logo: string | null };
const Networks = ({ networks }: { networks: Network[] }) => (
  <div className="flex items-center gap-3">
    <span>Networks</span>
    <AvatarGroup size="sm">
      {networks.map(({ name, logo }) => (
        <Avatar
          key={name}
          showFallback
          name={name}
          src={logo ?? ''}
          classNames={{
            base: 'bg-zinc-700',
            fallback: 'bg-white/5',
          }}
        />
      ))}
    </AvatarGroup>
  </div>
);

export const GrantItemContent = ({ grant, cta }: Props) => {
  const {
    name,
    grantees,
    networks,
    ecosystem,
    totalFunds,
    totalDisbursedFunds,
    summary,
    categories,
    type,
    reputations,
  } = grant;

  return (
    <>
      <div className="flex flex-col gap-3">
        <span>{name}</span>
        <div className="flex items-center gap-6">
          <DetailItem label="Grantees" value={grantees} />
          <Networks networks={networks} />
          <DetailItem label="Ecosystem" value={ecosystem} />
          <DetailItem
            label="Total Funds"
            value={`$${formatNumber(totalFunds)}`}
          />
          <DetailItem
            label="Total Disbursed Funds"
            value={`$${formatNumber(totalDisbursedFunds)}`}
          />
        </div>

        <div className="flex items-start gap-4">
          <span>{summary}</span>
          <List label="Categories" items={categories} />
          <div className="flex shrink-0 gap-4">
            <span>Type</span>
            <span>{type}</span>
          </div>
        </div>

        <List label="Reputations" items={reputations} />
      </div>

      {cta}
    </>
  );
};
