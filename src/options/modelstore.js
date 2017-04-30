import {sendMessage} from '../webext';

export const getModelItems = () =>
    sendMessage({command: 'requestDomainCookieItems'});

export const setModelItems = modelItems =>
    sendMessage({command: 'persistDomainCookieItems', data: modelItems});