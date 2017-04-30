import {getWhitelistDomains} from './whitelistdomainstorage';
import {toRemoveParameter} from './cookie';
import {getAllCookies, removeCookie} from './webext';
import {toDomainMatcher} from './domain';

const toDomainMatchers = domains => domains.map(toDomainMatcher);

const domainNotMatchedBy = (domainExpression, domainMatchers) => !domainMatchers.some(matcher => matcher.test(domainExpression));
const notMatchedBy = domainMatchers => cookie => domainNotMatchedBy(cookie.domain, domainMatchers);
const filterNotMatchingCookies = cookies => domainMatchers => cookies.filter(notMatchedBy(domainMatchers));

const filterCookiesNotInWhitelist = cookies =>
    getWhitelistDomains()
        .map(toDomainMatchers)
        .map(filterNotMatchingCookies(cookies));

const removeTheCookies = cookies => Promise.all(cookies.map(toRemoveParameter).map(removeCookie));

const emtpyListToFalsy = list => list.length > 0 ? list : false;

export const removeCookies = () =>
    getAllCookies()
        .map(emtpyListToFalsy)
        .map(filterCookiesNotInWhitelist)
        .map(removeTheCookies);