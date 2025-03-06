import { Briefcase, ExternalLink, Globe } from 'lucide-react';

import { OrgDetails } from '@/orgs/core/schemas';

interface Props {
  org: OrgDetails;
}

export const OrgDetailsJobs = ({ org }: Props) => {
  const { jobs } = org;

  if (!jobs || jobs.length === 0) {
    return (
      <p className="text-gray-500 text-center">No job listings available.</p>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h2 className="mb-4 text-2xl font-semibold text-white">Job Listings</h2>
      <div className="space-y-4">
        {jobs.map((job) => (
          <a
            key={job.id}
            // href={`https://jobstash.xyz/jobs/${job.title}-${job.shortUUID}/details?query=${company}`}
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
              <span className="bg-gray-800 flex items-center gap-1 rounded px-2 py-1">
                <Globe size={14} /> {job.location}
              </span>
              <span className="bg-gray-800 rounded px-2 py-1">
                {job.commitment}
              </span>
              {job.salary && (
                <span className="rounded bg-green-700 px-2 py-1 text-white">
                  ${job.minimumSalary?.toLocaleString()} - $
                  {job.maximumSalary?.toLocaleString()} {job.salaryCurrency}
                </span>
              )}
            </div>
            <div className="mt-3 flex items-center gap-2 text-blue-400">
              Explore Job <ExternalLink size={16} />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
