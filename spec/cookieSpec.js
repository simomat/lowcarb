
const proxyquire = require('proxyquire').noCallThru();

function buildObjects(structure, value) {
    return structure.split('.').reduceRight((head, propertyName) => {
        let obj = {};
        obj[propertyName] = head;
        return obj;
    }, value);
}


describe("Cookie", function () {
    it("builds the right cookie from cookie def with given url", function () {
        let webExtApi = buildObjects('webext.cookies.remove', (_) => {});
        const Cookie = proxyquire('../src/cookie', {'./webExtApi': webExtApi}).Cookie;

        let cookie = new Cookie({url: 'foo', domain: 'bar'});

        expect(cookie.url).toBe('foo');
    });

    it("builds the right cookie from cookie def when url is not given", function () {
        let webExtApi = buildObjects('webext.cookies.remove', (_) => {});
        const Cookie = proxyquire('../src/cookie', {'./webExtApi': webExtApi}).Cookie;

        let cookie = new Cookie({
            domain: 'example.com',
            secure: false,
            path: '/baz'
        });

        expect(cookie.url).toBe('http://example.com/baz');
    });

    it("builds the right cookie from cookie def when url is not given and host starts with dot", function () {
        let webExtApi = buildObjects('webext.cookies.remove', (_) => {});
        const Cookie = proxyquire('../src/cookie', {'./webExtApi': webExtApi}).Cookie;

        let cookie = new Cookie({
            domain: '.example.com',
            secure: true,
            path: '/'
        });

        expect(cookie.url).toBe('https://example.com/');
    });

    it("has domain equal to cooki def's domain", function () {
        let webExtApi = buildObjects('webext.cookies.remove', (_) => {});
        const Cookie = proxyquire('../src/cookie', {'./webExtApi': webExtApi}).Cookie;

        let domain = 'example.com';
        let cookie = new Cookie({domain: domain});

        expect(cookie.domain).toBe(domain);
    });

    it("remove calls api with right parameter", function () {
        let webExtApi = buildObjects('webext.removeCookie', (_) => {});
        const Cookie = proxyquire('../src/cookie', {'./webExtApi': webExtApi}).Cookie;

        spyOn(webExtApi.webext, 'removeCookie');

        let domain = 'example.com';
        let cookie = new Cookie({domain: domain, path: '/', name: 'sck', storeId: '5'});
        cookie.remove();

        expect(webExtApi.webext.removeCookie).toHaveBeenCalledWith({url: cookie.url, name: 'sck', storeId: '5'});
    });


});

