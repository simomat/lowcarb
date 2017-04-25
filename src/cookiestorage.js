import {webext} from './webExtApi';
import {Cookie} from './cookie';

export class CookieStorage {
    constructor() {
        this.flush();
    }

    getCookies() {
        if (this.cache !== null) {
            return Promise.resolve(this.cache);
        }
        return webext.getAllCookies()
            .then(cookies => {
                this.cache = cookies.map(cookieDef => new Cookie(cookieDef));
                return this.cache;
            });
    }

    flush() {
        this.cache = null;
    }
}