import {createNotification} from './webext';
import {ifNotifyOnRemovedCookies} from './settings';

export const notifyCookiesRemoved = cookies => {
    cookies = cookies.filter(c => c !== null);
    if (cookies.length === 0) {
        return true;
    }

    return ifNotifyOnRemovedCookies()
        .map(() => createNotification(
            'lowcarb-cookies-removed',
            {
                type: 'basic',
                title: 'Firefox Cookies removed',
                message: `lowcarb removed ${names.length} cookies`
            }));
};

