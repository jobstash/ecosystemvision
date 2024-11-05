import { faker } from '@faker-js/faker';

import { fakeNullable } from '@/shared/testutils/fake-nullable';

import { Grantee, GranteeItem } from '@/grants/core/schemas';

import { fakeGranteeProject } from '@/grants/testutils/fake-grantee-project';

faker.seed(69);

export const fakeGrantee = (partial: Partial<Grantee> = {}): Grantee => ({
  id: faker.string.uuid(),
  slug: faker.internet.domainName(),
  status: '',
  tags: [],
  name: faker.company.name(),
  logoUrl: fakeNullable(faker.image.url()),
  description: faker.lorem.paragraph({ min: 3, max: 8 }),
  website: faker.internet.url(),
  lastFundingAmount: faker.number.int({ min: 500_000, max: 200_000_000 }),
  lastFundingUnit: 'USD',
  lastFundingDate: faker.date
    .past({ years: faker.number.int({ min: 2, max: 4 }) })
    .getTime(),
  projects: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(
    () => fakeGranteeProject(),
  ),
  ...partial,
});

export const fakeGranteeItem = (
  partial: Partial<GranteeItem> = {},
): GranteeItem => ({
  id: faker.string.uuid(),
  slug: faker.internet.domainName(),
  name: faker.company.name(),
  logoUrl: fakeNullable(faker.image.url()),
  lastFundingDate: faker.date
    .past({ years: faker.number.int({ min: 2, max: 4 }) })
    .getTime(),
  lastFundingAmount: faker.number.int({ min: 500_000, max: 200_000_000 }),
  lastFundingUnit: 'USD',
  ...partial,
});

export const fakeGrantees = ({
  length = 10,
  firstId,
}: { length?: number; firstId?: string } = {}): GranteeItem[] =>
  Array.from({ length }).map((_, index) => {
    const grantee = fakeGranteeItem();
    if (firstId && index === 0) {
      grantee.slug = firstId;
    }
    return grantee;
  });
