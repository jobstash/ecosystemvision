import { fakeGrant } from '@/grants/testutils/fake-grant';

import { GrantListItem } from './grant-list-item';

export const GrantList = () => {
  // TODO: JOB-682

  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 64 }).map((_, index) => (
        <GrantListItem key={index} grant={fakeGrant} />
      ))}
    </div>
  );
};
