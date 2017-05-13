import {assertThat, is} from 'hamjest';
import {spy, wasCalled, wasCalledWith, wasNotCalled} from 'spyjest';
import {installGlobalMock, uninstallGlobalMocks} from './globalMock';

import {applyTo, getElement, returnTrue, safeMaybeOf} from '../src/utils';

describe("utils", function () {

    afterEach(uninstallGlobalMocks);

    it("returnTrue always returns true", function () {
        assertThat(returnTrue(false), is(true));
        assertThat(returnTrue(''), is(true));
        assertThat(returnTrue(true), is(true));
    });

    it("getElement calls document.getElementById and returns result", function () {
        let get = spy(() => 2);
        installGlobalMock('document.getElementById', get);

        let result = getElement(9);

        assertThat(get, wasCalled().times(1));
        assertThat(get, wasCalledWith(9));
        assertThat(result, is(2));
    });

    it("applyTo lets function called with argument and returns same argument", function () {
        let fun = spy(() => 5);

        let applyer = applyTo(fun);
        let result = applyer(10);

        assertThat(fun, wasCalled().times(1));
        assertThat(fun, wasCalledWith(10));
        assertThat(result, is(10));
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