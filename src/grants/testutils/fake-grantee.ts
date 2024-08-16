import { faker } from '@faker-js/faker';

import { fakeNullable } from '@/shared/testutils/fake-nullable';

import { Grantee, GranteeItem } from '@/grants/core/schemas';

export const fakeGrantee = (partial: Partial<Grantee> = {}): Grantee => ({
  id: faker.string.uuid(),
  name: faker.company.name(),
  logo: fakeNullable(faker.image.url()),
  category: faker.commerce.department(),
  summary: faker.lorem.paragraph({ min: 3, max: 8 }),
  url: faker.internet.url(),
  lastFunding: faker.number.int({ min: 500_000, max: 200_000_000 }),
  fundingDate: faker.date
    .past({ years: faker.number.int({ min: 2, max: 4 }) })
    .getTime(),
  projects: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(
    () => faker.internet.domainWord(),
  ),
  ...partial,
});

export const fakeGranteeItem = (
  partial: Partial<GranteeItem> = {},
): GranteeItem => ({
  id: faker.string.uuid(),
  name: faker.company.name(),
  logoUrl: fakeNullable(faker.image.url()),
  lastFundingDate: faker.date
    .past({ years: faker.number.int({ min: 2, max: 4 }) })
    .getTime(),
  lastFundingAmount: faker.number.int({ min: 500_000, max: 200_000_000 }),
  ...partial,
});

export const fakeGrantees = ({
  length = 10,
  firstId,
}: { length?: number; firstId?: string } = {}): GranteeItem[] =>
  Array.from({ length }).map((_, index) => {
    const grantee = fakeGranteeItem();
    if (firstId && index === 0) {
      grantee.id = firstId;
    }
    return grantee;
  });
