import { getWebsiteText } from './get-website-text';

const getGoogleLogoUrl = (url: string) => {
  const { link } = getWebsiteText(url);
  return link ? `https://www.google.com/s2/favicons?domain=${link}&sz=128` : '';
};

export const getLogoUrl = (url: string, logo?: string | null) => {
  if (!url && !logo) return '';

  // Ignore Twitter shortened URLs
  const sanitizedUrl = url.startsWith('https://t.co') ? '' : url;

  return getGoogleLogoUrl(logo ?? sanitizedUrl);
};
