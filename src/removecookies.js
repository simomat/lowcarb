import {getCookies} from './cookiestorage';
import {CookieFilter} from './domainfilter';
import {createDomainFromString} from './domain';
import {getWhitelistDomains} from './whitelistdomainstorage';

const toDomainObjects = pureDomains => pureDomains.map(createDomainFromString);
const getDomains = () =>
    getWhitelistDomains()
        .then(toDomainObjects);

const filterCookiesThatMatch = cookies => domains => new CookieFilter(domains).filterDomainNotMatches(cookies);
const filterMatchingDomains = cookies => getDomains().then(filterCookiesThatMatch(cookies));
const removeTheCookies = cookies => Promise.all(cookies.map(cookie => cookie.remove()));

export const removeCookies = () =>
    getCookies()
        .then(filterMatchingDomains)
        .then(removeTheCookies);