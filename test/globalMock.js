const createProxyChainToObject = (nameParts, object) =>
    nameParts.reduceRight((child, childName) => ({[childName]: child}), object);

const replaceChildWithMock = (parent, childName, mockChild) => {
    let originalChild = parent[childName];
    parent[childName] = mockChild;

    return () => parent[childName] = originalChild;
};

const traverseAndInstall = (currentParent, nameChain, mock) => {
    let [childName, ...restNames] = nameChain;
    let originalChild = currentParent[childName];

    if (originalChild === undefined) {
        return replaceChildWithMock(currentParent, childName, createProxyChainToObject(restNames, mock));
    }

    if (restNames.length === 0) {
        return replaceChildWithMock(currentParent, childName, mock);
    }

    return traverseAndInstall(originalChild, restNames, mock);
};

let globalMocks = [];

export const createMock = (name, mock) => traverseAndInstall(global, name.split('.'), mock);
export const installGlobalMock = (name, mock) => globalMocks.push(createMock(name, mock));
export const uninstallGlobalMocks = () => {
    globalMocks.reduceRight((_, undo) => undo(), undefined);
    globalMocks = [];
};