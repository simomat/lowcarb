import {assertThat, is} from 'hamjest';
import {spy, wasCalledWith} from 'spyjest';
import {ModelStore} from '../src/options/modelstore';

import {whenResolved, uninstallGlobalMocks, installGlobalMock} from './testutils';

const installSendMessage = sendMessage => installGlobalMock('browser.runtime.sendMessage', sendMessage);

describe("ModelStore", function () {

    afterEach(uninstallGlobalMocks);

    it("getModel calls sendMessage with requestParam", function () {
        let sendMessage = spy(() => Promise.resolve(1));
        installSendMessage(sendMessage);
        let modelStore = new ModelStore();

        modelStore.getModel();

        assertThat(sendMessage, wasCalledWith({command: 'requestCookieWhitelist'}).times(1));
    });

    it("getModel returns Model with items of sendMessage", function (done) {
        let items = ['a', 'b'];
        installSendMessage(spy(() => Promise.resolve(items)));
        let modelStore = new ModelStore();

        whenResolved(modelStore.getModel())
            .then(model => assertThat(model.getItems(), is(items)))
            .and(done);
    });

    it("persist calls sendMessage with items of model", function () {
        let items = ['a', 'b'];
        let sendMessage = spy();
        installSendMessage(sendMessage);
        let modelStore = new ModelStore();

        modelStore.persist({getItems: () => items});

        assertThat(sendMessage, wasCalledWith({command: 'persistCookieWhitelist', data: items}));
    });
});

