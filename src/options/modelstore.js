import {sendCommand} from '../commandlistener';

export const getModelItems = () =>
    sendCommand('requestDomainCookieItems')
        .map(items => Array.isArray(items) && items.length > 0 ? items : false);

export const setModelItems = modelItems => sendCommand('persistDomainCookieItems', modelItems);