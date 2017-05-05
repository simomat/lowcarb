import {ifRemoveCookiesOnStartup} from './settings';
import {removeCookies} from './removecookies';
import {onPersistDomainCookieItems, onRemoveCookies, onRequestDomainCookieItems} from './commandlistener';
import {getDisplayItems, setDisplayItems} from './displayitems';
import {addBrowserActionListener, openOptionsPage} from './webext';

onPersistDomainCookieItems(setDisplayItems);
onRequestDomainCookieItems(getDisplayItems);
onRemoveCookies(removeCookies);

ifRemoveCookiesOnStartup()
    .map(removeCookies);

addBrowserActionListener(openOptionsPage);