import {maybeOf} from 'wellmaybe';
import {getBrowserInfo, getPlatformInfo} from './webext';

export const returnTrue = () => true;
export const getElement = id => document.getElementById(id);

export const applyTo = fun => arg => {
    fun(arg);
    return arg;
};

export const safeMaybeOf = fn => {
    try {
        return maybeOf(fn());
    } catch (e) {
        console.log('api call threw an error: ' + e);
        return maybeOf();
    }
};

export const removeDuplicates = domains => Array.from(new Set(domains));

const toBranchInt = versionString => parseInt(versionString.substr(0,2));

export const getEnv = () =>
    getPlatformInfo()
        .map(platform => getBrowserInfo()
                .map(browser => ({
                        os: platform.os,
                        branch: toBranchInt(browser.version)})));

export const ifIsAndroid = () => getPlatformInfo().map(platform => platform.os === 'android');