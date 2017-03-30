
const proxyquire = require('proxyquire').noCallThru();

function asPromise(data) {
    return new Promise((resolve, reject) => {
        resolve(data);
    });
}

describe("createListItems", function () {

    it("creates list item for whitelist domains from storage", function (done) {
        let webext = {
            getStorage: (_) => {
                return asPromise({whitelistDomains: ['heise.de', 'google.com']});
            },
            getAllCookies: () => {
                return asPromise([]);
            }
        };

        const WhilteListModel = proxyquire('../src/settings/whitelistmodel', {'../webExtApi': {webext:webext}}).WhilteListModel;

        new WhilteListModel().getItems()
            .then((items) => {
                let array = Array.from(items);
                expect(array).toEqual([{value:'heise.de', isApplied:true}, {value:'google.com', isApplied:true}]);
                done();
            });
    });
});
