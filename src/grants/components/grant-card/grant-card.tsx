import { Grant } from '@/grants/core/types';
import { GrantItem } from '@/grants/components/grant-item';

import { GrantCardCTA } from './cta';

interface Props {
  grant: Grant;
}

export const GrantCard = ({ grant }: Props) => {
  // TODO: JOB-678
  return <GrantItem grant={grant} cta={<GrantCardCTA {...grant} />} />;
};
