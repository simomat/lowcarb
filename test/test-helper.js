import {createMock} from './testutils';

let apiObjects = [
    'browser.cookies.remove',
    'browser.cookies.getAll',
    'browser.runtime.sendMessage',
    'browser.runtime.onMessage.addListener',
    'browser.runtime.onMessage.removeListener',
    'browser.storage.local.clear',
    'browser.storage.local.set',
    'browser.storage.local.get'
];

for (let apiObject of apiObjects) {
    createMock(apiObject, () => {});
}
