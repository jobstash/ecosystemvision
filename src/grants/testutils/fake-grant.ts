import { faker } from '@faker-js/faker';

import { capitalize } from '@/shared/utils/capitalize';

import { fakeNullable } from '@/shared/testutils/fake-nullable';

import { Grant } from '@/grants/core/schemas';

export const fakeGrant = (): Grant => ({
  id: faker.string.uuid(),
  name: faker.company.name(),
  networks: Array.from({ length: faker.number.int({ min: 0, max: 4 }) }).map(
    () => ({
      name: capitalize(faker.company.buzzNoun()),
      logo: fakeNullable(faker.image.url()),
    }),
  ),
  ecosystem: capitalize(faker.company.buzzNoun()),
  totalFunds: faker.number.int({ min: 500_000, max: 200_000_000 }),
  totalDisbursedFunds: faker.number.int({ min: 500_000, max: 10_000_000 }),
  summary: faker.lorem.paragraph({ min: 3, max: 8 }),
  categories: Array.from({ length: faker.number.int({ min: 1, max: 6 }) }).map(
    () => faker.commerce.department(),
  ),
  type: faker.lorem.words({ min: 1, max: 2 }),
  reputations: Array.from({
    length: faker.number.int({ min: 2, max: 10 }),
  }).map(() => ({
    text: `${faker.lorem.words(faker.number.int({ min: 1, max: 3 }))}`,
    logo: faker.image.urlPicsumPhotos(),
  })),
  logo: fakeNullable(faker.image.url()),
  url: faker.internet.url(),
  twitter: fakeNullable(
    `https://x.com/${faker.internet.userName().toLocaleLowerCase()}`,
  ),
  discord: fakeNullable(
    `https://discord.com/${faker.internet.userName().toLocaleLowerCase()}`,
  ),
  granteesCount: faker.number.int({ min: 1, max: 100 }),
});
