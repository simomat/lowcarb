"use strict";

class Cookie {
    constructor(cookieDef) {
        this.cookieDef = cookieDef;
    }

    remove() {
        let removeParam = this.toRemoveParameter();
        console.log('removing cookie: ' + JSON.stringify(removeParam));

        let removed = browser.cookies.remove(removeParam);
        if (removed === null) {
            console.log('could not remove: ' + removed.domain);
        }
    }

    toString() {
        return this.url;
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

class Domain {
    constructor(domain) {
        this.domain = domain;
    }

    matches(domainExpression) {
        if (domainExpression === this.domain) {
            return true;
        }


        let macthes = domainExpression.endsWith(this.domain)
            && domainExpression.substr(0, domainExpression.length - this.domain.length).endsWith('.');

        console.log('macthes: ' + this.domain + ' + ' + domainExpression + ': ' + macthes);

        return macthes;
    }
}

class CookieFilter {
    constructor(domains) {
        this.domains = domains;
    }

    *filterDomainMatches(cookies) {
        for (let cookie of cookies) {
            if (this.matches(cookie)) {
                yield cookie;
            }
        }
    }

    // *filterDomainNotMatches(cookies) {
    //     for (let cookie of cookies) {
    //         if (! this.matches(cookie)) {
    //             yield cookie;
    //         }
    //     }
    // }

    matches(cookie) {
        return this.domains.some((domain) => {
            domain.matches(cookie.domain);
        });
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
