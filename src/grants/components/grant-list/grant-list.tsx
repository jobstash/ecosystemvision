import { GrantItem } from '@/grants/components/grant-item';

import { fakeGrant } from '@/grants/testutils/fake-grant';

import { GrantListCTA } from './cta';

export const GrantList = () => {
  // TODO: JOB-682

  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 64 }).map((_, index) => (
        <GrantItem key={index} grant={fakeGrant} cta={<GrantListCTA />} />
      ))}
    </div>
  );
};
