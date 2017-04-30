import {assertThat, is} from 'hamjest';
import {normalizeDomain, toDomainMatcher} from '../src/domain';

describe("domain", function () {
    it("given a domain that starts with a dot, normalizeDomain() returns the domain without leading dot", function () {
        let domain = normalizeDomain('.example.com');

        assertThat(domain, is('example.com'));
    });

    it("given a domain that does not start with a dot, normalizeDomain() returns the same domain", function () {
        let domain = normalizeDomain('example.com');

        assertThat(domain, is('example.com'));
    });

    it("given a domain, toDomainMatcher() returns a regex that matches the domain case insensitive", function () {
        let matcher = toDomainMatcher('example.com');

        assertThat(matcher.test('eXaMpLe.com'), is(true));
    });

    it("given a domain, toDomainMatcher() returns a regex that matches same domains with leading dot", function () {
        let matcher = toDomainMatcher('example.com');

        assertThat(matcher.test('.example.com'), is(true));
    });

    it("given a domain, toDomainMatcher() returns a regex that does not other match domains", function () {
        let matcher = toDomainMatcher('example.com');

        assertThat(matcher.test('eXaMpLeXcom'), is(false));
    });

    it("given a domain, toDomainMatcher() returns a regex that doesn't matches uncompleted domain names", function () {
        let matcher = toDomainMatcher('foo.bar');

        assertThat(matcher.test('bob.foo.bar'), is(false));
        assertThat(matcher.test('snoofoo.bar'), is(false));
    });
});
