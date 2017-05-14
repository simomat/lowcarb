import {maybeOf} from 'wellmaybe';

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
