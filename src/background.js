
const Cookie = require('./cookie').Cookie;
const Domain = require('./domain').Domain;
const CookieFilter = require('./filter').CookieFilter;
const webExt = require('./webExtApi');


function removeCookies(cookies) {
    for (let cookie of cookies) {
        try {
            cookie.remove();
        } catch (e) {
            console.log("error on removing cookie from '" + cookie.domain + "': " + e);
        }
    }
}

function* toCookieObjects(cookies) {
    for (let cookie of cookies) {
        yield new Cookie(cookie);
    }
}

function filterAndRemove(cookies, storage) {
    let whitelistedDomains = storage.whitelistDomains.map((domain) => {return new Domain(domain);});
    let whitelistFilter = new CookieFilter(whitelistedDomains);
    let filteredCookies = whitelistFilter.filterDomainMatches(toCookieObjects(cookies));
    removeCookies(filteredCookies);
}

webExt.addMessageListener(message => {
    if (message.command === 'removeCookies') { // TODO: right?
        Promise.all([
            webExt.getAllCookies({}),
            webExt.getStorage('whitelistDomains')])
                .then((results) => {
                    filterAndRemove.apply(null, results);
                });
    } else {
        console.log('unknown message: ' + JSON.stringify(message))
    }
});

function prepareStorage() {
    webExt.clearStorage();
    webExt.setStorage({
        "whitelistDomains": ["heise.de", "google.com"]
    });
}
prepareStorage();
