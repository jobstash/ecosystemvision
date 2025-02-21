import { GranteeDetails, GranteeDto } from '@/grants/core/schemas';
import { dtoToGranteeItem } from '@/grants/utils/dto-to-grantee-item';

export const dtoToGranteeDetails = (dto: GranteeDto): GranteeDetails => {
  return {
    ...dtoToGranteeItem(dto),
    tags: dto.projects.flatMap((project) => project.tags),
    website: dto.website,
    status: dto.status,
    description: dto.description,
    projects: dto.projects,
  };
};
