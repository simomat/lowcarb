"use strict";

class Cookie {
    constructor(cookieDef) {
        this.cookieDef = cookieDef;
    }

    remove() {
        let removeParam = this.toRemoveParameter()
        console.log('removing cookie: ' + JSON.stringify(removeParam));

        let removed = browser.cookies.remove(removeParam);
        if (removed === null) {
            console.log('could not remove: ' + removed.domain);
        }
    }

    get url() {
        if ('url' in this.cookieDef) {
            return this.cookieDef.url;
        }

        let url = 'http://';
        if (this.cookieDef.secure) {
            url = 'https://'
        }
        if (this.cookieDef.domain.startsWith('.')) {
            url += this.cookieDef.domain.substr(1);
        } else {
            url += this.cookieDef.domain;
        }
        url += this.cookieDef.path;
        return url;
    }

    get domain() {
        return this.cookieDef.domain;
    }

    toRemoveParameter()  {
        return {
            "url": this.url,
            "storeId": this.cookieDef.storeId,
            "name": this.cookieDef.name
        };
    }
}

class WhitelistFilter {
    constructor() {
        this.whitelistedDomains = ['heise.de'];
    }

    *filterCookies(cookies) {
        for (let cookie of cookies) {
            for (let whitelisted of this.whitelistedDomains) {
                if (! this.domainMatches(cookie.domain, whitelisted)) {
                    yield cookie;
                }
            }
        }
    }

    domainMatches(domain, pattern) {
        if (domain == pattern) {
            return true;
        }

        return domain.endsWith(pattern) && domain.substr(0, domain.length - pattern.length).endsWith('.');
    }
}

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

browser.runtime.onMessage.addListener(message => {
    if (message.command === 'removeCookies') { // TODO: right?
        browser.cookies
                .getAll({})
                .then((cookies) => {
                    let cookieObjects = toCookieObjects(cookies);
                    let filteredCookies = new WhitelistFilter().filterCookies(cookieObjects);
                    removeCookies(filteredCookies);
                });
    } else {
        console.log('unknown message: ' + JSON.stringify(message))
    }
});
