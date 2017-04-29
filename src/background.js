// import {CommandListener} from "./commandlistener";
// import {getDisplayItems, setDisplayItems} from "./cookiewhiteliststorage";

import {ifRemoveCookiesOnStartup} from './settings';
import {removeCookies} from './removecookies';

//
// const commandListener = new CommandListener();
//
// commandListener.onPersistCookieWhitelist(items => setDisplayItems(items));
// commandListener.onRequestCookieWhitelist(() => getDisplayItems());
// commandListener.onRemoveCookies(removeCookies);

ifRemoveCookiesOnStartup()
    .then(removeCookies);


