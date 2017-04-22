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
    constructor(cookieStorage, whitelistDomainStorage) {
        this.cookieStorage = cookieStorage;
        this.whitelistDomainStorage = whitelistDomainStorage;
    }

    getItems() {
        return Promise.all([
            this.cookieStorage.getCookies(),
            this.whitelistDomainStorage.getDomains()
        ])
            .then(([cookies, domains]) => {
                return createListItems(cookies, domains);
            });
    }

    setItems(items) {
        let domains = items
            .filter(item => item.isApplied)
            .map(item => item.value);
        this.whitelistDomainStorage.setDomains(domains);
    }
}
