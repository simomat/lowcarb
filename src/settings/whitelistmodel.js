
const webext = require('../webExtApi').webext;


function normalizeDomain(domain) {
    domain = domain.toLowerCase();
    if (domain.startsWith('.')) {
        domain = domain.substring(1, domain.length);
    }
    return domain;
}

function toListItem(isApplied) {
    return (domain) => {
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


class WhilteListModel {

    getItems() {
        console.log('WhilteListModel.getItems()');
        return webext.getStorage('whitelistDomains')
            .then((storage) => {
                console.log('WhilteListModel.getItems() with storage: ' + JSON.stringify(storage));
                return webext.getAllCookies()
                    .then((cookies) => {
                        console.log('WhilteListModel.getItems() with cookies: ' + JSON.stringify(cookies));
                        return new Promise((resolve, reject) => {
                            resolve(createListItems(storage, cookies));
                        });
                    })

            });
    }
}

exports.WhilteListModel = WhilteListModel;