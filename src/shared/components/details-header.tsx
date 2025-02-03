import Image from 'next/image';

import { InfoTagProps } from '@/shared/core/types';
import { Heading } from '@/shared/components/heading';
import { InfoTags } from '@/shared/components/info-tags';
import { Text } from '@/shared/components/text';

interface Props {
  src: string;
  name: string;
  summary: string;
  tags: InfoTagProps[];
}

export const DetailsHeader = (props: Props) => {
  const { src, name, summary, tags } = props;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="relative size-20 min-h-20 min-w-20 overflow-hidden rounded-full object-cover">
          <Image fill src={src} alt={name ?? ''} sizes="(max-width: 128px)" />
        </div>
        <div className="flex flex-col">
          <Heading text={name} className="text-2xl" />
          <div className="max-w-2xl ">
            <Text text={summary} className="text-md text-white/65" />
          </div>
        </div>
      </div>
      <InfoTags tags={tags} />
    </div>
  );
};
