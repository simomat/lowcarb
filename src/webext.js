import {maybeOf} from 'wellmaybe';
import {returnTrue} from './utils';

const voidPromise = promise => promise.then(returnTrue);

export const getAllCookies = () => maybeOf(browser.cookies.getAll({}));
export const removeCookie = param => browser.cookies.remove(param);
export const sendMessage = message => maybeOf(browser.runtime.sendMessage(message));
export const addMessageListener = browser.runtime.onMessage.addListener;
export const setStorage = object => voidPromise(browser.storage.local.set(object));
export const getStorage = key => maybeOf(browser.storage.local.get(key));
export const addBrowserActionListener = browser.browserAction.onClicked.addListener;
export const openOptionsPage = () => browser.runtime.openOptionsPage();
export const getIntMessage = browser.i18n.getMessage;