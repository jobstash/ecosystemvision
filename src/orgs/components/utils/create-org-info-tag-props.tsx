import { OrgInfoTagProps } from '@/shared/core/schemas';
import { InfoTagProps } from '@/shared/core/types';
import { getWebsiteText } from '@/shared/utils/get-website-text';
import { LocationIcon } from '@/shared/components/icons/location-icon';
import { UsersThreeIcon } from '@/shared/components/icons/users-three-icon';

export const createOrgInfoTagProps = (props: OrgInfoTagProps) => {
  const { website, location, headcountEstimate } = props;

  const tags: InfoTagProps[] = [];

  if (website) {
    const { hostname, link } = getWebsiteText(website);
    tags.push({
      text: hostname,
      icon: null,
      link,
      showExternalIcon: true,
    });
  }

  if (location) {
    tags.push({
      text: location,
      icon: <LocationIcon />,
    });
  }

  if (headcountEstimate) {
    tags.push({
      text: `Employees: ${headcountEstimate}`,
      icon: <UsersThreeIcon />,
    });
  }

  return tags;
};
