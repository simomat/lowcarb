import {installGlobalMock, uninstallGlobalMocks} from './globalMock';
import {getAllCookies, getStorage, sendMessage} from "../src/webext";

let throwError = () => {
    throw 'test error';
};

describe("webext", function () {

    afterEach(uninstallGlobalMocks);

    it("failure on getAllCookies yields empty result", function (done) {
        installGlobalMock('browser.cookies.getAll', throwError);

        getAllCookies()
            .orElse(done)
    });

    it("failure on sendMessage yields empty result", function (done) {
        installGlobalMock('browser.runtime.sendMessage', throwError);

        sendMessage()
            .orElse(done)
    });

    it("failure on getStorage yields empty result", function (done) {
        installGlobalMock('browser.storage.local.get', throwError);

        getStorage()
            .orElse(done)
    });


    // TODO: cover other api calls
});