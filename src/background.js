import {Cookie} from './cookie';
import {Domain} from './domain';
import {CookieFilter} from './filter';
import {webext} from './webExtApi';

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

function notifyCookiesRemoved() {
    return webext.sendMessage({"event": "cookiesRemoved"}).catch(reason => {
        console.log('sending message was rejected: ' + reason);
    });
}

webext.addMessageListener(message => {
    if (message.command === 'removeCookies') { // TODO: right?
        Promise.all([
            webext.getAllCookies({}),
            webext.getStorage('whitelistDomains')])
            .then(results => {
                return filterAndRemove.apply(null, results);
            })
            .then(notifyCookiesRemoved);
    } else {
        console.log('unknown message: ' + JSON.stringify(message))
    }
});

function prepareStorage() {
    webext.clearStorage();
    webext.setStorage({whitelistDomains: ['heise.de', 'google.com']});
}
prepareStorage();
