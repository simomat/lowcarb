import {getStorage, setStorage} from './webext';
import {maybeOf} from 'wellmaybe';

const defaultSettings = {
    removeOnStartup: false
};

const setValue = (key, value) => object => Object.assign(object, {[key]: value});
const getDefaultSettings = () => Object.assign({}, defaultSettings);
const extractSettings = storage =>
    maybeOf(storage.settings)
        .orElse(getDefaultSettings);

const loadSettings = () =>
    getStorage('settings')
        .map(extractSettings);

const saveSetting = (key, value) =>
    loadSettings()
        .map(setValue(key, value))
        .map(settings => setStorage({settings}));

export const ifRemoveCookiesOnStartup = () =>
    loadSettings()
        .map(settings => settings.removeOnStartup);

export const setRemoveCookiesOnStartup = value =>
    saveSetting('removeOnStartup', value);