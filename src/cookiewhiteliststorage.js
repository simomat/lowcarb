import {maybeOf} from 'wellmaybe';
import {getCookies} from './cookiestorage';
import {getWhitelistDomains, setWhitelistDomains} from "./whitelistdomainstorage";

function normalizeDomain(domain) {
    domain = domain.toLowerCase();
    if (domain.startsWith('.')) {
        domain = domain.substring(1, domain.length);
    }
    return domain;
}

const toListItem = isApplied =>
    domain => ({value: domain, isApplied: isApplied});

const addToMap = (map, item) => map.set(item.value, item);

function createListItems(cookies, whitelistDomains) {
    let itemMap = cookies
        .map(cookie => cookie.domain)
        .map(normalizeDomain)
        .map(toListItem(false))
        .reduce(addToMap, new Map());

    itemMap = whitelistDomains
        .map(normalizeDomain)
        .map(toListItem(true))
        .reduce(addToMap, itemMap);

    return Array.from(itemMap.values());
}

export const getDisplayItems = () =>
    getCookies()
        .then(cookies => getWhitelistDomains()
            .then(domains => createListItems(cookies, domains)));

export const setDisplayItems = items =>
    setWhitelistDomains(
        items
        .filter(item => item.isApplied)
        .map(item => item.value));
