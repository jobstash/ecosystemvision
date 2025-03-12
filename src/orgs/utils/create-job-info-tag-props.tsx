import { JobInfoTags, jobInfoTagsSchema } from '@/shared/core/schemas';
import { EnabledTagsConfig, InfoTagProps } from '@/shared/core/types';
import { createLocationText } from '@/shared/utils/create-location-text';
import { createSalaryText } from '@/shared/utils/create-salary-text-';
import { createSeniorityText } from '@/shared/utils/create-seniority-text';
import { getEnabledTagsConfig } from '@/shared/utils/get-enabled-tags-config';
import { getTitleCase } from '@/shared/utils/get-title-case';
import { CategoryIcon } from '@/shared/components/icons/category-icon';
import { LocationIcon } from '@/shared/components/icons/location-icon';
import MoneyIcon from '@/shared/components/icons/money-icon';
import { SalaryIcon } from '@/shared/components/icons/salary-icon';
import { SeniorityIcon } from '@/shared/components/icons/seniority-icon';
import { SuitcaseIcon } from '@/shared/components/icons/suitcase-icon';

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
  const commitmentText = getTitleCase(commitment);
  if (commitment && enabledTagsConfig.commitment) {
    tags.push({
      text: commitmentText,
      icon: <SuitcaseIcon />,
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
      icon: <MoneyIcon />,
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
  const classificationText = getTitleCase(classification);
  if (classification && enabledTagsConfig.classification) {
    tags.push({
      text: `Category: ${classificationText}`,
      icon: <CategoryIcon />,
    });
  }

  return tags;
};
