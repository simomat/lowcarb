import {normalizeDomain} from './domain';

const getProtocol = cookie => {
    if (cookie.secure) {
        return 'https://';
    }
    return 'http://';
};

export const toRemoveParameter = cookie => ({
    url: urlOfCookie(cookie),
    storeId: cookie.storeId,
    name: cookie.name
});

export const urlOfCookie = cookie => {
    if (cookie.url) {
        return cookie.url;
    }
    return getProtocol(cookie) + normalizeDomain(cookie.domain) + cookie.path;
};