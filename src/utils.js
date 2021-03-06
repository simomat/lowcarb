import {Maybe} from 'wellmaybe';
import {getBrowserInfo, getPlatformInfo} from './webext';

export const returnTrue = () => true;
export const getElement = id => document.getElementById(id);
export const safeMaybeOf = fn => {
    try {
        return Maybe.of(fn());
    } catch (e) {
        console.log('api call threw an error: ' + e);
        return Maybe.of();
    }
};
export const removeDuplicates = domains => Array.from(new Set(domains));

const toBranchInt = versionString => parseInt(versionString.substr(0,2));
export const getEnv = () =>
    Maybe.all(getPlatformInfo(), getBrowserInfo())
        .map(([platform, browser]) => ({
            os: platform.os,
            branch: toBranchInt(browser.version)}));

export const ifIsAndroid = () => getPlatformInfo().map(platform => platform.os === 'android');