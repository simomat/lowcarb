import {CommandListener} from "./commandlistener";
import {getDisplayItems, setDisplayItems} from "./cookiewhiteliststorage";
import {getCookies} from './cookiestorage';
import {getWhitelistDomains} from './whitelistdomainstorage';
import {loadSettings} from "./settings";
import {createDomainFromString} from './domain';
import {CookieFilter} from "./domainfilter";

const toDomainObjects = pureDomains => pureDomains.map(createDomainFromString);
const getDomains = () =>
    getWhitelistDomains()
        .then(toDomainObjects);

const filterCookiesThatMatch = cookies => domains => new CookieFilter(domains).filterDomainNotMatches(cookies);
const filterMatchingDomains = cookies => getDomains().then(filterCookiesThatMatch(cookies));
const removeTheCookies = cookies => Promise.all(cookies.map(cookie => cookie.remove()));

const removeCookies = () =>
    getCookies()
        .then(filterMatchingDomains)
        .then(removeTheCookies);

const commandListener = new CommandListener();

commandListener.onPersistCookieWhitelist(items => setDisplayItems(items));
commandListener.onRequestCookieWhitelist(() => getDisplayItems());
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
