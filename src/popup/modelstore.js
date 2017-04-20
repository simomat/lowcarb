import {webext} from '../webExtApi';
import {Model} from "./model";

export class ModelStore {
    getModel() {
        return webext.sendMessage({command: 'requestCookieWhitelist'})
            .then(items => new Model(items));
    }

    persist(model) {
        return webext.sendMessage({command: 'persistCookieWhitelist', data: model.getItems()});
    }
}
