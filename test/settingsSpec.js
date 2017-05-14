import {assertThat, is} from 'hamjest';
import {spy, wasCalled, wasCalledWith, wasNotCalled} from 'spyjest';
import {installGlobalMock, uninstallGlobalMocks} from './globalMock';

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
        installGlobalMock('browser.storage.sync.get', getStorage);

        ifRemoveCookiesOnStartup()
            .orElse(() => {
                assertThat(getStorage, wasCalled().times(1));
                assertThat(getStorage, wasCalledWith('settings'));
                done();
            });
    });

    it("having settings with removeOnStartup=true, ifRemoveCookiesOnStartup() returns a truthly maybe", function (done) {
        let getStorage = spy(() => ({settings: {removeOnStartup: true}}));
        installGlobalMock('browser.storage.sync.get', getStorage);

        ifRemoveCookiesOnStartup()
            .map(() => {
                assertThat(getStorage, wasCalled().times(1));
                assertThat(getStorage, wasCalledWith('settings'));
                done();
            });
    });

    it("having no settings yet, setRemoveCookiesOnStartup(true) stores removeOnStartup=true", function (done) {
        let setSyncStorage = spy(_=>_);
        installGlobalMock('browser.storage.sync.get', () => ({}));
        installGlobalMock('browser.storage.sync.set', setSyncStorage);

        setRemoveCookiesOnStartup(true)
            .map(() => {
                assertThat(setSyncStorage, wasCalled().times(1));
                assertThat(setSyncStorage, wasCalledWith({settings: {removeOnStartup: true}}));
                done();
            });
    });


    it("setRemoveCookiesOnStartup(false) stores removeOnStartup=false, even when it was true before", function (done) {
        let setSyncStorage = spy(_=>_);
        installGlobalMock('browser.storage.sync.get', () => ({settings: {removeOnStartup: true}}));
        installGlobalMock('browser.storage.sync.set', setSyncStorage);

        setRemoveCookiesOnStartup(false)
            .map(() => {
                assertThat(setSyncStorage, wasCalled().times(1));
                assertThat(setSyncStorage, wasCalledWith({settings: {removeOnStartup: false}}));
                done();
            });
    });

    it("setRemoveCookiesOnStartup(true) stores removeOnStartup=false, even when it was false before", function (done) {
        let setSyncStorage = spy(_=>_);
        installGlobalMock('browser.storage.sync.get', () => ({settings: {removeOnStartup: false}}));
        installGlobalMock('browser.storage.sync.set', setSyncStorage);

        setRemoveCookiesOnStartup(true)
            .map(() => {
                assertThat(setSyncStorage, wasCalled().times(1));
                assertThat(setSyncStorage, wasCalledWith({settings: {removeOnStartup: true}}));
                done();
            });
    });

    it("setRemoveCookiesOnStartup(true) does not save anything if it was true before", function (done) {
        let setSyncStorage = spy(_=>_);
        installGlobalMock('browser.storage.sync.get', () => ({settings: {removeOnStartup: true}}));
        installGlobalMock('browser.storage.sync.set', setSyncStorage);

        setRemoveCookiesOnStartup(true)
            .orElse(() => {
                assertThat(setSyncStorage, wasNotCalled());
                done();
            });
    });

    it("setRemoveCookiesOnStartup(false) does not save anything if it was false before", function (done) {
        let setSyncStorage = spy(_=>_);
        installGlobalMock('browser.storage.sync.get', () => ({settings: {removeOnStartup: false}}));
        installGlobalMock('browser.storage.sync.set', setSyncStorage);

        setRemoveCookiesOnStartup(false)
            .orElse(() => {
                assertThat(setSyncStorage, wasNotCalled());
                done();
            });
    });


});