import { Maybe } from 'wellmaybe';

import { normalizeDomain } from '../domain';
import { getSyncStorage, setSyncStorage, getAllCookies } from '../webext';
import { domainCompare } from './domaincompare';

const toListItem = isApplied => name => ({ name, isApplied });

const addToMap = (map, domain) => map.set(domain.name, domain);

const sortModelItems = listElements => listElements.sort((a, b) => domainCompare(a.name, b.name));

function createListItems (cookies, whitelistDomains) {
  let itemMap = cookies
    .map(cookie => cookie.domain)
    .map(normalizeDomain)
    .map(toListItem(false))
    .reduce(addToMap, new Map());

  itemMap = whitelistDomains
    .map(normalizeDomain)
    .map(toListItem(true))
    .reduce(addToMap, itemMap);

  const domains = Array.from(itemMap.values());
  return sortModelItems(domains);
}

export const getDomains = () => Maybe.all(
  getAllCookies(),
  getSyncStorage({ whitelistDomains: [] })
    .map(storage => storage.whitelistDomains)
    .map(domainNames => Array.from(new Set(domainNames)))
)
  .map(results => createListItems(...results))
  .asPromise();

export const mutateStoredWhitelistDomains = mutator =>
  getSyncStorage({ whitelistDomains: [] })
    .map(storage => {
      const whitelistDomains = new Set(storage.whitelistDomains);
      mutator(whitelistDomains);
      return setSyncStorage({ whitelistDomains: Array.from(whitelistDomains) });
    })
    .asPromise();
