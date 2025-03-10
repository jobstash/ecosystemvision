import { Briefcase } from 'lucide-react';

import { JobInfoTags, jobInfoTagsSchema } from '@/shared/core/schemas';
import { EnabledTagsConfig, InfoTagProps } from '@/shared/core/types';
import { createLocationText } from '@/shared/utils/create-location-text';
import { createSalaryText } from '@/shared/utils/create-salary-text-';
import { createSeniorityText } from '@/shared/utils/create-seniority-text';
import { getEnabledTagsConfig } from '@/shared/utils/get-enabled-tags-config';
import { LocationIcon } from '@/shared/components/icons/location-icon';
import { SalaryIcon } from '@/shared/components/icons/salary-icon';
import { SeniorityIcon } from '@/shared/components/icons/seniority-icon';

export const createOrgInfoTagProps = (
  jobInfoTags: JobInfoTags,
  config?: EnabledTagsConfig<JobInfoTags>,
): InfoTagProps[] => {
  const parsedTags = jobInfoTagsSchema.parse(jobInfoTags); // ✅ Validate with Zod schema

  const {
    location,
    locationType,
    commitment,
    salary,
    minimumSalary,
    maximumSalary,
    salaryCurrency,
    seniority,
    paysInCrypto,
    offersTokenAllocation,
    classification,
  } = parsedTags;

  // ✅ Ensure tags respect enabled config
  const enabledTagsConfig = getEnabledTagsConfig(parsedTags, config);
  const tags: InfoTagProps[] = [];

  if (location && enabledTagsConfig.location) {
    tags.push({
      text: createLocationText(location, locationType) ?? '',
      icon: <LocationIcon />,
    });
  }

  if (commitment && enabledTagsConfig.commitment) {
    tags.push({
      text: commitment,
      icon: <Briefcase />,
    });
  }

  const salaryText = createSalaryText({
    salary,
    minimumSalary,
    maximumSalary,
    salaryCurrency,
  });
  if (salaryText && enabledTagsConfig.salary) {
    tags.push({
      text: salaryText,
      icon: <SalaryIcon />,
    });
  }

  const seniorityText = createSeniorityText(seniority);
  if (seniorityText && enabledTagsConfig.seniority) {
    tags.push({
      text: seniorityText,
      icon: <SeniorityIcon />,
    });
  }

  if (paysInCrypto && enabledTagsConfig.paysInCrypto) {
    tags.push({
      text: 'Pays in Crypto',
      icon: <SalaryIcon />,
    });
  }

  if (offersTokenAllocation && enabledTagsConfig.offersTokenAllocation) {
    tags.push({
      text: 'Offers Token Allocation',
      icon: <SalaryIcon />,
    });
  }

  if (classification && enabledTagsConfig.classification) {
    tags.push({
      text: `Classification: ${classification}`,
      icon: <Briefcase />,
    });
  }

  return tags;
};
