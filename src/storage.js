import {Maybe} from 'wellmaybe';
import {getSyncStorage, setSyncStorage} from './webext';

export const setStorage = object => Maybe.of(object).map(setSyncStorage);
export const getStorage = key => getSyncStorage(key);
