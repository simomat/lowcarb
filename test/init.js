import {createMock} from './globalMock';

let apiObjects = [
    'browser.cookies.remove',
    'browser.cookies.getAll',
    'browser.runtime.sendMessage',
    'browser.runtime.onMessage.addListener',
    'browser.runtime.onMessage.removeListener',
    'browser.storage.local.clear',
    'browser.storage.local.set',
    'browser.storage.local.get',
    'browser.browserAction.onClicked.addListener',
    'browser.runtime.openOptionsPage',
    'browser.i18n.getMessage',
    'document.getElementById',
    'document.createElement',
    'browser.notifications.create'
];

for (let apiObject of apiObjects) {
    createMock(apiObject, () => {});
}