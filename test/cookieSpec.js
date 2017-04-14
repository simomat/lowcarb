
import 'babel-polyfill'
import {spy, wasCalledWith} from 'spyjest';
import {assertThat, is, contains, FeatureMatcher, not} from 'hamjest';
import {Cookie} from '../src/cookie';

describe("Cookie", function () {

    afterEach(uninstallGlobalMocks);

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

    it("remove calls cookiesRepo with right parameter", function () {
        let remove = spy(_ => _);
        installGlobalMock('browser.cookies.remove', remove);
        let domain = 'example.com';
        let cookie = new Cookie({domain: domain, path: '/', name: 'sck', storeId: '5'});

        cookie.remove();

        assertThat(remove, wasCalledWith(objectWithUrlOf(cookie)));
    });


});

let objectWithUrlOf = cookie => ({
    matches: obj => obj.url === cookie.url,
    describeTo: desc => desc.append(`object with url ${cookie.url}`)
});


