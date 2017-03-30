
const webext = require('../webExtApi').webext;


function normalizeDomain(cookie) {
    let normalizedCookieDomain = cookie.domain.toLowerCase();
    if (normalizedCookieDomain.startsWith('.')) {
        normalizedCookieDomain = normalizedCookieDomain.substring(1, normalizedCookieDomain.length-1);
    }
    return normalizedCookieDomain;
}

function reverseParts(domain) {
    return domain.split('.').reverse().join('.');
}

let uniqueSortedDomains = function (cookies) {
    let cookieDomains = new Set(cookies.map(normalizeDomain));
    return Array.from(cookieDomains)
        .map(reverseParts)
        .sort()
        .map(reverseParts);
};

function* createListItems(storage, cookies) {

    for (let domain of storage.whitelistDomains) {
        yield {value: domain, isApplied: true};
    }

    let cookieDomains = uniqueSortedDomains(cookies);

    for (let domain of cookieDomains) {
        yield {value: domain, isApplied: false};
    }

}


class WhilteListModel {

    getItems() {
        return webext.getStorage('whitelistDomains')
            .then((storage) => {
                return webext.getAllCookies()
                    .then((cookies) => {
                        return new Promise((resolve, reject) => {
                            resolve(createListItems(storage, cookies));
                        });
                    })

            });
    }
}

exports.WhilteListModel = WhilteListModel;