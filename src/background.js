import {CommandListener} from "./commandlistener";
import {CookieWhitelistStorage} from "./cookiewhiteliststorage";
import {CookieRemover} from './removecookies';
import {CookieStorage} from './cookiestorage';
import {WhitelistDomainStorage} from './whitelistdomainstorage';

const cookieStorage = new CookieStorage();
const whitelistDomainStorage = new WhitelistDomainStorage();

const cookieWhitelistStorage = new CookieWhitelistStorage(cookieStorage, whitelistDomainStorage);
const commandListener = new CommandListener();

commandListener.onPersistCookieWhitelist(items => cookieWhitelistStorage.setItems(items));
commandListener.onRequestCookieWhitelist(() => cookieWhitelistStorage.getItems());

commandListener.onRemoveCookies(() => {
    whitelistDomainStorage.getDomains()
        .then(domains => new CookieRemover(cookieStorage).removeCookiesOf(domains))
        .then(() => cookieStorage.flush());
});
