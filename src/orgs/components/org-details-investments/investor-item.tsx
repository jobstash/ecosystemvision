import { normalizeString } from '@/shared/utils/normalize-string';
import { PaperbillIcon } from '@/shared/components/icons/paperbill-icon';
import { InfoTag } from '@/shared/components/info-tag';

interface Props {
  id: string;
  name: string;
}

export const InvestorItem = ({ name }: Props) => (
  <InfoTag
    tag={{
      text: name,
      icon: <PaperbillIcon />,
      showExternalIcon: false,
      link: `/organizations/investors/${normalizeString(name)}`,
    }}
  />
);
