import {createAlarm} from './webext';


export const createAlarmRemoveNotification = delayInMinutes => createAlarm('cookies-removed-notification-expired', {delayInMinutes});