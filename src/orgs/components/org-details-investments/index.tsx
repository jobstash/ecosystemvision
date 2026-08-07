import Link from 'next/link';

import { normalizeString } from '@/shared/utils/normalize-string';
import { Heading } from '@/shared/components/heading';

import { OrgDetails } from '@/orgs/core/schemas';

import { FundingRounds } from './funding-rounds';
import { Grants } from './grants';
import { Investors } from './investors';

interface Props {
  org: OrgDetails;
}

export const OrgDetailsInvestments = ({ org }: Props) => {
  const { fundingRounds, investors, grants } = org;

  return (
    <div className="flex flex-col gap-y-4">
      {org.fundingStage ? (
        <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          <Heading text="Current funding stage" className="text-xl" />
          <Link
            className="mt-2 inline-flex text-sky-200 transition hover:text-sky-100"
            href={`/organizations/fundingStages/${normalizeString(org.fundingStage)}`}
          >
            {org.fundingStage}
          </Link>
          <p className="mt-1 text-xs text-white/45">
            Current recognized equity stage. The rounds below remain the
            historical funding record.
          </p>
        </section>
      ) : null}
      <FundingRounds fundingRounds={fundingRounds} />
      <Investors investors={investors} />
      <Grants grants={grants} />
    </div>
  );
};
