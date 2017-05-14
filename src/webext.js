import {maybeOf} from 'wellmaybe';
import {applyTo, safeMaybeOf} from './utils';

export const getAllCookies = () => safeMaybeOf(() => browser.cookies.getAll({}));
export const removeCookie = param => browser.cookies.remove(param);
export const sendMessage = message => safeMaybeOf(() => browser.runtime.sendMessage(message));
export const openOptionsPage = () => browser.runtime.openOptionsPage();
export const getIntMessage = browser.i18n.getMessage;

export const createNotification = (id, param) => browser.notifications.create(id, param);

export const setSyncStorage = applyTo(object => browser.storage.sync.set(object));
export const getSyncStorage = key => safeMaybeOf(() => browser.storage.sync.get(key));

export const onMessage = browser.runtime.onMessage.addListener;
export const onBrowserActionClicked = browser.browserAction.onClicked.addListener;
