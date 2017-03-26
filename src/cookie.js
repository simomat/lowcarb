
const webext = require('./webExtApi').webext;

class Cookie {
    constructor(cookieDef) {
        this.cookieDef = cookieDef;
    }

    remove() {
        let removeParam = this.toRemoveParameter();
        console.log('removing cookie: ' + JSON.stringify(removeParam));

        let removed = webext.cookies.remove(removeParam);
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

exports.Cookie = Cookie;
