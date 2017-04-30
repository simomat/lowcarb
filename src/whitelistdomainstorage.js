import {getStorage, setStorage} from './webext';

export const getWhitelistDomains = () =>
    getStorage('whitelistDomains')
        .map(storage => storage.whitelistDomains)
        .orElse(() => []);

export const setWhitelistDomains = domains => setStorage({whitelistDomains: domains});