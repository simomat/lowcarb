import {maybeOf} from 'wellmaybe';
import {addMessageListener} from './webext';

const handlers = {};
const getHandler = command => maybeOf(handlers[command]);
const setHandler = command => handler => handlers[command] = handler;

const applyHandler = message => handler => handler(maybeOf(message.data));

const handleMessage = message =>
    getHandler(message.command)
        .orElse(() => console.log('handleMessage: unknown message: ' + JSON.stringify(message)))
        .map(applyHandler(message))
        .asPromise();

addMessageListener(handleMessage);

export const onRemoveCookies = setHandler('removeCookies');
export const onRequestDomainCookieItems = setHandler('requestDomainCookieItems');
export const onPersistDomainCookieItems = setHandler('persistDomainCookieItems');

export const test_handleMessage = handleMessage;