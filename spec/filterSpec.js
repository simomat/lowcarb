

const CookieFilter = require('../src/filter').CookieFilter;


function domainFor(domain) {
    return {
        matches: (pattern) => {return pattern === domain;},
        domain: domain
    }
}

describe("CookieFilter", function () {

    beforeEach(() => {
        jasmine.addMatchers({
            toContainCookieWith: (util, customEqualityTesters) => {
                return {
                    compare: (actual, expected) => {
                        return {pass: actual.some((cookie) => {return cookie.domain === expected;})};
                    }

                }
            }
        });
    });


    it("filterDomainMatches returns cookies with domains stored in filter", function () {
        let cookieFilter = new CookieFilter([domainFor('foo'), domainFor('baz')]);

        let filtered = cookieFilter.filterDomainMatches([{domain:'foo'}, {domain:'blue'}]);
        filtered = Array.from(filtered);

        expect(filtered).toContainCookieWith('foo');
    });

    it("filterDomainMatches leave out cookies with domains not stored in filter", function () {
        let cookieFilter = new CookieFilter([domainFor('foo'), domainFor('baz')]);

        let filtered = cookieFilter.filterDomainMatches([{domain:'blue'}]);
        filtered = Array.from(filtered);

        expect(filtered).not.toContainCookieWith('blue');
    });


});

