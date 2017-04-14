function normalizeDomain(domain) {
    domain = domain.toLowerCase();
    if (domain.startsWith('.')) {
        domain = domain.substring(1, domain.length);
    }
    return domain;
}

function toListItem(isApplied) {
    return domain => ({value: domain, isApplied: isApplied})
}

function getDomain(cookie) {
    return cookie.domain;
}

function domainToListItem(map, listItem) {
    return map.set(listItem.value, listItem);
}

function splitReverseJoin(domain) {
    return domain.split('\.').reverse().join('.');
}

function reverseDomainSort(domains) {
    return domains
        .map(splitReverseJoin)
        .sort()
        .map(splitReverseJoin)
}

function* createListItems(whitelistDomains, cookies) {

    let itemListMap = cookies
        .map(getDomain)
        .map(normalizeDomain)
        .map(toListItem(false))
        .reduce(domainToListItem, new Map());

    itemListMap = whitelistDomains
        .map(normalizeDomain)
        .map(toListItem(true))
        .reduce(domainToListItem, itemListMap);

    let allDomains = reverseDomainSort(Array.from(itemListMap.keys()));

    for (let domain of allDomains) {
        yield itemListMap.get(domain);
    }
}


export class WhiteListModel {
    constructor(cookiesRepo, whitelistRepo) {
        this.cookiesRepo = cookiesRepo;
        this.whitelistDomainRepo = whitelistRepo;
    }

    getItems() {
        return Promise.all([
            this.whitelistDomainRepo.getDomains(),
            this.cookiesRepo.getAllCookies()]
        ).then(domainsAndCookies => Promise.resolve(createListItems(...domainsAndCookies)));
    }

    saveItems(items) {
        let newWhitelistedDomains = items
            .filter(item => item.isApplied)
            .map(item => item.value.trim());

        return this.cookiesRepo.setStorage({whitelistDomains: newWhitelistedDomains});
    }
}
