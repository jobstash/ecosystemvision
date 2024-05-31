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
