import {Maybe} from 'wellmaybe';
import {getSyncStorage, setSyncStorage} from './webext';

const defaultSettings = Object.freeze({
    removeOnStartup: false,
    notifyCookiesRemoved: false
});

const extractSettings = storage => Maybe.of(storage.settings).orElse(() => ({...defaultSettings }));

export const loadSettings = () => getSyncStorage('settings').map(extractSettings);
export const saveSettings = settings => setSyncStorage({settings});
export const ifNotifyOnRemovedCookies = () => loadSettings().map(settings => settings.notifyCookiesRemoved);
export const test_loadSettings = loadSettings;
