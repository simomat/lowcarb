import {CommandListener} from "./commandlistener";
import {CookieWhitelistStorage} from "./cookiewhiteliststorage";
import {CookieRemover} from './removecookies';
import {CookieStorage} from './cookiestorage';
import {WhitelistDomainStorage} from './whitelistdomainstorage';
import {loadSettings} from "./settings";

const cookieStorage = new CookieStorage();
const whitelistDomainStorage = new WhitelistDomainStorage();

const removeCookies = () =>
    whitelistDomainStorage.getDomains()
        .then(domains => new CookieRemover(cookieStorage).removeCookiesOf(domains))
        .then(() => cookieStorage.flush());

const flushCache = () => {
    cookieStorage.flush();
    whitelistDomainStorage.flush();
};

const cookieWhitelistStorage = new CookieWhitelistStorage(cookieStorage, whitelistDomainStorage);
const commandListener = new CommandListener();

commandListener.onPersistCookieWhitelist(items => cookieWhitelistStorage.setItems(items));
commandListener.onRequestCookieWhitelist(() => cookieWhitelistStorage.getItems());
commandListener.onRefresh(flushCache);
commandListener.onRemoveCookies(removeCookies);

loadSettings()
    .then(settings => {
        if (settings.removeOnStartup) {
            removeCookies();
        }
    });