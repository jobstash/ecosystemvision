import { faker } from '@faker-js/faker';

import { fakeNullable } from '@/shared/testutils/fake-nullable';

import { Grantee } from '@/grants/core/schemas';

faker.seed(69);

export const fakeGrantee = (): Grantee => ({
  id: faker.string.uuid(),
  name: faker.company.name(),
  logo: fakeNullable(faker.image.url()),
  category: faker.commerce.department(),
  summary: faker.lorem.paragraph({ min: 3, max: 8 }),
  url: faker.internet.url(),
  lastFunding: faker.number.int({ min: 500_000, max: 200_000_000 }),
  fundingDate: faker.date.past(5).getTime(),
});
