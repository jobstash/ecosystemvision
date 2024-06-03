import { expect, Locator, Page } from '@playwright/test';

export const assertPageUrl = async (page: Page, url: string) =>
  expect(page).toHaveURL(url);

export const assertActiveAttribute = async (
  locator: Locator,
  isActive: boolean,
) => expect(locator).toHaveAttribute('data-active', isActive.toString());

export const assertInitCardNotVisible = async (page: Page) => {
  await expect(page.locator('[data-is-init="true"]')).toBeHidden();
};

export const assertInitCard = async (
  page: Page,
  expectedId: string,
): Promise<void> => {
  const initCard = page.locator('[data-is-init="true"]').first();
  await expect(initCard).toBeVisible();
  await expect(initCard).toHaveAttribute('data-uuid', expectedId);
};

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
