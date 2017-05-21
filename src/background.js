import {removeCookies} from './removecookies';
import {onCommandPersistDomainCookieItems, onCommandRemoveCookies, onCommandRequestDomainCookieItems} from './commandlistener';
import {getDisplayItems, setDisplayItems} from './displayitems';
import {ifRemoveCookiesOnStartup} from './settings';
import {setupActionButton} from './actionbuttons';
import {doMigrationCheck} from './migrate';

doMigrationCheck()
    .map(() => {
        onCommandPersistDomainCookieItems(setDisplayItems);
        onCommandRequestDomainCookieItems(getDisplayItems);
        onCommandRemoveCookies(removeCookies);

        setupActionButton();

        ifRemoveCookiesOnStartup()
            .map(removeCookies);
    });