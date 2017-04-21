import {CommandListener} from "./commandlistener";
import {CookieWhitelistStorage} from "./cookiewhiteliststorage";
import {removeCookies} from './removecookies';

const cookieWhitelistStorage = new CookieWhitelistStorage();
const commandListener = new CommandListener();

commandListener.onPersistCookieWhitelist(items => cookieWhitelistStorage.setItems(items));
commandListener.onRequestCookieWhitelist(() => cookieWhitelistStorage.getItems());

commandListener.onRemoveCookies(() => {
    cookieWhitelistStorage.getItems()
        .then(items =>
            removeCookies(
                items.filter(item => item.isApplied),
                items.filter(item => !item.isApplied))
        );
});
