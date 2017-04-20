import {webext} from "./webExtApi";

function normalizeDomain(domain) {
    domain = domain.toLowerCase();
    if (domain.startsWith('.')) {
        domain = domain.substring(1, domain.length);
    }
    return domain;
}

const toListItem = isApplied =>
    domain => ({value: domain, isApplied: isApplied});

const createDomainListItems = whitelistDomains => whitelistDomains
        .map(normalizeDomain)
        .map(toListItem(true));

const createCookieListItems = cookies => cookies
        .map(cookie => cookie.domain)
        .map(normalizeDomain)
        .map(toListItem(false));

export class CookieWhitelistStorage {

    getItems() {
        if (this.items !== undefined) {
            return Promise.resolve(this.items);
        }
        return this.buildItems();
    }

    setItems(items) {

    }

    buildItems() {
        return Promise.all([
            webext.getAllCookies({}),
            webext.getStorage('whitelistDomains')
        ])
            .then(([domains, cookies]) => {
                this.items = createCookieListItems(cookies)
                    .concat(createDomainListItems(domains));
                return this.items;
            });
    }
}
