import {maybeOf} from 'wellmaybe';
import {applyTo, safeMaybeOf} from './utils';

export const getAllCookies = () => safeMaybeOf(() => browser.cookies.getAll({}));
export const removeCookie = param => browser.cookies.remove(param);
export const sendMessage = message => safeMaybeOf(() => browser.runtime.sendMessage(message));
export const addMessageListener = browser.runtime.onMessage.addListener;
export const addBrowserActionListener = browser.browserAction.onClicked.addListener;
export const openOptionsPage = () => browser.runtime.openOptionsPage();
export const getIntMessage = browser.i18n.getMessage;

export const createNotification = (id, param) => browser.notifications.create(id, param);

export const setStorage = applyTo(object => browser.storage.local.set(object));
export const getStorage = key => safeMaybeOf(() => browser.storage.local.get(key));