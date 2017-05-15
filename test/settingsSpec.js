import {assertThat, is, equalTo} from 'hamjest';
import {spy, wasCalled, wasCalledWith, wasNotCalled} from 'spyjest';
import {installGlobalMock, uninstallGlobalMocks} from './globalMock';

import {ifNotifyOnRemovedCookies, ifRemoveCookiesOnStartup, setNotifyCookiesRemoved, setRemoveCookiesOnStartup, test_loadSettings, test_saveSetting} from '../src/settings';

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

    it("saveSettings() does not save when the value set before was equal", function (done) {
        let setSyncStorage = spy(_=>_);
        installGlobalMock('browser.storage.sync.set', setSyncStorage);
        installGlobalMock('browser.storage.sync.get', () => ({settings:{someKey: true}}));

        test_saveSetting('someKey', true)
            .orElse(() => {
                assertThat(setSyncStorage, wasNotCalled());
                done();
            });
    });

    it("saveSettings() saves any value when it was not set before", function (done) {
        let setSyncStorage = spy(_=> Promise.resolve());
        installGlobalMock('browser.storage.sync.set', setSyncStorage);
        installGlobalMock('browser.storage.sync.get', () => ({settings:{}}));

        test_saveSetting('someKey', false)
            .map(() => {
                assertThat(setSyncStorage, wasCalledWith({settings:{someKey: false}}));
                done();
            });
    });

    it("given stored settings with removeOnStartup=true, ifRemoveCookiesOnStartup() returns a truthly maybe", function (done) {
        let getStorage = spy(() => ({settings: {removeOnStartup: true}}));
        installGlobalMock('browser.storage.sync.get', getStorage);

        ifRemoveCookiesOnStartup()
            .map(() => {
                assertThat(getStorage, wasCalled());
                done();
            });
    });

    it("setRemoveCookiesOnStartup(true) stores removeOnStartup=true, even when it was false before", function (done) {
        let setSyncStorage = spy(_=> Promise.resolve());
        installGlobalMock('browser.storage.sync.get', () => ({settings: {removeOnStartup: false}}));
        installGlobalMock('browser.storage.sync.set', setSyncStorage);

        setRemoveCookiesOnStartup(true)
            .map(() => {
                assertThat(setSyncStorage, wasCalledWith({settings: {removeOnStartup: true}}));
                done();
            });
    });

    it("given stored settings with notifyOnRemovedCookies=true, ifNotifyOnRemovedCookies() returns a truthly maybe", function (done) {
        let getStorage = spy(() => ({settings: {notifyCookiesRemoved: true}}));
        installGlobalMock('browser.storage.sync.get', getStorage);

        ifNotifyOnRemovedCookies()
            .map(() => {
                assertThat(getStorage, wasCalled());
                done();
            });
    });

    it("setNotifyOnRemovedCookies(true) stores notifyOnRemovedCookies=true, even when it was false before", function (done) {
        let setSyncStorage = spy(_=> Promise.resolve());
        installGlobalMock('browser.storage.sync.get', () => ({settings: {notifyCookiesRemoved: false}}));
        installGlobalMock('browser.storage.sync.set', setSyncStorage);

        setNotifyCookiesRemoved(true)
            .map(() => {
                assertThat(setSyncStorage, wasCalledWith({settings: {notifyCookiesRemoved: true}}));
                done();
            });
    });

});