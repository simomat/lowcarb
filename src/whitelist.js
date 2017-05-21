import {getStorage, setStorage} from './storage';
import {removeDuplicates} from './utils';

export const getWhitelistDomains = () =>
    getStorage('whitelistDomains')
        .map(storage => storage.whitelistDomains)
        .map(removeDuplicates)
        .orElse(() => []);

const notEqual = (arrayA, arrayB) => {
    let setB = new Set(arrayB);
    return !arrayA.every(d => setB.delete(d)) || setB.size > 0;
};

export const setWhitelistDomains = whitelistDomains =>
    getWhitelistDomains()
        .map(oldWhitelist => {
            if (notEqual(oldWhitelist, whitelistDomains)) {
                setStorage({whitelistDomains})
            }
            return true;
        });
