import slugify from 'slugify';

export const normalizeString = (original: string): string =>
  slugify(original, { lower: true });

export const denormalizeString = (normalized: string): string => {
  const stringToCharMap: Record<string, string> = {
    _bang_: '!',
    _at_: '@',
    _hash_: '#',
    _dollar_: '$',
    _percent_: '%',
    _comma_: ',',
    _caret_: '^',
    _and_: '&',
    _asterisk_: '*',
    _lparen_: '(',
    _rparen_: ')',
    _langle_: '<',
    _rangle_: '>',
    _hyphen_: '-',
    _plus_: '+',
    _equals_: '=',
  };

  // First, split by hyphens (which replaced spaces in normalization)
  let denormalized = normalized.split('-').join(' ');

  // Replace all normalized special character strings with their original characters
  Object.entries(stringToCharMap).forEach(([normalizedStr, originalChar]) => {
    denormalized = denormalized.replaceAll(normalizedStr, originalChar);
  });

  return denormalized;
};
