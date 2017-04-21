import {Domain} from './domain';
import {Cookie} from './cookie';
import {CookieFilter} from './filter';

export function removeCookies(domains, cookies) {
    let domainObjects = domains.map(domain => new Domain(domain));
    let cookieObjects = cookies.map(domain => new Cookie(domain));

    let cookieFilter = new CookieFilter(domainObjects);
    let filteredCookies = cookieFilter.filterDomainNotMatches(cookieObjects);
    return Promise.all(
        Array.from(filteredCookies)
            .map(cookie => cookie.remove()));
}
