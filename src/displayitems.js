import {getWhitelistDomains, setWhitelistDomains} from './whitelistdomainstorage';
import {normalizeDomain} from './domain';
import {getAllCookies} from './webext';

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
    getAllCookies()
        .map(cookies => getWhitelistDomains()
            .map(whitelistDomain => createListItems(cookies, whitelistDomain)));

const extractWhitelistDomains = items => items
    .filter(item => item.isApplied)
    .map(item => item.value);

export const setDisplayItems = items => items
    .map(extractWhitelistDomains)
    .map(setWhitelistDomains);