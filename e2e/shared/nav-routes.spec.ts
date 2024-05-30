import test from '@playwright/test';

import { A11Y, HREFS } from '@/shared/core/constants';

import {
  assertNavLinksStatuses,
  assertPageUrl,
  clickNavButton,
  openMobileNav,
} from './helpers';

const pageLinks = [
  { name: A11Y.LINK.NAV.ORGS, href: HREFS.ORGS_PAGE },
  { name: A11Y.LINK.NAV.PROJECTS, href: HREFS.PROJECTS_PAGE },
];

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('@mobile', () => {
  for (const { name, href } of pageLinks) {
    test(`should navigate to ${href} using ${name} sidebar`, async ({
      page,
    }) => {
      await openMobileNav(page);
      await clickNavButton(page, name);
      await assertPageUrl(page, href);
      await openMobileNav(page);
      await assertNavLinksStatuses(page, name);
    });
  }
});

test.describe('@tablet/@desktop', () => {
  for (const { name, href } of pageLinks) {
    test(`should navigate to ${href} using ${name} sidebar`, async ({
      page,
    }) => {
      await clickNavButton(page, name);
      await assertPageUrl(page, href);
      await assertNavLinksStatuses(page, name);
    });
  }
});
