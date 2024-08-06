import { formatNumber } from '@/shared/utils/format-number';

import { DetailValueText } from './detail-value-text';

interface Props {
  amount: number;
}

export const DetailValueAmount = ({ amount }: Props) => {
  const text = `$${formatNumber(amount)}`;

  return (
    <DetailValueText className="rounded-sm bg-white/10 px-[2px]">{text}</DetailValueText>
  );
};
