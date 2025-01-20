import { MW_URL } from '@/shared/core/envs';
import { mwGET } from '@/shared/utils/mw-get';

import {
  dtoToSearchResults,
  searchResultsDtoSchema,
} from '@/search/core/schemas';
import { PillarNav } from '@/search/core/types';

interface Options {
  query: string;
  nav?: PillarNav;
  excluded?: string;
}

// const dummy = {
//   projects: {
//     names: [
//       {
//         value: 'Sound.xyz',
//         link: '/projects/names/soundxyz',
//       },
//       {
//         value: 'Your Brians',
//         link: '/projects/names/your-brians',
//       },
//       {
//         value: 'Slugs',
//         link: '/projects/names/slugs',
//       },
//       {
//         value: 'West African Ambassadors (WAA)',
//         link: '/projects/names/west-african-ambassadors-waa',
//       },
//       {
//         value: 'tip me - the global tip',
//         link: '/projects/names/tip-me-the-global-tip',
//       },
//       {
//         value: 'CommuniDAO - A NFT Member DAO',
//         link: '/projects/names/communidao-a-nft-member-dao',
//       },
//       {
//         value: 'triiyo',
//         link: '/projects/names/triiyo',
//       },
//       {
//         value: 'StellarGPT',
//         link: '/projects/names/stellargpt',
//       },
//       {
//         value: 'Walletban',
//         link: '/projects/names/walletban',
//       },
//       {
//         value: 'Storehouse Gold to Stellar',
//         link: '/projects/names/storehouse-gold-to-stellar',
//       },
//     ],
//     categories: [
//       {
//         value: 'Dexes',
//         link: '/projects/categories/dexes',
//       },
//       {
//         value: 'Uncategorized',
//         link: '/projects/categories/uncategorized',
//       },
//     ],
//     tags: [
//       {
//         value: 'Leadership',
//         link: '/projects/tags/leadership',
//       },
//       {
//         value: 'product management',
//         link: '/projects/tags/product-management',
//       },
//       {
//         value: 'blockchain',
//         link: '/projects/tags/blockchain',
//       },
//       {
//         value: 'Typescript',
//         link: '/projects/tags/typescript',
//       },
//       {
//         value: 'communication',
//         link: '/projects/tags/communication',
//       },
//       {
//         value: 'Github',
//         link: '/projects/tags/github',
//       },
//       {
//         value: 'cryptocurrency',
//         link: '/projects/tags/cryptocurrency',
//       },
//       {
//         value: 'ZK proving system',
//         link: '/projects/tags/zk-proving-system',
//       },
//       {
//         value: 'Roadmap',
//         link: '/projects/tags/roadmap',
//       },
//       {
//         value: 'agile',
//         link: '/projects/tags/agile',
//       },
//     ],
//     chains: [],
//     investors: [],
//   },
// };

// export const search = async () => {
export const search = async ({ query, nav, excluded }: Options) => {
  // return dtoToSearchResults(dummy);

  const url = new URL(`${MW_URL}/search`);
  if (query) url.searchParams.append('query', query);
  if (nav) url.searchParams.append('nav', nav);
  if (excluded) url.searchParams.append('excluded', excluded);

  const response = await mwGET({
    url: url.toString(),
    label: 'search',
    responseSchema: searchResultsDtoSchema,
  });

  return dtoToSearchResults(response);
};
