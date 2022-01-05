import {assertThat, is, equalTo} from 'hamjest';
import {spy, wasCalled } from 'spyjest';
import {installGlobalMock, uninstallGlobalMocks} from './globalMock';

import {test_loadSettings, test_saveSetting} from '../src/settings';

describe("settings", function () {

    afterEach(uninstallGlobalMocks);

    it('given no settings stored, loadSettings() returns default settings', function (done) {
        installGlobalMock('browser.storage.sync.get', () => ({}));

        test_loadSettings()
            .map(settings => {
                assertThat(settings.removeOnStartup, is(false));
                assertThat(settings.notifyCookiesRemoved, is(false));
                done();
            });
    });

    it('given stored settings, loadSettings() returns these settings', function (done) {
        installGlobalMock('browser.storage.sync.get', () => ({settings:{someKey: 'bla'}}));

        test_loadSettings()
            .map(settings => {
                assertThat(settings, equalTo({someKey: 'bla'}));
                done();
            });
    });

});