import {maybeOf} from 'wellmaybe';
import {returnTrue} from './utils';

const voidPromise = promise => promise.then(returnTrue);
const safeMaybeOf = fn => {
    try {
        return maybeOf(fn());
    } catch (e) {
        console.log('api call threw an error: ' + e);
        return maybeOf();
    }
};

export const getAllCookies = () => safeMaybeOf(() => browser.cookies.getAll({}));
export const removeCookie = param => browser.cookies.remove(param);
export const sendMessage = message => safeMaybeOf(() => browser.runtime.sendMessage(message));
export const addMessageListener = browser.runtime.onMessage.addListener;
export const setStorage = object => voidPromise(browser.storage.local.set(object));
export const getStorage = key => safeMaybeOf(() => browser.storage.local.get(key));
export const addBrowserActionListener = browser.browserAction.onClicked.addListener;
export const openOptionsPage = () => browser.runtime.openOptionsPage();
export const getIntMessage = browser.i18n.getMessage;