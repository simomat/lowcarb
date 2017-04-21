import 'babel-polyfill'
import {assertThat, contains, FeatureMatcher, not} from 'hamjest';
import {CookieFilter} from '../src/domainfilter';

function domainFor(domain) {
    return {
        matches: (pattern) => {
            return pattern === domain;
        },
        domain: domain
    }
}

function cookieWithDomain(domain) {
    return new FeatureMatcher(domain, 'cookie with domain', 'domain');
}

describe("CookieFilter", function () {

    it("filterDomainMatches returns cookies with domains stored in filter", function () {
        let cookieFilter = new CookieFilter([domainFor('foo'), domainFor('baz')]);

        let cookies = cookieFilter.filterDomainMatches([{domain: 'foo'}, {domain: 'blue'}]);

        assertThat(cookies, contains(cookieWithDomain('foo')));
    });

    it("filterDomainMatches leave out cookies with domains not stored in filter", function () {
        let cookieFilter = new CookieFilter([domainFor('foo'), domainFor('baz')]);

        let cookies = cookieFilter.filterDomainMatches([{domain:'blue'}]);

        assertThat(cookies, not(contains(cookieWithDomain('grey'))));
    });

    it("filterDomainNotMatches returns cookies with domains not stored in filter", function () {
        let cookieFilter = new CookieFilter([domainFor('foo'), domainFor('baz')]);

        let cookies = cookieFilter.filterDomainNotMatches([{domain:'foo'}, {domain:'blue'}]);

        assertThat(cookies, contains(cookieWithDomain('blue')));
    });

    it("filterDomainNotMatches leave out cookies with domains stored in filter", function () {
        let cookieFilter = new CookieFilter([domainFor('foo'), domainFor('baz')]);

        let cookies = cookieFilter.filterDomainNotMatches([{domain:'blue'}]);

        assertThat(cookies, contains(cookieWithDomain('blue')));
    });
});
