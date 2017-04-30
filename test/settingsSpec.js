import {assertThat, is} from 'hamjest';
import {spy, wasCalled, wasCalledWith} from 'spyjest';
import {installGlobalMock, uninstallGlobalMocks} from './testutils';

import {ifRemoveCookiesOnStartup, setRemoveCookiesOnStartup} from '../src/settings';

describe("settings", function () {

    afterEach(uninstallGlobalMocks);

    it("having no settings stored, ifRemoveCookiesOnStartup() returns a falsy maybe", function (done) {
        ifRemoveCookiesOnStartup()
            .orElse(() => {
                done();
            });
    });

    it("having settings with removeOnStartup=false, ifRemoveCookiesOnStartup() returns a falsy maybe", function (done) {
        let getStorage = spy(() => ({settings: {removeOnStartup: false}}));
        installGlobalMock('browser.storage.local.get', getStorage);

        ifRemoveCookiesOnStartup()
            .orElse(() => {
                assertThat(getStorage, wasCalled().times(1));
                assertThat(getStorage, wasCalledWith('settings'));
                done();
            });
    });

    it("having settings with removeOnStartup=true, ifRemoveCookiesOnStartup() returns a truthly maybe", function (done) {
        let getStorage = spy(() => ({settings: {removeOnStartup: true}}));
        installGlobalMock('browser.storage.local.get', getStorage);

        ifRemoveCookiesOnStartup()
            .map(() => {
                assertThat(getStorage, wasCalled().times(1));
                assertThat(getStorage, wasCalledWith('settings'));
                done();
            });
    });

    it("having no settings yet, setRemoveCookiesOnStartup(true) stores removeOnStartup=true", function (done) {
        let getStorage = spy(() => ({}));
        let setStorage = spy(() => Promise.resolve());
        installGlobalMock('browser.storage.local.get', getStorage);
        installGlobalMock('browser.storage.local.set', setStorage);

        setRemoveCookiesOnStartup(true)
            .map(() => {
                assertThat(setStorage, wasCalled().times(1));
                assertThat(setStorage, wasCalledWith({settings: {removeOnStartup: true}}));
                done();
            });
    });


    it("setRemoveCookiesOnStartup(false) stores removeOnStartup=false, even when it was true before", function (done) {
        let getStorage = spy(() => ({settings: {removeOnStartup: true}}));
        let setStorage = spy(() => Promise.resolve());
        installGlobalMock('browser.storage.local.get', getStorage);
        installGlobalMock('browser.storage.local.set', setStorage);

        setRemoveCookiesOnStartup(false)
            .map(() => {
                assertThat(setStorage, wasCalled().times(1));
                assertThat(setStorage, wasCalledWith({settings: {removeOnStartup: false}}));
                done();
            });
    });

    it("setRemoveCookiesOnStartup(true) stores removeOnStartup=false, even when it was false before", function (done) {
        let getStorage = spy(() => ({settings: {removeOnStartup: false}}));
        let setStorage = spy(() => Promise.resolve());
        installGlobalMock('browser.storage.local.get', getStorage);
        installGlobalMock('browser.storage.local.set', setStorage);

        setRemoveCookiesOnStartup(true)
            .map(() => {
                assertThat(setStorage, wasCalled().times(1));
                assertThat(setStorage, wasCalledWith({settings: {removeOnStartup: true}}));
                done();
            });
    });


});