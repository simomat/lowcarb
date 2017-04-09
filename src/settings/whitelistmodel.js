function normalizeDomain(domain) {
    domain = domain.toLowerCase();
    if (domain.startsWith('.')) {
        domain = domain.substring(1, domain.length);
    }
    return domain;
}

function toListItem(isApplied) {
    return domain => {
        return {value: domain, isApplied: isApplied};
    };
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

function* createListItems(storage, cookies) {

    let itemListMap = cookies
        .map(getDomain)
        .map(normalizeDomain)
        .map(toListItem(false))
        .reduce(domainToListItem, new Map());

    itemListMap = storage.whitelistDomains
        .map(normalizeDomain)
        .map(toListItem(true))
        .reduce(domainToListItem, itemListMap);

    let allDomains = reverseDomainSort(Array.from(itemListMap.keys()));

    for (let domain of allDomains) {
        yield itemListMap.get(domain);
    }
}


export class WhiteListModel {

    constructor(api) {
        this.api = api;
    }

    getItems() {
        return Promise.all([
            this.api.getStorage('whitelistDomains'),
            this.api.getAllCookies()]
        ).then((storageAndCookies) => {
            return new Promise((resolve, reject) => {
                resolve(createListItems(...storageAndCookies));
            });
        });
    }

    saveItems(items) {
        let newWhitelistedDomains = items
            .filter(item => { return item.isApplied;})
            .map(item => { return item.value.trim(); });

        return this.api.setStorage({whitelistDomains: newWhitelistedDomains});
    }
}
