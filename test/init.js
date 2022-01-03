import {createMock} from './globalMock';

let apiObjects = [
    'browser.cookies.remove',
    'browser.cookies.getAll',
    'browser.runtime.onStartup.addListener',
    'browser.runtime.openOptionsPage',
    'browser.storage.local.clear',
    'browser.storage.sync.get',
    'browser.storage.sync.set',
    'browser.browserAction.onClicked.addListener',
    'browser.notifications.create',
    'browser.notifications.clear',
    'browser.i18n.getMessage',
    'browser.alarms.create',
    'browser.alarms.onAlarm.addListener',
    'browser.alarms.get',
    'document.getElementById',
    'document.createElement'
];

for (let apiObject of apiObjects) {
    createMock(apiObject, () => {});
}