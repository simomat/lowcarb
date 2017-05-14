import {maybeOf} from 'wellmaybe';
import {getSyncStorage, setSyncStorage} from './webext';

export const setStorage = object =>
    maybeOf(object)
        .map(setSyncStorage);

export const getStorage = key => getSyncStorage(key);
