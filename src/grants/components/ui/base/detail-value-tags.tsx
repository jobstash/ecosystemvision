import { Avatar } from "@heroui/avatar";

import { DetailItems } from '@/grants/components/ui/base/detail-item';

interface Props {
  items: { logo: string | null; text: string }[];
}

export const DetailValueTags = ({ items }: Props) => {
  return (
    <DetailItems
      classNames={{
        container: 'gap-3',
        root: 'bg-[#808080]/20 p-1 border-none rounded-lg',
      }}
      items={items.map(({ text, logo }) => ({
        icon: logo ? (
          <Avatar
            showFallback
            name={text}
            src={logo}
            classNames={{
              base: 'h-5 w-5',
              fallback: 'bg-red-500',
            }}
          />
        ) : null,
        value: text,
      }))}
    />
  );
};
