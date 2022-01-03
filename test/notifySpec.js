import {assertThat, anything} from 'hamjest';
import {spy, wasCalledWith, wasNotCalled} from 'spyjest';
import {installGlobalMock, uninstallGlobalMocks} from './globalMock';

import {notifyCookiesRemoved, NOTIFICATION_COOKIES_REMOVED} from '../src/notify';

describe("notify", function () {

    afterEach(uninstallGlobalMocks);

    it("notifyCookiesRemoved calls API", async function () {
        let notify = spy(_=> Promise.resolve());
        installGlobalMock('browser.notifications.create', notify);
        installGlobalMock('browser.storage.sync.get', () => ({settings:{notifyCookiesRemoved:true}}));
        installGlobalMock('browser.alarms.get', _=> Promise.resolve([123]));

        await notifyCookiesRemoved(['x']);

        assertThat(notify, wasCalledWith(NOTIFICATION_COOKIES_REMOVED, anything()));
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