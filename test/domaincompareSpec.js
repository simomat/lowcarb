import 'babel-polyfill'
import {assertThat, is} from 'hamjest';
import {domainCompare} from '../src/popup/domaincompare';

describe("domainCompare", function () {

    it("returns 0 on equal domains", function () {
        assertThat(domainCompare('com', 'com'), is(0));
        assertThat(domainCompare('example.com', 'example.com'), is(0));
    });

    it("returns 1 if A is subdomain of B", function () {
        assertThat(domainCompare('example.com', 'com'), is(1));
        assertThat(domainCompare('yet.another.example.com', 'example.com'), is(1));
    });

    it("returns -1 if B is subdomain of A", function () {
        assertThat(domainCompare('com', 'example.com'), is(-1));
        assertThat(domainCompare('example.com', 'yet.another.example.com'), is(-1));
    });

    it("returns -1 if A has first alphabetical lower part than B", function () {
        assertThat(domainCompare('com', 'de'), is(-1));
        assertThat(domainCompare('zelda.alpha.example.com', 'aron.beta.example.com'), is(-1));
    });

    it("returns 1 if B has first alphabetical lower part than A", function () {
        assertThat(domainCompare('de', 'com'), is(1));
        assertThat(domainCompare('aron.beta.example.com', 'zelda.alpha.example.com'), is(1));
    });

});
