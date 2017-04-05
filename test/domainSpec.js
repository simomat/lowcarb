import {Domain} from '../src/domain';
import {assertThat, is} from 'hamjest';

describe("Domain", function () {
    it("matches with pattern equal to domain", function () {
        let domain = new Domain('bar');

        assertThat(domain.matches('bar'), is(true))
    });

    it("doesn't match completely different domain patterns", function () {
        let domain = new Domain('bar');

        assertThat(domain.matches('foo'), is(false));
    });

    it("matches domain pattern that starts with fullstops", function () {
        let domain = new Domain('bar');

        assertThat(domain.matches('.bar'), is(true));
    });

    it("doesn't matches uncompleted domain names", function () {
        let domain = new Domain('foo.bar');

        assertThat(domain.matches('bob.foo.bar'), is(false));
        assertThat(domain.matches('snoofoo.bar'), is(false));
    });
});
