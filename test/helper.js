
function createProxy() {
    return new Proxy({}, {
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


let globalMocks = {};

global.mockGlobal = function (name, value) {

    let mockDescriptor = {};

    let root = global[val];
    mockDescriptor.oldValue = root;
    if (root === undefined) {
        root = createProxy();
    }

    let tail = root;
    name.split('.').reduce((acc, val) => {
        let oldValue = tail[val];
    }, tail);



    globalMocks
};

global.uninstallMocks = function () {
    console.log('uninstall');
};