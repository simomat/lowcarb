import {getStorage} from './storage';

const removeDuplicates = domains => Array.from(new Set(domains));

export const getWhitelistDomains = () =>
    getStorage('whitelistDomains')
        .map(storage => storage.whitelistDomains)
        .map(removeDuplicates)
        .orElse(() => []);


