import {createMock} from './globalMock';

let apiObjects = [
    'browser.cookies.remove',
    'browser.cookies.getAll',
    'browser.runtime.onStartup.addListener',
    'browser.runtime.sendMessage',
    'browser.runtime.openOptionsPage',
    'browser.runtime.onMessage.addListener',
    'browser.runtime.onMessage.removeListener',
    'browser.storage.local.clear',
    'browser.storage.sync.get',
    'browser.storage.sync.set',
    'browser.browserAction.onClicked.addListener',
    'browser.notifications.create',
    'browser.i18n.getMessage',
    'document.getElementById',
    'document.createElement'
];

for (let apiObject of apiObjects) {
    createMock(apiObject, () => {});
}