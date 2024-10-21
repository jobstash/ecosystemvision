import test, { expect } from '@playwright/test';

import { TEST_IDS } from '@/shared/core/constants';

import {
  assertInitCard,
  assertOrgCardsSwapped,
  assertOrgListDeduped,
  clickOrgCardExceptFirstTwo,
  getFirstTwoOrgIds,
  navigateBackToOrgListPage,
  navigateToOrgListPage,
  openMobileNavFromDetails,
  reloadToOrgDetails,
} from '../helpers';

test.beforeEach(async ({ page }) => {
  await page.goto('/organizations');
});

test.describe('@mobile/@tablet', () => {
  test('should render init-card correctly using nav', async ({ page }) => {
    const [id1, id2] = await getFirstTwoOrgIds(page);

    await reloadToOrgDetails(page, id2);

    await openMobileNavFromDetails(page);
    await navigateToOrgListPage(page);
    await assertInitCard(page, id2);
    await assertOrgCardsSwapped(page, id1, id2);
    await assertOrgListDeduped(page, id2);

    await clickOrgCardExceptFirstTwo(page);
    await openMobileNavFromDetails(page);
    await navigateToOrgListPage(page);
    await assertInitCard(page, id2);
  });
});

test.describe('@desktop', () => {
  test('should render init-card correctly', async ({ page }) => {
    const [id1, id2] = await getFirstTwoOrgIds(page);
    await reloadToOrgDetails(page, id2);
    await assertInitCard(page, id2);
    await assertOrgCardsSwapped(page, id1, id2);
    await assertOrgListDeduped(page, id2);
    await clickOrgCardExceptFirstTwo(page);
    await assertInitCard(page, id2);
  });
});

test.describe('@mobile/@tablet', () => {
  test('should render init-card correctly', async ({ page }) => {
    const [id1, id2] = await getFirstTwoOrgIds(page);
    await reloadToOrgDetails(page, id2);
    await navigateBackToOrgListPage(page);
    await assertInitCard(page, id2);
    await assertOrgCardsSwapped(page, id1, id2);
    await assertOrgListDeduped(page, id2);
    await clickOrgCardExceptFirstTwo(page);
    await navigateBackToOrgListPage(page);
    await assertInitCard(page, id2);
  });
});

test.describe('@desktop', () => {
  test('should render init-card correctly using nav', async ({ page }) => {
    const [id1, id2] = await getFirstTwoOrgIds(page);

    await reloadToOrgDetails(page, id2);

    await navigateToOrgListPage(page);
    await assertInitCard(page, id2);
    await assertOrgCardsSwapped(page, id1, id2);
    await assertOrgListDeduped(page, id2);

    await clickOrgCardExceptFirstTwo(page);
    await navigateToOrgListPage(page);
    await assertInitCard(page, id2);
  });
});

test.describe('@mobile/@desktop/@mobile', () => {
  test('should navigate details tab links correctly', async ({ page }) => {
    const orgIds = await getFirstTwoOrgIds(page);

    for (const orgId of orgIds) {
      await reloadToOrgDetails(page, orgId);
      const links = page.getByTestId(TEST_IDS.DETAILS_PANEL_TABS).locator('a');
      const count = await links.count();
      for (let i = 0; i < count; i++) {
        const link = links.nth(i);
        const href = (await link.getAttribute('href')) as string;
        await link.click();
        await expect(page).toHaveURL(href);
      }
    }
  });
});
