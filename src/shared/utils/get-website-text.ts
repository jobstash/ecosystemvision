export const getWebsiteText = (website: string) => {
  let link = '';
  let hostname = '';
  try {
    const isUrl = website.startsWith('http');
    const url = new URL(isUrl ? website : `https://${website}`);
    link = url.toString();
    hostname = url.hostname;
  } catch {
    /* no op */
  }
  return { link, hostname };
};
