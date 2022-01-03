import {getSyncStorage} from './webext';

const removeDuplicates = domains => Array.from(new Set(domains));

export const getWhitelistDomains = () => 
    getSyncStorage('whitelistDomains')
        .map(storage => storage.whitelistDomains)
        .map(removeDuplicates)
        .orElse(() => []);


