import {webext} from './webExtApi';
import {Cookie} from './cookie';
import {maybeOf} from 'wellmaybe';

export const getCookies =
    maybeOf(webext.getAllCookies())
        .then(pureCookies => pureCookies.map(cookieDef => new Cookie(cookieDef)));
