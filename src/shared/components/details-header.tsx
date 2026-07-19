import { InfoTagProps } from '@/shared/core/types';
import { Heading } from '@/shared/components/heading';
import { InfoTags } from '@/shared/components/info-tags';
import { LogoImage } from '@/shared/components/logo-title';
import { Text } from '@/shared/components/text';

interface Props {
  src: string;
  name: string;
  summary: string;
  infoTags: InfoTagProps[];
  socialTags: InfoTagProps[];
}

export const DetailsHeader = (props: Props) => {
  const { src, name, summary, infoTags, socialTags } = props;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <LogoImage
          src={src}
          name={name}
          className="size-20 min-h-20 min-w-20 text-xl"
          sizes="80px"
        />
        <div className="flex flex-col">
          <Heading text={name} className="text-2xl" />
          <div className="max-w-2xl ">
            <Text text={summary} className="text-md text-white/65" />
          </div>
        </div>
      </div>
      <div className="flex max-w-4xl flex-col gap-4">
        <InfoTags tags={infoTags} />
        <InfoTags tags={socialTags} />
      </div>
    </div>
  );
};
