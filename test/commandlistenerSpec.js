import {assertThat, is, FeatureMatcher} from 'hamjest';
import {spy, wasCalled, wasCalledWith} from 'spyjest';
import {maybeOf} from 'wellmaybe';

import {onCommandPersistDomainCookieItems, onCommandRemoveCookies, onCommandRequestDomainCookieItems, test_getHandlers, test_handleMessage} from '../src/commandlistener';

describe("commandlistener", function () {

    it("handler for onCommandRemoveCookies is called", function () {
        let handler = spy(() => 1);
        onCommandRemoveCookies(handler);
        let message = {command: 'removeCookies'};

        test_handleMessage(message);

        assertThat(handler, wasCalled().times(1));
    });

    it("handler for onCommandRequestDomainCookieItems is called", function () {
        let handler = spy();
        onCommandRequestDomainCookieItems(handler);
        let message = {command: 'requestDomainCookieItems', data: 1};

        test_handleMessage(message);

        assertThat(handler, wasCalled().times(1));
    });

    it("handler for onCommandPersistDomainCookieItems is called", function () {
        let handler = spy();
        onCommandPersistDomainCookieItems(handler);
        let message = {command: 'persistDomainCookieItems', data: 1};

        test_handleMessage(message);

        assertThat(handler, wasCalledWith(maybeOf(1)).times(1));
    });

    it("result of handler is returned by handleMessage as Promise", function (done) {
        let handler = () => 5;
        onCommandRequestDomainCookieItems(handler);
        let message = {command: 'requestDomainCookieItems'};

        let result = test_handleMessage(message);

        result.then(value => {
            assertThat(value, is(5));
            done();
        });
    });

});