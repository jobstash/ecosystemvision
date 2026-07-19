import { getWebsiteText } from './get-website-text';

const getGoogleLogoUrl = (url: string) => {
  const { hostname } = getWebsiteText(url);
  return hostname
    ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostname)}&sz=128`
    : '';
};

export const getLogoUrl = (url: string | null, logo?: string | null) => {
  if (!url && !logo) return '';

  // Ignore Twitter shortened URLs
  const sanitizedUrl = url?.startsWith('https://t.co') ? '' : (url ?? '');

  return getGoogleLogoUrl(sanitizedUrl || logo || '');
};
