
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
        }
    })
}

global.browser = createProxy();
