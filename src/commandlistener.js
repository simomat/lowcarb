import {webext} from './webExtApi';

export class CommandListener {
    constructor() {
        let nothing = () => undefined;
        this.removeCookies = nothing;
        this.requestCookieWhitelist = nothing;
        this.persistCookieWhitelist = nothing;
        this.refresh = nothing;

        webext.addMessageListener(message => this.handleMessage(message));
    }

    handleMessage(message) {
        if (message.command === 'removeCookies') {
            return this.removeCookies();
        }
        if (message.command === 'requestCookieWhitelist') {
            return this.requestCookieWhitelist();
        }
        if (message.command === 'persistCookieWhitelist') {
            return this.persistCookieWhitelist(message.data);
        }
        if (message.command === 'refresh') {
            return this.refresh();
        } else {
            console.log('handleMessage: unknown message: ' + JSON.stringify(message))
        }
    }

    onRemoveCookies(handler) {
        this.removeCookies = handler;
    }

    onRequestCookieWhitelist(handler) {
        this.requestCookieWhitelist = handler;
    }

    onPersistCookieWhitelist(handler) {
        this.persistCookieWhitelist = handler;
    }

    onRefresh(handler) {
        this.refresh = handler;
    }
}
