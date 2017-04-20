import {assertThat, contains} from 'hamjest';
import {spy, wasCalled} from 'spyjest';
import {WhitelistDomainRepository} from '../src/popup/domainrepo';

function installDomains(domains) {
    installGlobalMock('browser.storage.local.get', () => new Promise(res => res({whitelistDomains: domains})));
}

describe("WhitelistDomainRepository", function () {

    afterEach(uninstallGlobalMocks);

    it("returns domains provided by storage", function (done) {
        installDomains(['foo']);

        WhitelistDomainRepository.create()
            .then(repo => {
                assertThat(repo.getDomains(), contains('foo'));
                done();
            })
            .catch(e => done(e));
    });

    it("saves domains provided by storage", function (done) {
        let set = spy(() => Promise.resolve());
        installGlobalMock('browser.storage.local.set', set);

        let get = () => Promise.resolve(['foo', 'bar']);
        installGlobalMock('browser.storage.local.get', get);

        WhitelistDomainRepository.create()
            .then(repo => repo.setDomains(['foo']))
            .then(() => {
                assertThat(set, wasCalled());
                done();
            })
            .catch(e => done(e));
    });
});

