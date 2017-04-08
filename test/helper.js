
let globalMocks = [];

function mockWebextApi() {

    let apiObjects = [
        'browser.cookies.remove',
        'browser.cookies.getAll',
        'browser.runtime.sendMessage',
        'browser.runtime.onMessage.addListener',
        'browser.storage.local.clear',
        'browser.storage.local.set',
        'browser.storage.local.get'
    ];

    for (let apiObject of apiObjects) {
        createMock(apiObject, () => {});
    }
}
mockWebextApi();

function createMock(name, mock) {

    function proxyChainInstall(nameParts) {
        return nameParts.reduceRight((tail, namePart) => {
            let newHead = {};
            newHead[namePart] = tail;
            return newHead;
        }, mock);
    }

    function installOnLastDefined(currentParent, nameChain) {
        let [name, ...restNames] = nameChain;
        let object = currentParent[name];

        if (object !== undefined && restNames.length > 0) {
            return installOnLastDefined(object, restNames);
        }

        if (object === undefined) {
            currentParent[name] = proxyChainInstall(restNames);

        } else {
            currentParent[name] = mock;
        }

        return {
            parent: currentParent,
            childName: name,
            originalChild: object
        };
    }

    return installOnLastDefined(global, name.split('.'));
}


global.mockGlobal = function (name, mock) {
    let mockInfo = createMock(name, mock);
    globalMocks.push(()=>{
        mockInfo.parent[mockInfo.childName] = mockInfo.originalChild;
    });
};


global.uninstallMocks = function () {
    for (let mockUndoAction of globalMocks) {
        mockUndoAction();
    }
};