import {Maybe} from 'wellmaybe';
import {getSyncStorage} from './webext';

const defaultSettings = {
    removeOnStartup: false,
    notifyCookiesRemoved: false
};

const extractSettings = storage => Maybe.of(storage.settings).orElse(() => ({...defaultSettings }));

export const loadSettings = () => getSyncStorage('settings').map(extractSettings);
export const ifNotifyOnRemovedCookies = () => loadSettings().map(settings => settings.notifyCookiesRemoved);
export const test_loadSettings = loadSettings;
