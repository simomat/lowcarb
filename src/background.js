import {CommandListener} from "./commandlistener";
import {CookieWhitelistStorage} from "./cookiewhiteliststorage";
import {CookieStorage} from './cookiestorage';
import {WhitelistDomainStorage} from './whitelistdomainstorage';
import {loadSettings} from "./settings";
import {createDomainFromString} from './domain';
import {CookieFilter} from "./domainfilter";

const cookieStorage = new CookieStorage();
const whitelistDomainStorage = new WhitelistDomainStorage();

const getPureDomains = () => whitelistDomainStorage.getDomains();
const toDomainObjects = pureDomains => pureDomains.map(createDomainFromString);
const getDomains = () => getPureDomains().then(toDomainObjects);
const getCookies = () => cookieStorage.getCookies();

const filterCookiesThatMatch = cookies => domains => new CookieFilter(domains).filterDomainNotMatches(cookies);
const filterMatchingDomains = cookies => getDomains().then(filterCookiesThatMatch(cookies));
const removeTheCookies = cookies => Promise.all(cookies.map(cookie => cookie.remove()));

const flushCookieStorage = () => cookieStorage.flush();

const removeCookies = () =>
    getCookies()
        .then(filterMatchingDomains)
        .then(removeTheCookies)
        .then(flushCookieStorage);

const flushCache = () => {
    flushCookieStorage();
    whitelistDomainStorage.flush();
};

const cookieWhitelistStorage = new CookieWhitelistStorage(cookieStorage, whitelistDomainStorage);
const commandListener = new CommandListener();

commandListener.onPersistCookieWhitelist(items => cookieWhitelistStorage.setItems(items));
commandListener.onRequestCookieWhitelist(() => cookieWhitelistStorage.getItems());
commandListener.onRefresh(flushCache);
commandListener.onRemoveCookies(removeCookies);

const ifRemoveCookiesOnStartup = () =>
    loadSettings()
        .then(settings => {
            if (settings.removeOnStartup) {
                return Promise.resolve();
            }
            return Promise.reject();
        });

ifRemoveCookiesOnStartup()
    .then(removeCookies);


let f = i => i * 2.5;

class Maybe {
    constructor(value) {
        this.value = value;
    }

    static of(value) {
        return new Maybe(value);
    }

    then(fn) {
        if (this.value != null) {
            return fn(this.value);
        }
        
    }
}
