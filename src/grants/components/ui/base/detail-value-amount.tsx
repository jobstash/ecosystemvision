import { formatNumber } from '@/shared/utils/format-number';

import { DetailValueText } from './detail-value-text';

interface Props {
  amount: number;
}

export const DetailValueAmount = ({ amount }: Props) => {
  const text = `$${formatNumber(amount)}`;

  return (
    <DetailValueText className="rounded-md bg-white/10 px-[2px]">
      {text}
    </DetailValueText>
  );
};
