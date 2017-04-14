import 'babel-polyfill'
import {assertThat, is, contains, FeatureMatcher, not} from 'hamjest';
import {WhitelistDomainRepository} from '../src/settings/domainrepo';
import {spy, wasCalled} from 'spyjest';

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
            });
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
            });
    });
});

