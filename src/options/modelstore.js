import {webext} from '../webExtApi';
import {ListModel} from "./listmodel";

export class ModelStore {
    getModel() {
        return webext.sendMessage({command: 'requestCookieWhitelist'})
            .then(items => new ListModel(items));
    }

    persist(model) {
        return webext.sendMessage({command: 'persistCookieWhitelist', data: model.getItems()});
    }
}
