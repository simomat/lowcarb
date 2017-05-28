import {getStorage, setStorage} from './storage';
import {removeDuplicates, returnTrue} from './utils';

export const getWhitelistDomains = () =>
    getStorage('whitelistDomains')
        .map(storage => storage.whitelistDomains)
        .map(removeDuplicates)
        .orElse(() => []);

const ifNotEqual = arrayA => arrayB => {
    let setB = new Set(arrayB);
    return !arrayA.every(d => setB.delete(d)) || setB.size > 0;
};

export const setWhitelistDomains = whitelistDomains =>
    getWhitelistDomains()
        .map(ifNotEqual(whitelistDomains))
        .map(() => setStorage({whitelistDomains}))
        .orElse(returnTrue);
