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

export class CookieWhitelistStorage {

    getItems() {
        if (this.items !== undefined) {
            return Promise.resolve(this.items);
        }
        return this.buildItems();
    }

    setItems(items) {
        this.items = items;
    }

    buildItems() {
        return Promise.all([
            webext.getAllCookies({}),
            webext.getStorage('whitelistDomains')
        ])
        .then(([cookies, storage]) => {
            let domains = storage.whitelistDomains;
            if (domains === undefined || domains.length === 0) {
                // domains = ['heise.de', 'google.com'];
                domains = [];
            }
            this.items = createListItems(cookies, domains);
            return this.items;
        });
    }
}
