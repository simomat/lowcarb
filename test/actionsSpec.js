import {assertThat, is, FeatureMatcher, containsInAnyOrder} from 'hamjest';
import {spy, wasCalled, wasCalledWith} from 'spyjest';
import {maybeOf} from 'wellmaybe';
import {installGlobalMock, uninstallGlobalMocks} from './globalMock';
import {onReload} from '../src/options/actions';

let fn = _ => _;

let messageOf = commandName => ({
    matches: actual => actual.command === commandName,
    describeTo: desc => desc.append(`a message with command '${commandName}'`),
    describeMismatch: (actual, desc) => {
        if (!actual.command) {
            desc.append('an object without \'command\' property');
        } else {
            desc.append(`a message with command '${actual.command}'`);
        }
    }
});


describe("actions", function () {

    afterEach(uninstallGlobalMocks);

    it("when onReload is called, current info is saved and reloaded and frontend elements are set", function (done) {
        let appendChild = spy();
        installGlobalMock('document.getElementById', () => ({children:[{innerText:{trim:fn}, classList:{contains:fn}}], appendChild:appendChild}));
        installGlobalMock('document.createTextNode', fn);
        installGlobalMock('document.createElement', () => ({appendChild: fn, classList: {add: fn}}));

        let sendMessage = spy();
        sendMessage.whenCalledWith(messageOf('persistDomainCookieItems')).doReturn(Promise.resolve(true));
        sendMessage.whenCalledWith(messageOf('requestDomainCookieItems')).doReturn(Promise.resolve([{value:'asdf', isApplied:true}]));

        installGlobalMock('browser.runtime.sendMessage', sendMessage);

        onReload()
            .map(() => {
                assertThat(sendMessage, wasCalled().times(2));
                assertThat(sendMessage, wasCalledWith(messageOf('persistDomainCookieItems')).times(1));
                assertThat(sendMessage, wasCalledWith(messageOf('requestDomainCookieItems')).times(1));
                assertThat(appendChild, wasCalled().times(1));
                done();
            });

    });

});