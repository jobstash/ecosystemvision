import { FRONTEND_URL } from '@/shared/core/envs';
import { Investor } from '@/shared/core/schemas';
import { InfoTagProps } from '@/shared/core/types';
import { normalizeString } from '@/shared/utils/normalize-string';
import { Divider } from '@/shared/components/divider';
import { Heading } from '@/shared/components/heading';
import { PaperbillIcon } from '@/shared/components/icons/paperbill-icon';
import { InfoTags } from '@/shared/components/info-tags';

const HEADING_TEXT = 'Investors';

const createInvestorsTags = (investors: Investor[]) => {
  const tags: InfoTagProps[] = investors.map(({ name }) => ({
    text: name,
    icon: <PaperbillIcon />,
    link: `${FRONTEND_URL}/organizations?investors=${normalizeString(name)}`,
    showExternalIcon: false,
  }));

  return tags;
};

interface Props {
  investors: Investor[];
}

export const Investors = ({ investors }: Props) => {
  const count = investors.length;

  if (!count) return null;

  const tags = createInvestorsTags(investors);

  return (
    <>
      <Divider />

      <Heading text={HEADING_TEXT} className="text-lg font-semibold" />

      <InfoTags tags={tags} />
    </>
  );
};
