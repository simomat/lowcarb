import {maybeOf} from 'wellmaybe';

const voidPromise = promise => promise.then(() => true);

export const getAllCookies = () => maybeOf(browser.cookies.getAll({}));
export const removeCookie = param => browser.cookies.remove(param);
export const sendMessage = message => maybeOf(browser.runtime.sendMessage(message));
export const addMessageListener = browser.runtime.onMessage.addListener;
export const setStorage = object => voidPromise(browser.storage.local.set(object));
export const getStorage = key => maybeOf(browser.storage.local.get(key));