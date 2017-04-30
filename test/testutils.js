const createMock = (name, mock) => {
    const composeObject = (inner, name) => ({[name]: inner});
    const createProxyChainToMock = nameParts => nameParts.reduceRight(composeObject, mock);

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
    createMock
}