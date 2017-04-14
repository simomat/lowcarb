import {assertThat} from 'hamjest';

class IsGenerator {
    constructor(innerMatcher) {
        this.inner = innerMatcher;
        this.isGenerator = this.innerMatches = this.generatorValues = null;
    }

    matches(object) {
        this.isGenerator = typeof object.next === 'function';
        this.generatorValues = Array.from(object);
        this.innerMatches = this.inner.matches(this.generatorValues );
        return this.isGenerator && this.innerMatches;
    }

    describeTo(description) {
        description.append('a generator with ');
        this.inner.describeTo(description);
    }

    describeMismatch(actual, description) {
        if (!this.isGenerator) {
            description.append('input was not a generator');
        }
        if (!this.innerMatches) {
            this.inner.describeMismatch(this.generatorValues, description);
        }
    }
}

export function isGeneratorThat(inner) {
    return new IsGenerator(inner);
}

export function assertResolved(promise, matcher) {
    return {
        and: done => {
            promise.then(result => {
                assertThat(result, matcher);
                done();
            })
                .catch(e => done(e));
        }
    }
}
