import {createNotification} from './webext';

export const notifyCookiesRemoved = cookies =>
    createNotification(
        'lowcarb-cookies-removed',
        {
            type: 'basic',
            title: 'Cookies removed',
            message: `${cookies.filter(c => c !== null).length} cookies were removed`
        });
