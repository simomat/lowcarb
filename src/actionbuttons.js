import {getEnv} from './utils';
import {onBrowserActionClicked, openOptionsPage} from './webext';

const createOptionsTab = tabInfo => browser.tabs.create(tabInfo);
const openOptionsPageAsTab = () => {
    let url = browser.runtime.getURL('options/options.html');
    return browser.tabs.query({})
        .then(tabs => {
            let tab = tabs.filter(t => t.url === url).pop();
            if (tab) {
                return browser.tabs.update(tab.id, {active: true});
            }
            return createOptionsTab({url});
        })
        .catch(() => createOptionsTab({url}));
};

export const setupActionButton = () => {
    getEnv().map(env => {
        if (env.os === 'android' && env.branch >= 54) {
            browser.pageAction.onClicked.removeListener(openOptionsPageAsTab);
            browser.pageAction.onClicked.addListener(openOptionsPageAsTab);
            browser.pageAction.hide(1);
            browser.pageAction.show(1);
        }

        if (env.os !== 'android') {
            onBrowserActionClicked(openOptionsPage);
        }
    });
};