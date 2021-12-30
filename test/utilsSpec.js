import {assertThat, is} from 'hamjest';
import {spy, wasCalled, wasCalledWith, wasNotCalled} from 'spyjest';
import {uninstallGlobalMocks} from './globalMock';

import {returnTrue, safeMaybeOf} from '../src/utils';

describe("utils", function () {

    afterEach(uninstallGlobalMocks);

    it("returnTrue always returns true", function () {
        assertThat(returnTrue(false), is(true));
        assertThat(returnTrue(''), is(true));
        assertThat(returnTrue(true), is(true));
    });

    it("safeMaybeOf returns the result of a function as a maybe", function () {
        let onSuccess = spy();
        let onFail = spy();

        let maybe = safeMaybeOf(() => 5);

        maybe.map(onSuccess);
        maybe.orElse(onFail);

        assertThat(onSuccess, wasCalled().times(1));
        assertThat(onSuccess, wasCalledWith(5));
        assertThat(onFail, wasNotCalled());
    });

    it("safeMaybeOf returns empty maybe if the passed function throws an error", function () {
        let onSuccess = spy();
        let onFail = spy();

        let maybe = safeMaybeOf(function () {throw 'narf';});

        maybe.map(onSuccess);
        maybe.orElse(onFail);

        assertThat(onFail, wasCalled().times(1));
        assertThat(onSuccess, wasNotCalled());
    });

});