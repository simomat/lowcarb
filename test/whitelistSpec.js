import {assertThat, is} from 'hamjest';
import {spy, wasCalled, wasCalledWith, wasNotCalled} from 'spyjest';
import {installGlobalMock, uninstallGlobalMocks} from './globalMock';

import {getWhitelistDomains, setWhitelistDomains} from '../src/whitelist';

describe("whitelist", function () {

    afterEach(uninstallGlobalMocks);

    it("having whitelistDomains, getWhitelistDomains gets the domains", function (done) {
        let getStorage = spy(() => ({whitelistDomains: ['a', 'b']}));
        installGlobalMock('browser.storage.sync.get', getStorage);

        getWhitelistDomains()
            .map(domains => {
                assertThat(domains, is(['a', 'b']));
                done();
            });
    });

    it("having no whitelistDomains, getWhitelistDomains gets empty list", function (done) {
        let getStorage = spy(() => ({}));
        installGlobalMock('browser.storage.sync.get', getStorage);

        getWhitelistDomains()
            .map(domains => {
                assertThat(domains, is([]));
                done();
            });
    });

    it("setWhitelistDomains sets the domains if no whitelist was present before", function (done) {
        let setSyncStorage = spy(_=>_);
        installGlobalMock('browser.storage.sync.get', () => ({}));
        installGlobalMock('browser.storage.sync.set', setSyncStorage);

        setWhitelistDomains(['a', 'b'])
            .map(() => {
                assertThat(setSyncStorage, wasCalled().times(1));
                assertThat(setSyncStorage, wasCalledWith({whitelistDomains: ['a', 'b']}));
                done();
            });
    });

    it("setWhitelistDomains sets the domains if different whitelist was present before", function (done) {
        let setSyncStorage = spy(_=>_);
        installGlobalMock('browser.storage.sync.get', () => ({whitelistDomains: ['c', 'd']}));
        installGlobalMock('browser.storage.sync.set', setSyncStorage);

        setWhitelistDomains(['a', 'b'])
            .map(() => {
                assertThat(setSyncStorage, wasCalled().times(1));
                assertThat(setSyncStorage, wasCalledWith({whitelistDomains: ['a', 'b']}));
                done();
            });
    });

    it("setWhitelistDomains does not save if same whitelist was present before", function (done) {
        let setSyncStorage = spy(_=>_);
        installGlobalMock('browser.storage.sync.get', () => ({whitelistDomains: ['b', 'a']}));
        installGlobalMock('browser.storage.sync.set', setSyncStorage);

        setWhitelistDomains(['a', 'b'])
            .map(() => {
                assertThat(setSyncStorage, wasNotCalled());
                done();
            });
    });


});