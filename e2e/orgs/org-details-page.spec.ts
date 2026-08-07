import test, { expect, type Page } from '@playwright/test';

import { ORG_TEST_IDS } from '@/orgs/core/constants';

import {
  getFirstTwoOrgIds,
  navigateToOrgListPage,
  openMobileNavFromDetails,
  reloadToOrgDetails,
} from '../helpers';

test.beforeEach(async ({ page }) => {
  await page.goto('/organizations');
});

const assertDetailsLoaded = async (page: Page, id: string) => {
  await expect(page).toHaveURL(`/organizations/info/${id}`);
  await expect(page.getByRole('tablist')).toBeVisible();
};

test.describe('@mobile/@tablet', () => {
  test('should open details and return using mobile nav', async ({ page }) => {
    const [, id] = await getFirstTwoOrgIds(page);
    await reloadToOrgDetails(page, id);
    await assertDetailsLoaded(page, id);
    await openMobileNavFromDetails(page);
    await navigateToOrgListPage(page);
    await expect(page.getByTestId(ORG_TEST_IDS.ORG_CARD).first()).toBeVisible();
  });
});

test.describe('@desktop', () => {
  test('should open details and return using desktop nav', async ({ page }) => {
    const [, id] = await getFirstTwoOrgIds(page);
    await reloadToOrgDetails(page, id);
    await assertDetailsLoaded(page, id);
    await navigateToOrgListPage(page);
    await expect(page.getByTestId(ORG_TEST_IDS.ORG_CARD).first()).toBeVisible();
  });
});

test.describe('@mobile/@tablet/@desktop', () => {
  test('should navigate details tab links correctly', async ({ page }) => {
    const orgIds = await getFirstTwoOrgIds(page);

    for (const orgId of orgIds) {
      await reloadToOrgDetails(page, orgId);
      await assertDetailsLoaded(page, orgId);
      const links = page.getByRole('tablist').locator('a');
      const count = await links.count();
      for (let i = 0; i < count; i++) {
        const link = links.nth(i);
        const href = await link.getAttribute('href');
        expect(href).not.toBeNull();
        if (!href) continue;
        await link.click();
        await expect(page).toHaveURL(href);
      }
    }
  });
});
