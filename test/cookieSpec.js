import {assertThat, is, equalTo} from 'hamjest';

import {toRemoveParameter, urlOfCookie} from '../src/cookie';

describe("cookie", function () {

    it("given a cookie with defined url, urlOfCookie() returns the url", function () {
        let cookie = {url: 'foo', domain: 'bar'};

        let url = urlOfCookie(cookie);

        assertThat(url, is('foo'));
    });

    it("given a not secure cookie without url but properties, urlOfCookie() returns the http url built from properties", function () {
        let cookie = {
            domain: 'example.com',
            secure: false,
            path: '/baz'
        };

        let url = urlOfCookie(cookie);

        assertThat(url, is('http://example.com/baz'));
    });

    it("given a secure cookie without url but properties, urlOfCookie() returns the https url built from properties", function () {
        let cookie = {
            domain: '.example.com',
            secure: true,
            path: '/'
        };

        let url = urlOfCookie(cookie);

        assertThat(url, is('https://example.com/'));
    });

    it("given a not secure cookie without url but properties, toRemoveParameter() returns the right remove parameter", function () {
        let cookie = {url: 'http://example.com/fizz', name: 'sck', storeId: '5'};

        let removeParameter = toRemoveParameter(cookie);

        assertThat(removeParameter, equalTo(cookie));
    });

});