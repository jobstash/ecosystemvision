import { faker } from '@faker-js/faker';

faker.seed(420);

export const fakePillarItems = (): string[] => {
  return Array.from({ length: 20 }).map(() =>
    faker.lorem.words({ min: 1, max: 2 }),
  );
};
