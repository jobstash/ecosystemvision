import { Page } from '@playwright/test';

import { A11Y, TEST_IDS } from '@/shared/core/constants';

import { assertActiveAttribute } from './common-helpers';

export const getNavLocator = (page: Page, name: string) => {
  return page
    .locator(`[data-testid="${TEST_IDS.NAV_SECTION}"]:visible`)
    .getByRole('button', { name, exact: true });
};

export const clickNavButton = async (page: Page, name: string) =>
  getNavLocator(page, name).click();

// Asserts link-name is active
export const assertNavActiveStatus = async (
  page: Page,
  name: string,
  isActive: boolean,
) => assertActiveAttribute(getNavLocator(page, name), isActive);

// Asserts link-name provided is active while the rest are inactive
export const assertNavLinksStatuses = async (
  page: Page,
  activeLinkName: string,
) => {
  const inactiveLinkNames = Object.values(A11Y.LINK.NAV).filter(
    (linkName) => linkName !== activeLinkName,
  );

  await Promise.all([
    // Assert active link
    assertNavActiveStatus(page, activeLinkName, true),
    // Assert inactive links
    ...inactiveLinkNames.map((inactiveLinkName) =>
      assertNavActiveStatus(page, inactiveLinkName, false),
    ),
  ]);
};

const clickVisibleMobileMenu = async (page: Page) => {
  const configuredMenu = page.locator(
    `[data-testid="${TEST_IDS.MOBILE_MENU}"]:visible`,
  );
  if ((await configuredMenu.count()) > 0) {
    // Route transitions can briefly retain the previous fixed header. The
    // newest header is painted last and is the one users can actually click.
    await configuredMenu.last().click();
    return;
  }
  await page
    .locator('div.fixed.top-0.z-50')
    .locator('button:visible')
    .last()
    .click({ force: true });
};

export const openMobileNav = clickVisibleMobileMenu;

export const openMobileNavFromDetails = clickVisibleMobileMenu;
