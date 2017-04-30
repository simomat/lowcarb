import {ifRemoveCookiesOnStartup} from './settings';
import {removeCookies} from './removecookies';
import {onPersistDomainCookieItems, onRemoveCookies, onRequestDomainCookieItems} from './commandlistener';
import {getDisplayItems, setDisplayItems} from './displayitems';

onPersistDomainCookieItems(setDisplayItems);
onRequestDomainCookieItems(getDisplayItems);
onRemoveCookies(removeCookies);

ifRemoveCookiesOnStartup()
    .map(removeCookies);