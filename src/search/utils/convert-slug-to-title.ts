export const convertSlugToTitle = (slug: string) =>
  slug
    .replace(/-/g, ' ') // Replace hyphens with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase());
