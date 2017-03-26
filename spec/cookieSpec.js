
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
});

