import Link from 'next/link';

import { ExternalLinkIcon } from 'lucide-react';

import { JOBSTASH_URL } from '@/shared/core/envs';
import { getTitleCase } from '@/shared/utils/get-title-case';
import { normalizeString } from '@/shared/utils/normalize-string';
import { shortTimestamp } from '@/shared/utils/short-timestamp';

export interface CompactJob {
  id: string;
  title: string;
  shortUUID: string;
  organizationName?: string | null;
  location?: string | null;
  commitment?: string | null;
  publishedTimestamp?: number | null;
}

export const CompactJobCard = ({ job }: { job: CompactJob }) => {
  const jobSlug = normalizeString(
    `${job.title}${job.organizationName ? `-${job.organizationName}` : ''}`.replace(
      /\s*\/\s*/g,
      ' - ',
    ),
  );
  const metadata = [
    job.organizationName,
    job.location,
    job.commitment ? getTitleCase(job.commitment) : null,
    job.publishedTimestamp ? shortTimestamp(job.publishedTimestamp) : null,
  ].filter(Boolean);

  return (
    <Link
      className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:border-white/25 hover:bg-white/[0.07]"
      href={`${JOBSTASH_URL.replace(/\/$/, '')}/${jobSlug}/${encodeURIComponent(job.shortUUID)}`}
      rel="noreferrer"
      target="_blank"
    >
      <div className="min-w-0">
        <h3 className="truncate text-sm font-semibold text-white">
          {job.title}
        </h3>
        {metadata.length > 0 && (
          <p className="mt-1 truncate text-xs text-white/45">
            {metadata.join(' · ')}
          </p>
        )}
      </div>
      <ExternalLinkIcon
        aria-hidden="true"
        className="shrink-0 text-white/35 transition group-hover:text-white/70"
        size={14}
      />
    </Link>
  );
};
