import {removeCookies} from './removecookies';
import {ifRemoveCookiesOnStartup} from './settings';
import {setupActionButton} from './actionbuttons';
import {onAlarmClearRemoveNotification} from './alarm';
import {clearRemoveNotification} from './notify';

onAlarmClearRemoveNotification(clearRemoveNotification);
setupActionButton();
ifRemoveCookiesOnStartup().map(removeCookies);
