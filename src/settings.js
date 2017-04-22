import {webext} from './webExtApi';

const defaultSettings = {
    removeOnStartup: false
};

function ensureDefaults(settings) {
    for (let key in defaultSettings) {
        if (settings[key] === undefined) {
            settings[key] = defaultSettings[key];
        }
    }
    return settings;
}

function extractSettings(storage) {
    if (storage === undefined) {
        return {};
    }
    if (storage.settings === undefined) {
        return {};
    }
    return storage.settings;
}

export const loadSettings = () =>
    webext.getStorage('settings')
        .then(storage => ensureDefaults(extractSettings(storage)));

export const saveSetting = (key, value) =>
    loadSettings()
        .then(settings => {
            settings[key] = value;
            return webext.setStorage({settings});
        });