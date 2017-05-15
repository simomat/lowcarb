import {getEnv} from './utils';
import {onBrowserActionClicked, openOptionsPage} from './webext';

const openOptionsPageAsTab = () => {
    browser.tabs.create({
        url: chrome.runtime.getURL('options/options.html')
    });
};

export const setupActionButtons = () => {

    getEnv()
        .map(env => {
            if (env.os === 'android' && env.branch >= 54) {
                browser.pageAction.onClicked.addListener(openOptionsPageAsTab);
                browser.pageAction.hide(1);
                browser.pageAction.show(1);
            }

            if (env.os !== 'android') {
                onBrowserActionClicked(openOptionsPage);
            }
        });

};