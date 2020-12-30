export const normalize = word => {
  if (typeof word !== 'string') return word;
  const w = word
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  let result = '';
  for (let k = 0; k < w.length; k += 1) if (w[k - 1] !== w[k]) result += w[k];

  return result;
};

export const toAccentInsensitive = strRegex =>
  strRegex
    .replace(/a/g, '[aá]')
    .replace(/e/g, '[eé]')
    .replace(/i/g, '[ií]')
    .replace(/o/g, '[oó]')
    .replace(/u/g, '[uú]');
