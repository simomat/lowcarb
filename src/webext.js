import {maybeOf} from 'wellmaybe';
import {applyTo, safeMaybeOf} from './utils';

export const getAllCookies = () => safeMaybeOf(() => browser.cookies.getAll({}));
export const removeCookie = param => browser.cookies.remove(param);
export const sendMessage = message => safeMaybeOf(() => browser.runtime.sendMessage(message));
export const openOptionsPage = () => browser.runtime.openOptionsPage();
export const onStartup = browser.runtime.onStartup.addListener;
export const getIntMessage = browser.i18n.getMessage;

export const createNotification = (id, param) => browser.notifications.create(id, param);

export const setSyncStorage = applyTo(object => browser.storage.sync.set(object));
export const getSyncStorage = key => safeMaybeOf(() => browser.storage.sync.get(key));

export const onMessage = browser.runtime.onMessage.addListener;
export const onBrowserActionClicked = listener => browser.browserAction.onClicked.addListener(listener);

export const getPlatformInfo = () => maybeOf(browser.runtime.getPlatformInfo());
export const getBrowserInfo = () => maybeOf(browser.runtime.getBrowserInfo());
