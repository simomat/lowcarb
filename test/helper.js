
function createProxy() {
    return new Proxy({isProxy:true}, {
        get: (target, name) => {
            let value = target[name];
            if (value === undefined) {
                value = createProxy();
                target[name] = value;
            }
            return value;
        },
        set: (target, name, value) => {
            target[name] = value;
            return true;
        }
    })
}

global.browser = createProxy();


let globalMocks = [];

global.mockGlobal = function (name, value) {

    function installMock(parent, nameParts) {
        let [name, ...restNames] = nameParts;
        parent[name] = restNames.reduceRight((tail, namePart) => {
            let newTail = createProxy();
            newTail[namePart] = tail;
        }, value);
    }

    function installOnLastDefined(current, nameChain) {
        let [name, ...restNames] = nameChain;
        if (name === undefined) {
            return null; // all
        }

        let object = currentParent[name];
        if (object === undefined) {
            installMock(current, nameChain);
        } else {
            installOnLastDefined(object, restNames);
        }
    }

    installOnLastDefined(global, name.split('.'));

};

global.uninstallMocks = function () {
    console.log('uninstall');
};