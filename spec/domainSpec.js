
const Domain = require('../src/domain').Domain;


describe("Domain", function () {
    it("matches with pattern equal to domain", function () {
        let domain = new Domain('bar');

        expect(domain.matches('bar')).toBe(true);
    });

    it("doesn't match completely different domain patterns", function () {
        let domain = new Domain('bar');

        expect(domain.matches('foo')).toBe(false);
    });

    it("matches domain pattern that starts with fullstops", function () {
        let domain = new Domain('bar');

        expect(domain.matches('.bar')).toBe(true);
    });

    it("doesn't matches uncompleted domain names", function () {
        let domain = new Domain('foo.bar');

        expect(domain.matches('bob.foo.bar')).toBe(false);
        expect(domain.matches('snoofoo.bar')).toBe(false);
    });
});

