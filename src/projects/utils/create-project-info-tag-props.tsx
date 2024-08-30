import { ProjectInfo, ProjectInfoTags } from '@/shared/core/schemas';
import { EnabledTagsConfig, InfoTagProps } from '@/shared/core/types';
import { formatNumber } from '@/shared/utils/format-number';
import { getEnabledTagsConfig } from '@/shared/utils/get-enabled-tags-config';
import { ActiveUsersIcon } from '@/shared/components/icons/active-users-icon';
import { CategoryIcon } from '@/shared/components/icons/category-icon';
import { MonthlyVolumeIcon } from '@/shared/components/icons/monthly-volume-icon';
import { RevenueIcon } from '@/shared/components/icons/revenue-icon';
import { TvlIcon } from '@/shared/components/icons/tvl-icon';

export const createProjectInfoTagProps = (
  projectInfoTags: ProjectInfoTags,
  config?: EnabledTagsConfig<ProjectInfo>,
) => {
  const {
    category,
    tvl,
    monthlyVolume,
    monthlyActiveUsers,
    monthlyFees,
    monthlyRevenue,
  } = projectInfoTags;

  const enabledTagsConfig = getEnabledTagsConfig(projectInfoTags, config);

  const tags: InfoTagProps[] = [];

  if (category && enabledTagsConfig.category) {
    tags.push({
      text: `Category: ${category}`,
      icon: <CategoryIcon />,
    });
  }

  if (tvl && enabledTagsConfig.tvl) {
    tags.push({
      text: `TVL: $${formatNumber(tvl)}`,
      icon: <TvlIcon />,
    });
  }

  if (monthlyVolume) {
    tags.push({
      text: `Monthly Volume: $${formatNumber(monthlyVolume)}`,
      icon: <MonthlyVolumeIcon />,
    });
  }

  if (monthlyFees && enabledTagsConfig.monthlyFees) {
    tags.push({
      text: `Monthly Fees: $${formatNumber(monthlyFees)}`,
      icon: <MonthlyVolumeIcon />,
    });
  }

  if (monthlyRevenue) {
    tags.push({
      text: `Revenue: $${formatNumber(monthlyRevenue)}`,
      icon: <RevenueIcon />,
    });
  }

  if (monthlyActiveUsers) {
    tags.push({
      text: `Active Users: ${formatNumber(monthlyActiveUsers)}`,
      icon: <ActiveUsersIcon />,
    });
  }

  return tags;
};
