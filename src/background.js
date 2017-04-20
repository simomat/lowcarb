import {Cookie} from './cookie';
import {Domain} from './domain';
import {CookieFilter} from './filter';
import {webext} from './webExtApi';
import {CommandListener} from "./commandlistener";
import {CookieWhitelistStorage} from "./cookiewhiteliststorage";

function removeCookies(cookies) {
    return Promise.all(Array.from(cookies).map(cookie=>{return cookie.remove();}));
}

function* toCookieObjects(cookies) {
    for (let cookie of cookies) {
        yield new Cookie(cookie);
    }
}

function filterAndRemove(cookies, storage) {
    let whitelistedDomains = storage.whitelistDomains.map(domain => {
        return new Domain(domain);
    });
    let whitelistFilter = new CookieFilter(whitelistedDomains);
    let filteredCookies = whitelistFilter.filterDomainNotMatches(toCookieObjects(cookies));
    return removeCookies(filteredCookies);
}

let cookieWhitelistStorage = new CookieWhitelistStorage();

let commandListener = new CommandListener();

commandListener.onPersistCookieWhitelist(cookieWhitelistStorage.setItems);
commandListener.onRequestCookieWhitelist(cookieWhitelistStorage.getItems);

commandListener.onRemoveCookies(() => {
    Promise.all([
        webext.getAllCookies({}),
        webext.getStorage('whitelistDomains')])
        .then(results => {
            return filterAndRemove.apply(null, results);
        });
});
