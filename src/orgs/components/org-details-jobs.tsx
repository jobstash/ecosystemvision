'use client';

import { Briefcase, ExternalLink } from 'lucide-react';

import { DetailsPanelCardWrapper } from '@/shared/components/details-panel/card-wrapper';

import { OrgDetails } from '@/orgs/core/schemas';
import { createOrgInfoTagProps } from '@/orgs/utils/create-job-info-tag-props';
// const slugify = (text: string) =>
//   text
//     .toLowerCase()
//     .trim() // Remove leading/trailing spaces
//     .replace(/\s+/g, '-') // Convert spaces to hyphens
//     .replace(/[^\w-]/g, '');

interface Props {
  org: OrgDetails;
}

export const OrgDetailsJobs = ({ org }: Props) => {
  const { jobs, normalizedName } = org;
  console.log('hello', normalizedName);

  // ✅ Extract & slugify company name
  // const segments = pathname.split('/');
  // const rawCompany = decodeURIComponent(
  //   segments[segments.indexOf('info') + 1] || 'unknown',
  // );
  // const companySlug = slugify(rawCompany);

  if (!jobs || jobs.length === 0) {
    return (
      <p className="text-gray-500 text-center">No job listings available.</p>
    );
  }

  return (
    <DetailsPanelCardWrapper>
      <h2 className="mb-4 text-2xl font-semibold text-white">Job Listings</h2>
      <div className="space-y-4">
        {jobs.map((job) => {
          if (!job.title) {
            console.error('Job title is missing for job ID:', job.id);
          }

          // ✅ Debugging slugify function
          // console.log('Original Job Title:', job.title);
          // console.log('Slugified Job Title:', slugify(job.title));
          // ✅ Slugify job title separately
          // const jobTitleSlug = slugify(job.title);

          // ✅ Correct URL structure
          const jobTags = createOrgInfoTagProps(job);
          console.log('job tag', jobTags);
          const jobUrl = `${process.env.NEXT_PUBLIC_JOBSTASH_URL}/jobs/${job.shortUUID}/details?organizations=${org.normalizedName}`;
          return (
            <a
              key={job.id}
              href={jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border bg-[#161616] p-4 shadow-md transition-transform duration-200 hover:scale-105"
            >
              <div className="flex items-center gap-3">
                <Briefcase className="text-blue-400" size={24} />
                <h3 className="text-lg font-bold text-white">{job.title}</h3>
              </div>
              <p className="text-gray-400 mt-2">{job.summary}</p>
              <div className="text-gray-300 mt-3 flex flex-wrap gap-2 text-sm">
                {jobTags
                  .filter((tag) => tag.text?.trim())
                  .map((tag) => (
                    <span
                      key={tag.text}
                      className="bg-gray-800 flex items-center gap-1 rounded px-2 py-1"
                    >
                      {tag.icon} {tag.text}
                    </span>
                  ))}
              </div>
              <div className="mt-3 flex items-center gap-2 text-blue-400">
                Explore Job <ExternalLink size={16} />
              </div>
            </a>
          );
        })}
      </div>
    </DetailsPanelCardWrapper>
  );
};
