import {webext} from "./webExtApi";

export class WhitelistDomainStorage {
    constructor() {
        this.flush();
    }

    getDomains() {
        if (this.cache !== null) {
            return Promise.resolve(this.cache);
        }
        return webext.getStorage('whitelistDomains')
            .then(storage => {
                let domains = storage.whitelistDomains;
                if (domains === undefined) {
                    domains = [];
                }
                this.cache = domains;
                return this.cache;
            });
    }

    setDomains(domains) {
        this.cache = domains;
        webext.setStorage({whitelistDomains: domains});
    }

    flush() {
        this.cache = null;
    }
}
