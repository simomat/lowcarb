import {Maybe} from 'wellmaybe';
import {getWhitelistDomains, setWhitelistDomains} from './whitelist';
import {normalizeDomain} from './domain';
import {getAllCookies} from './webext';
import {removeDuplicates} from './utils';

const toListItem = isApplied => value => ({value, isApplied});

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
    Maybe.all(getAllCookies(), getWhitelistDomains())
        .map(cookiesAndWhitelistDomains => createListItems(...cookiesAndWhitelistDomains));

const extractWhitelistDomains = items => items
    .filter(item => item.isApplied)
    .map(item => item.value);

export const setDisplayItems = items => items
    .map(extractWhitelistDomains)
    .map(removeDuplicates)
    .map(setWhitelistDomains);