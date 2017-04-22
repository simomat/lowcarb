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

const isGeneratorThat = inner =>
    new IsGenerator(inner);

const whenResolved = promise => ({
    then: resolveHandler => ({
        and: done => promise
            .then(resolveHandler)
            .then(() => done())
            .catch(e => done(e))
    })
});

const createMock = (name, mock) => {
    let composeObject = (inner, name) => {
        let result = {};
        result[name] = inner;
        return result;
    };

    let createProxyChainToMock = nameParts =>
        nameParts.reduceRight(composeObject, mock);

    let installOnLastDefined = (currentParent, nameChain) => {
        let [name, ...restNames] = nameChain;
        let object = currentParent[name];

        if (object !== undefined && restNames.length > 0) {
            return installOnLastDefined(object, restNames);
        }

        if (object === undefined) {
            currentParent[name] = createProxyChainToMock(restNames);
        } else {
            currentParent[name] = mock;
        }

        return {
            parent: currentParent,
            childName: name,
            originalChild: object
        };
    };

    return installOnLastDefined(global, name.split('.'));
};

let globalMocks = [];

const installGlobalMock = (name, mock) => {
    let mockInfo = createMock(name, mock);
    globalMocks.push(() => mockInfo.parent[mockInfo.childName] = mockInfo.originalChild);
};

const uninstallGlobalMocks = () => {
    globalMocks.forEach(mockUndoAction => mockUndoAction());
    globalMocks = [];
};

export {
    installGlobalMock,
    uninstallGlobalMocks,
    createMock,
    whenResolved,
    isGeneratorThat
}