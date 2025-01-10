import slugify from 'slugify';
import { transliterate } from 'transliteration';

export const normalizeString = (str: string | null | undefined): string => {
  if (str === null || str === undefined) return '';
  const transliterated = transliterate(str);
  const slug = slugify(transliterated, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
    strict: true,
  });
  if (slug === '') {
    return str.trim().toLowerCase();
  } else {
    return slug;
  }
};

export const denormalizeString = (slug: string) => {
  const spaced = slug.replace(new RegExp('-', 'g'), ' ');

  const capitalized = spaced
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return capitalized;
};
