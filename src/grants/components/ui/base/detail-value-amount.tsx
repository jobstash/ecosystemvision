import { formatNumber } from '@/shared/utils/format-number';

import { DetailValueText } from './detail-value-text';

interface Props {
  amount: number;
}

export const DetailValueAmount = ({ amount }: Props) => {
  const text = `$${formatNumber(amount)}`;

  return (
    <DetailValueText className="bg-zinc-500 p-0.5">{text}</DetailValueText>
  );
};
