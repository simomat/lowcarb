import {removeCookies} from './removecookies';
import {onCommandPersistDomainCookieItems, onCommandRemoveCookies, onCommandRequestDomainCookieItems} from './commandlistener';
import {getDisplayItems, setDisplayItems} from './displayitems';
import {ifRemoveCookiesOnStartup} from './settings';
import {setupActionButtons} from './actionbuttons';

onCommandPersistDomainCookieItems(setDisplayItems);
onCommandRequestDomainCookieItems(getDisplayItems);
onCommandRemoveCookies(removeCookies);

setupActionButtons();

ifRemoveCookiesOnStartup()
    .map(removeCookies);
