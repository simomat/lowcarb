import {webext} from './webExtApi';

export class Cookie {
    constructor(cookieDef) {
        this.cookieDef = cookieDef;
    }

    remove() {
        return webext.removeCookie(this.toRemoveParameter());
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

    toRemoveParameter() {
        return {
            "url": this.url,
            "storeId": this.cookieDef.storeId,
            "name": this.cookieDef.name
        };
    }
}
