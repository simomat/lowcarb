import {assertThat} from 'hamjest';
import {spy, wasCalled, wasCalledWith, wasNotCalled} from 'spyjest';
import {installGlobalMock, uninstallGlobalMocks} from './globalMock';

import {notifyCookiesRemoved} from '../src/notify';

describe("notify", function () {

    afterEach(uninstallGlobalMocks);

    it("notifyCookiesRemoved calls API", function () {
        let notify = spy(_=>_);
        installGlobalMock('browser.notifications.create', notify);

        notifyCookiesRemoved([]);

        assertThat(notify, wasCalledWith('lowcarb-cookies-removed'));
    });

});