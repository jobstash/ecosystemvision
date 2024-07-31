import { fakeGrant } from '@/grants/testutils/fake-grant';

import { GrantItem } from './grant-item';

export const GrantList = () => {
  // TODO: JOB-682

  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 64 }).map((_, index) => (
        <GrantItem key={index} grant={fakeGrant} />
      ))}
    </div>
  );
};
