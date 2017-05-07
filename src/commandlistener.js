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

export const onCommandRemoveCookies = setHandler('removeCookies');
export const onCommandRequestDomainCookieItems = setHandler('requestDomainCookieItems');
export const onCommandPersistDomainCookieItems = setHandler('persistDomainCookieItems');

export const test_handleMessage = handleMessage;