import {maybeOf} from 'wellmaybe';
import {webext} from "./webExtApi";

export const getWhitelistDomains = () =>
    maybeOf(webext.getStorage('whitelistDomains'))
        .then(storage => storage.whitelistDomains)
        .orElse(() => []);

export const setWhitelistDomains = domains =>
    maybeOf(webext.setStorage({whitelistDomains: domains}));