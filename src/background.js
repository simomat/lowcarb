import {removeCookies} from './removecookies';
import {onCommandPersistDomainCookieItems, onCommandRemoveCookies, onCommandRequestDomainCookieItems} from './commandlistener';
import {getDisplayItems, setDisplayItems} from './displayitems';
import {ifRemoveCookiesOnStartup} from './settings';
import {setupActionButton} from './actionbuttons';
import {doMigrationCheck} from './migrate';
import {onAlarmClearRemoveNotification} from './alarm';
import {clearRemoveNotification} from './notify';

doMigrationCheck()
    .map(() => {
        onCommandPersistDomainCookieItems(setDisplayItems);
        onCommandRequestDomainCookieItems(getDisplayItems);
        onCommandRemoveCookies(removeCookies);
        onAlarmClearRemoveNotification(clearRemoveNotification);

        setupActionButton();

        ifRemoveCookiesOnStartup().map(removeCookies);
    });