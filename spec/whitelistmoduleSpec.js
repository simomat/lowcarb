
const proxyquire = require('proxyquire').noCallThru();

function asPromise(data) {
    return new Promise((resolve, reject) => {
        resolve(data);
    });
}

describe("WhiteListModel", function () {

    it("getItems() creates list item for whitelist domains from storage", function (done) {
        let webext = {
            getStorage: (_) => {
                return asPromise({whitelistDomains: ['heise.de', 'google.com']});
            },
            getAllCookies: () => {
                return asPromise([]);
            }
        };

        const WhilteListModel = proxyquire('../src/settings/whitelistmodel', {'../webExtApi': {webext:webext}}).WhiteListModel;

        new WhilteListModel().getItems()
            .then((items) => {
                let array = Array.from(items);
                expect(array).toEqual([{value:'google.com', isApplied:true}, {value:'heise.de', isApplied:true}]);
                done();
            });
    });

    it("getItems() creates list items for cookies ordered backwards", function (done) {
        let webext = {
            getStorage: (_) => {
                return asPromise({whitelistDomains: []});
            },
            getAllCookies: () => {
                return asPromise([{domain:'aaa.xxx.zzz'},{domain:'mmm.kkk.xxx.ccc'}]);
            }
        };

        const WhilteListModel = proxyquire('../src/settings/whitelistmodel', {'../webExtApi': {webext:webext}}).WhiteListModel;

        new WhilteListModel().getItems()
            .then((items) => {
                let array = Array.from(items);
                expect(array).toEqual([{value:'mmm.kkk.xxx.ccc', isApplied:false}, {value:'aaa.xxx.zzz', isApplied:false}]);
                done();
            });
    });

    it("getItems() creates list items for cookies with normalized domain", function (done) {
        let webext = {
            getStorage: (_) => {
                return asPromise({whitelistDomains: []});
            },
            getAllCookies: () => {
                return asPromise([{domain:'.aAa.XxX.zZz'}]);
            }
        };

        const WhilteListModel = proxyquire('../src/settings/whitelistmodel', {'../webExtApi': {webext:webext}}).WhiteListModel;

        new WhilteListModel().getItems()
            .then((items) => {
                let array = Array.from(items);
                expect(array).toEqual([{value:'aaa.xxx.zzz', isApplied:false}]);
                done();
            });
    });

    it("getItems() creates list items for cookies that has no duplicates", function (done) {
        let webext = {
            getStorage: (_) => {
                return asPromise({whitelistDomains: []});
            },
            getAllCookies: () => {
                return asPromise([{domain:'aaa.xxx.zzz'}, {domain:'aaa.xxx.zzz'}]);
            }
        };

        const WhilteListModel = proxyquire('../src/settings/whitelistmodel', {'../webExtApi': {webext:webext}}).WhiteListModel;

        new WhilteListModel().getItems()
            .then((items) => {
                let array = Array.from(items);
                expect(array).toEqual([{value:'aaa.xxx.zzz', isApplied:false}]);
                done();
            });
    });

    it("getItems() creates list items for whitelist domains before cookie domains, if not in cookie domains", function (done) {
        let webext = {
            getStorage: (_) => {
                return asPromise({whitelistDomains: ['zzz.zzz']});
            },
            getAllCookies: () => {
                return asPromise([{domain:'aaa.aaa'}]);
            }
        };

        const WhilteListModel = proxyquire('../src/settings/whitelistmodel', {'../webExtApi': {webext:webext}}).WhiteListModel;

        new WhilteListModel().getItems()
            .then((items) => {
                let array = Array.from(items);
                expect(array).toEqual([{value:'aaa.aaa', isApplied:false},{value:'zzz.zzz', isApplied:true}]);
                done();
            });
    });

    it("getItems() creates list items for whitelist domains activated within cookie domains, if domains is equal", function (done) {
        let webext = {
            getStorage: (_) => {
                return asPromise({whitelistDomains: ['zZz.Zzz']});
            },
            getAllCookies: () => {
                return asPromise([{domain:'aaa.aaa'},{domain:'zzz.zzz'},{domain:'.zZz.ZzZ'}]);
            }
        };

        const WhilteListModel = proxyquire('../src/settings/whitelistmodel', {'../webExtApi': {webext:webext}}).WhiteListModel;

        new WhilteListModel().getItems()
            .then((items) => {
                let array = Array.from(items);
                expect(array).toEqual([{value:'aaa.aaa', isApplied:false},{value:'zzz.zzz', isApplied:true}]);
                done();
            });
    });

    it("setItems() saves 'applied' items as new whitelist", function (done) {
        let webext = {
            setStorage: (whitelistDomains) => {
                expect(whitelistDomains).toEqual({whitelistDomains:['ccc.ddd']});
                done();
            }
        };

        const WhilteListModel = proxyquire('../src/settings/whitelistmodel', {'../webExtApi': {webext:webext}}).WhiteListModel;

        new WhilteListModel().saveItems([{value:'aaa.bbb', isApplied:false}, {value:'ccc.ddd', isApplied:true}]);
    });
});
