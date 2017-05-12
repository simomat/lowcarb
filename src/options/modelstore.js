import {sendMessage} from '../webext';

export const getModelItems = () =>
    sendMessage({command: 'requestDomainCookieItems'})
        .map(items => Array.isArray(items) && items.length > 0 ? items : false);

export const setModelItems = modelItems =>
    sendMessage({command: 'persistDomainCookieItems', data: modelItems});