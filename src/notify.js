import {clearNotification, createNotification, getIntMessage} from './webext';
import {ifNotifyOnRemovedCookies} from './settings';
import {createAlarmRemoveNotification} from './alarm';

export const clearRemoveNotification = () => clearNotification('lowcarb-cookies-removed');
export const notifyCookiesRemoved = cookies => {
    cookies = cookies.filter(c => c !== null);
    if (cookies.length === 0) {
        return true;
    }

    ifNotifyOnRemovedCookies()
        .map(() => createNotification(
            'lowcarb-cookies-removed',
            {
                type: 'basic',
                title: 'Firefox Cookies ' + getIntMessage('removed'),
                message: getIntMessage('removedXCookies', cookies.length)
            }))
        .map(() => createAlarmRemoveNotification(0.5));

    return true;
};
