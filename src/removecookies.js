import {Domain} from './domain';
import {Cookie} from './cookie';
import {CookieFilter} from './filter';

export function removeCookies(domains, cookies) {
    let domainObjects = domains.map(domain => new Domain(domain));
    let cookieObjects = cookies.map(domain => new Cookie(domain));

    let filteredCookies = new CookieFilter(domainObjects)
        .filterDomainNotMatches(cookieObjects);
    return Promise.all(filteredCookies.map(cookie => cookie.remove()));
}
