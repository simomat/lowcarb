"use strict";

import { Cookie } from './cookie';
import { Domain } from './domain';
import { CookieFilter } from './filter';


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

browser.runtime.onMessage.addListener(message => {
    if (message.command === 'removeCookies') { // TODO: right?
        Promise.all([
            browser.cookies.getAll({}),
            browser.storage.local.get('whitelistDomains')])
                .then((results) => {
                    filterAndRemove.apply(null, results);
                });
    } else {
        console.log('unknown message: ' + JSON.stringify(message))
    }
});

function prepareStorage() {
    browser.storage.local.clear();
    browser.storage.local.set({
        "whitelistDomains": ["heise.de", "google.com"]
    });
}
prepareStorage();
