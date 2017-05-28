import {assertThat, is, containsInAnyOrder} from 'hamjest';
import {spy, wasCalled, wasCalledWith, wasNotCalled} from 'spyjest';
import {installGlobalMock, uninstallGlobalMocks} from './globalMock';

import {applyTo, getElement, removeDuplicates, returnTrue, safeMaybeOf} from '../src/utils';

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

    it("removeDuplicates returns array with same elements if no duplicates are present", function () {
        assertThat(removeDuplicates(['a', 'b']), containsInAnyOrder('a', 'b'));
    });

    it("removeDuplicates removes duplicated items", function () {
        assertThat(removeDuplicates(['a', 'b', 'a', 'c', 'a', 'b']), containsInAnyOrder('a', 'b', 'c'));
    });

});