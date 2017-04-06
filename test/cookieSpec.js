
import 'babel-polyfill'
import {Cookie} from '../src/cookie';
import {assertThat, is, contains, FeatureMatcher, not} from 'hamjest';

describe("Cookie", function () {
    it("builds the right cookie from cookie def with given url", function () {

        let cookie = new Cookie({url: 'foo', domain: 'bar'});

        assertThat(cookie.url, is('foo'));
    });

    it("builds the right cookie from cookie def when url is not given", function () {
        let cookie = new Cookie({
            domain: 'example.com',
            secure: false,
            path: '/baz'
        });

        assertThat(cookie.url, is('http://example.com/baz'));
    });

    it("builds the right cookie from cookie def when url is not given and host starts with dot", function () {
        let cookie = new Cookie({
            domain: '.example.com',
            secure: true,
            path: '/'
        });

        assertThat(cookie.url, is('https://example.com/'));
    });

    it("has domain equal to cooki def's domain", function () {
        let domain = 'example.com';
        let cookie = new Cookie({domain: domain});

        assertThat(cookie.domain, is(domain));
    });

    // it("remove calls api with right parameter", function () {
    //     let webExtApi = buildObjects('webext.removeCookie', (_) => {});
    //     const Cookie = proxyquire('../src/cookie', {'./webExtApi': webExtApi}).Cookie;
    //
    //     spyOn(webExtApi.webext, 'removeCookie');
    //
    //     let domain = 'example.com';
    //     let cookie = new Cookie({domain: domain, path: '/', name: 'sck', storeId: '5'});
    //     cookie.remove();
    //
    //     expect(webExtApi.webext.removeCookie).toHaveBeenCalledWith({url: cookie.url, name: 'sck', storeId: '5'});
    // });


});

