import regexEscape from 'escape-string-regexp';

export const normalizeDomain = domain => {
  domain = domain.toLowerCase();
  if (domain.startsWith('.')) {
    return domain.substr(1);
  }
  return domain;
};

/* eslint-disable-next-line no-useless-escape */
export const toDomainMatcher = domain => new RegExp('^\.?' + regexEscape(domain) + '$', 'i');
