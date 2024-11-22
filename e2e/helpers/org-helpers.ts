import { expect, Page } from '@playwright/test';

import { A11Y, HREFS, TEST_IDS } from '@/shared/core/constants';

import { ORG_TEST_IDS } from '@/orgs/core/constants';

import { getRandomInt } from './common-helpers';
import { getNavLocator } from './nav-helpers';

export const navigateToOrgDetails = async (page: Page, n: number) => {
  const card = page.getByTestId(ORG_TEST_IDS.ORG_CARD).nth(n);
  const uuid = await card.getAttribute('data-uuid');

  // Click on the upper right corner (ensure buttons w/in the card is not clicked)
  await card.click({ position: { x: 10, y: 10 } });

  await expect(page).toHaveURL(`/organizations/names/${uuid}/details`);
};

export const navigateBackToOrgListPage = async (page: Page) => {
  // Assert mobile/tablet devices are currently on details-page
  await expect(page).toHaveURL(/\/organizations\/names\/[^/]+\/details/);

  // Click back button
  await page.getByTestId(TEST_IDS.DETAILS_BACK).last().click();

  // Assert currently on org-list page
  await expect(page).toHaveURL(HREFS.ORGS_PAGE);
};

export const navigateToOrgListPage = async (page: Page) => {
  await getNavLocator(page, A11Y.LINK.NAV.ORGS).click();
  await expect(page).toHaveURL(HREFS.ORGS_PAGE);
};

export const getOrgCardId = async (page: Page, n: number) => {
  const id = await page
    .getByTestId(ORG_TEST_IDS.ORG_CARD)
    .nth(n)
    .getAttribute('data-uuid');

  expect(id).not.toBeNull();

  return id as string;
};

export const getFirstTwoOrgIds = async (page: Page) => {
  const id1 = await getOrgCardId(page, 0);
  const id2 = await getOrgCardId(page, 1);
  return [id1, id2];
};

export const reloadToOrgDetails = (page: Page, id: string) =>
  page.goto(`/organizations/names/${id}/details`);

export const assertOrgCardsSwapped = async (
  page: Page,
  id1: string,
  id2: string,
) => {
  const [firstId, secondId] = await getFirstTwoOrgIds(page);
  expect(firstId).toBe(id2);
  expect(secondId).toBe(id1);
};

export const assertOrgListDeduped = async (
  page: Page,
  idToExclude: string,
): Promise<void> => {
  const allCards = await page.getByTestId(ORG_TEST_IDS.ORG_CARD).all();
  const cardIds = await Promise.all(
    allCards
      .slice(1) // Exclude init card
      .map(async (card) => await card.getAttribute('data-uuid')),
  );

  expect(cardIds.indexOf(idToExclude)).toBe(-1);
};

export const clickOrgCardExceptFirstTwo = async (page: Page) => {
  const allCards = await page.getByTestId(ORG_TEST_IDS.ORG_CARD).all();
  const [min, max] = [0, allCards.length - 3];
  await allCards.splice(2)[getRandomInt(min, max)].click();
};
