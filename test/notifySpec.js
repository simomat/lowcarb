import {assertThat} from 'hamjest';
import {spy, wasCalled, wasCalledWith, wasNotCalled} from 'spyjest';
import {installGlobalMock, uninstallGlobalMocks} from './globalMock';

import {notifyCookiesRemoved} from '../src/notify';

describe("notify", function () {

    afterEach(uninstallGlobalMocks);

    it("notifyCookiesRemoved calls API", function () {
        let notify = spy(_=>_);
        installGlobalMock('browser.notifications.create', notify);
        installGlobalMock('browser.storage.sync.get', () => ({settings:{notifyCookiesRemoved:true}}));

        notifyCookiesRemoved(['x']);

        assertThat(notify, wasCalledWith('lowcarb-cookies-removed'));
    });

    it("notifyCookiesRemoved does not call API if notification is disabled", function () {
        let notify = spy(_=>_);
        installGlobalMock('browser.notifications.create', notify);
        installGlobalMock('browser.storage.sync.get', () => ({settings:{notifyCookiesRemoved:false}}));

        notifyCookiesRemoved(['x']);

        assertThat(notify, wasNotCalled());
    });

    it("notifyCookiesRemoved does not call API if no cookies are given", function () {
        let notify = spy(_=>_);
        installGlobalMock('browser.notifications.create', notify);
        installGlobalMock('browser.storage.sync.get', () => ({settings:{notifyCookiesRemoved:true}}));

        notifyCookiesRemoved([]);

        assertThat(notify, wasNotCalled());
    });

});