export const normalize = word => {
  if (typeof word !== 'string') return word;
  word = word
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  return word;
};

export const toAccentInsensitive = strRegex =>
  strRegex
    .replace(/a/g, '[aá]')
    .replace(/e/g, '[eé]')
    .replace(/i/g, '[ií]')
    .replace(/o/g, '[oó]')
    .replace(/u/g, '[uú]');
