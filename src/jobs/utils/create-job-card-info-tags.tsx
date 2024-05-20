import { JobInfoTags } from '@/shared/core/schemas';
import { InfoTagProps } from '@/shared/core/types';
import { capitalize } from '@/shared/utils/capitalize';
import { createCommonInfoTagText } from '@/shared/utils/create-common-info-tag-text';
import { createLocationText } from '@/shared/utils/create-location-text';
import { createSalaryText } from '@/shared/utils/create-salary-text-';
import { createSeniorityText } from '@/shared/utils/create-seniority-text';
import { CategoryIcon } from '@/shared/components/icons/category-icon';
import { EthereumIcon } from '@/shared/components/icons/ethereum-icon';
import { LocationIcon } from '@/shared/components/icons/location-icon';
import { LocationTypeIcon } from '@/shared/components/icons/location-type-icon';
import { PaperbillIcon } from '@/shared/components/icons/paperbill-icon';
import { SeniorityIcon } from '@/shared/components/icons/seniority-icon';
import { SuitcaseIcon } from '@/shared/components/icons/suitcase-icon';
import { TokenAllocationIcon } from '@/shared/components/icons/token-allocation-icon';

export const createJobCardInfoTags = (job: JobInfoTags) => {
  const tags: InfoTagProps[] = [];

  const seniorityText = createSeniorityText(job.seniority);
  if (seniorityText) {
    tags.push({
      text: seniorityText,
      icon: <SeniorityIcon />,
    });
  }

  const salaryText = createSalaryText(job);
  if (salaryText) {
    tags.push({
      text: `Salary: ${job.salaryCurrency} ${salaryText}`,
      icon: <PaperbillIcon />,
    });
  }

  if (job.locationType) {
    tags.push({
      text: capitalize(job.locationType, true),
      icon: <LocationTypeIcon />,
    });
  }

  const location = createLocationText(job.location, job.locationType);
  if (location) {
    tags.push({
      text: capitalize(location),
      icon: <LocationIcon />,
    });
  }

  const commitment = createCommonInfoTagText(job.commitment);
  if (commitment) {
    tags.push({
      text: capitalize(commitment),
      icon: <SuitcaseIcon />,
    });
  }

  if (job.paysInCrypto) {
    tags.push({
      text: 'Pays in Crypto',
      icon: <EthereumIcon />,
    });
  }

  if (job.offersTokenAllocation) {
    tags.push({
      text: 'Offers Token Allocation',
      icon: <TokenAllocationIcon />,
    });
  }

  const classification = createCommonInfoTagText(job.classification);
  if (classification) {
    tags.push({
      text: classification,
      icon: <CategoryIcon />,
    });
  }

  return tags;
};
