import {webext} from '../webExtApi';

export class WhitelistDomainRepository {

    static create() {
        let repository = new WhitelistDomainRepository();
        return repository
            .refresh();
    }

    refresh() {
        return webext.getStorage('whitelistDomains')
            .then(storage => {
                this.domains = storage.whitelistDomains;
                return this;
            })
            .catch(e => {
                console.log('WhitelistDomainRepository: ' + e);
                if (this.domains === undefined) {
                    this.domains = [];
                }
                this.domains.push('heise.de');
                this.domains.push('google.com');
                return this;
            });
    }

    getDomains() {
        return this.domains;
    }

    setDomains(domains) {
        this.domains = domains;
        return webext.setStorage({whitelistDomains: domains});
    }

}
