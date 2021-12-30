import {Maybe} from 'wellmaybe';
import {getStorage} from './storage';

const defaultSettings = {
    removeOnStartup: false,
    notifyCookiesRemoved: false
};

const extractSettings = storage => Maybe.of(storage.settings).orElse(() => ({...defaultSettings }));

export const loadSettings = () => getStorage('settings').map(extractSettings);
export const ifNotifyOnRemovedCookies = () => loadSettings().map(settings => settings.notifyCookiesRemoved);
export const test_loadSettings = loadSettings;
