import {Domain} from './domain';
import {CookieFilter} from './domainfilter';

const removeAll = filteredCookies =>
    Promise.all(filteredCookies.map(cookie => cookie.remove()));

const filterForDomains = (domains, cookies) =>
    new CookieFilter(domains).filterDomainNotMatches(cookies);

export class CookieRemover {
    constructor(cookieStorage) {
        this.cookieStorage = cookieStorage;
    }

    removeCookiesOf(domains) {
        let domainObjects = domains.map(domain => new Domain(domain));
        return this.cookieStorage.getCookies()
            .then(cookies => removeAll(filterForDomains(domainObjects, cookies)));
    }
}
