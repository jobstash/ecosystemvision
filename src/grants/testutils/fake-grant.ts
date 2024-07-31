import { Grant } from '@/grants/core/types';

export const fakeGrant: Grant = {
  id: 'thank-arb',
  name: 'ThankArb Grant Program',
  grantees: 17,
  networks: [
    {
      name: 'Ethereum',
      logo: null,
    },
    {
      name: 'Solana',
      logo: null,
    },
  ],
  ecosystem: 'Solana',
  totalFunds: 17_000_000,
  totalDisbursedFunds: 17_000_000,
  summary:
    'The 01 Exchange grants program, in collaboration with the Solana Foundation, is open to everyone in the community and provides on-going opportunities to contribute to the 01 and Solana ecosystem.',
  categories: ['DEX', 'Communities', 'Reasearch', 'DeFi'],
  type: 'Direct Grants',
  reputations: [
    '🎯 Clear Goal',
    '✨ Smooth Application',
    '⚖️ Fair Rounds',
    '🛠 Easy Tech',
    '🤝 Supportive Team',
    '🏆 Great Reviewers',
    '💰 Fast Disbursement',
  ],
  logo: null,
  url: 'https://www.arbitrumhub.io/grant-hub/thrive/grants/thank-arb/',
  twitter: 'https://x.com/arbitrumdao_hub',
  discord: 'https://discord.com/',
};
