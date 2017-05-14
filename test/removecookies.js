import {assertThat} from 'hamjest';
import {spy, wasCalled, wasCalledWith, wasNotCalled} from 'spyjest';
import {installGlobalMock, uninstallGlobalMocks} from './globalMock';

import {removeCookies} from '../src/removecookies';

describe("removecookies", function () {

    afterEach(uninstallGlobalMocks);

    it("given some cookies and no whitelist domains, removeCookies() removes all cookies", function (done) {
        let cookie1 = {url: 'foo', storeId: 1, name: 'bar', domain: 'narf'};
        let cookie2 = {url: 'fizz', storeId: 2, name: 'buzz', domain: 'sneep'};

        installGlobalMock('browser.cookies.getAll', () => [cookie1, cookie2]);
        installGlobalMock('browser.storage.sync.get', () => ({whitelistDomains: []}));
        let remove = spy(_=>_);
        installGlobalMock('browser.cookies.remove', remove);
        let notify = spy(_=>_);
        installGlobalMock('browser.notifications.create', notify);

        removeCookies()

            .map(() => {
                assertThat(remove, wasCalled().times(2));
                assertThat(remove, wasCalledWith({url: 'foo', storeId: 1, name: 'bar'}));
                assertThat(remove, wasCalledWith({url: 'fizz', storeId: 2, name: 'buzz'}));

                assertThat(notify, wasCalled().times(1));
                assertThat(notify, wasCalledWith('lowcarb-cookies-removed'));
                done();
            });
    });

    it("given no cookies and some whitelist domains, removeCookies() no cookie is removed", function (done) {
        installGlobalMock('browser.cookies.getAll', () => []);
        installGlobalMock('browser.storage.sync.get', () => ({whitelistDomains: ['yerp', 'narf']}));
        let remove = spy();
        installGlobalMock('browser.cookies.remove', remove);
        let notify = spy(_=>_);
        installGlobalMock('browser.notifications.create', notify);

        removeCookies()
            .orElse(() => {
                assertThat(remove, wasNotCalled());
                assertThat(notify, wasNotCalled());
                done();
            });
    });

    it("given some cookies and some whitelist domains, removeCookies() removes not matching cookies", function (done) {
        let cookie1 = {url: 'foo', storeId: 1, name: 'bar', domain: 'narf'};
        let cookie2 = {url: 'fizz', storeId: 2, name: 'buzz', domain: 'sneep'};

        installGlobalMock('browser.cookies.getAll', () => [cookie1, cookie2]);
        installGlobalMock('browser.storage.sync.get', () => ({whitelistDomains: ['yerp', 'narf']}));
        let remove = spy(_=>_);
        installGlobalMock('browser.cookies.remove', remove);
        let notify = spy(_=>_);
        installGlobalMock('browser.notifications.create', notify);

        removeCookies()

            .map(() => {
                assertThat(remove, wasCalled().times(1));
                assertThat(remove, wasCalledWith({url: 'fizz', storeId: 2, name: 'buzz'}));

                assertThat(notify, wasCalled().times(1));
                assertThat(notify, wasCalledWith('lowcarb-cookies-removed'));
                done();
            });
    });


});