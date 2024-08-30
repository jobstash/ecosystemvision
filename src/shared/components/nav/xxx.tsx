'use client';

import { useIsMounted } from '@/shared/hooks/use-is-mounted';

export const XXX = () => {
  const isMounted = useIsMounted();
  return isMounted ? null : <p>FAKE LOADER</p>;
};
