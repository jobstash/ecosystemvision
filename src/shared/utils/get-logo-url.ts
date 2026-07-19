import { getWebsiteText } from './get-website-text';

const isBlockedAssetHost = (hostname: string) => {
  const normalizedHostname = hostname
    .toLowerCase()
    .replace(/^www\./, '')
    .replaceAll('-', '');

  return (
    normalizedHostname === 'cryptofundraising.info' ||
    normalizedHostname.endsWith('.cryptofundraising.info')
  );
};

const getGoogleLogoUrl = (url: string) => {
  const { hostname } = getWebsiteText(url);
  return hostname && !isBlockedAssetHost(hostname)
    ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostname)}&sz=128`
    : '';
};

export const getLogoUrl = (url: string | null, _logo?: string | null) => {
  if (!url) return '';

  // Ignore Twitter shortened URLs
  const sanitizedUrl = url?.startsWith('https://t.co') ? '' : (url ?? '');

  // Logos are always resolved from the entity's own website. In particular,
  // never turn third-party crypto-fundraising asset URLs into site favicons.
  return getGoogleLogoUrl(sanitizedUrl);
};
