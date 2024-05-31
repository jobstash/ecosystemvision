import { test } from '@playwright/test';

import { A11Y, HREFS } from '@/shared/core/constants';

import {
  assertInitCardNotVisible,
  assertNavLinksStatuses,
  navigateBackToOrgListPage,
  navigateToOrgDetails,
  navigateToOrgListPage,
  openMobileNavFromDetails,
} from '../helpers';

const CARD_NUM = 5;
const cardNths = Array.from({ length: CARD_NUM }).map((_, i) => i);

test.beforeEach(async ({ page }) => {
  await page.goto(HREFS.ORGS_PAGE);
});

test.describe('@mobile', () => {
  test('should navigate seamlessly when clicking cards', async ({ page }) => {
    await assertInitCardNotVisible(page);
    for (const n of cardNths) {
      await navigateToOrgDetails(page, n);
      await navigateBackToOrgListPage(page);
    }
  });

  test('should render correctly when changing cards then clicking nav', async ({
    page,
  }) => {
    await assertInitCardNotVisible(page);

    for (const n of cardNths) {
      await navigateToOrgDetails(page, n);
      await openMobileNavFromDetails(page);
      await navigateToOrgListPage(page);
    }
  });
});

test.describe('@tablet', () => {
  test('should navigate seamlessly when clicking cards', async ({ page }) => {
    await assertInitCardNotVisible(page);
    await assertNavLinksStatuses(page, A11Y.LINK.NAV.ORGS);
    for (const n of cardNths) {
      await navigateToOrgDetails(page, n);
      await assertNavLinksStatuses(page, A11Y.LINK.NAV.ORGS);

      await navigateBackToOrgListPage(page);
      await assertNavLinksStatuses(page, A11Y.LINK.NAV.ORGS);
    }
  });
});

test.describe('@desktop', () => {
  test('should navigate seamlessly when clicking cards', async ({ page }) => {
    await assertInitCardNotVisible(page);
    await assertNavLinksStatuses(page, A11Y.LINK.NAV.ORGS);
    for (const n of cardNths) {
      await navigateToOrgDetails(page, n);
      await assertNavLinksStatuses(page, A11Y.LINK.NAV.ORGS);
    }
  });
});

test.describe('@tablet/@desktop', () => {
  test('should render correctly when changing cards then clicking nav', async ({
    page,
  }) => {
    await assertInitCardNotVisible(page);
    await assertNavLinksStatuses(page, A11Y.LINK.NAV.ORGS);

    for (const n of cardNths) {
      await navigateToOrgDetails(page, n);
      await assertNavLinksStatuses(page, A11Y.LINK.NAV.ORGS);

      await navigateToOrgListPage(page);
      await assertNavLinksStatuses(page, A11Y.LINK.NAV.ORGS);
    }
  });
});
