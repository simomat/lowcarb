import 'babel-polyfill'
import {assertThat, is, contains, FeatureMatcher, not} from 'hamjest';
import {WhiteListModel} from '../src/settings/whitelistmodel';


function asPromise(data) {
    return new Promise((resolve, reject) => {
        resolve(data);
    });
}

const array = Array.from;

describe("WhiteListModel", function () {

    it("getItems() creates list item for whitelist domains from storage", function (done) {
        let apiMock = {
            getStorage: (_) => {
                return asPromise({whitelistDomains: ['heise.de', 'google.com']});
            },
            getAllCookies: () => {
                return asPromise([]);
            }
        };

        new WhiteListModel(apiMock).getItems()
            .then((items) => {
                assertThat(array(items), contains({value: 'google.com', isApplied: true}, {value: 'heise.de', isApplied: true}));
                done();
            })
            .catch((e) => { done(e); });
    });

    it("getItems() creates list items for cookies ordered backwards", function (done) {
        let apiMock = {
            getStorage: (_) => {
                return asPromise({whitelistDomains: []});
            },
            getAllCookies: () => {
                return asPromise([{domain: 'aaa.xxx.zzz'}, {domain: 'mmm.kkk.xxx.ccc'}]);
            }
        };

        new WhiteListModel(apiMock).getItems()
            .then((items) => {
                let array = Array.from(items);
                assertThat(array, contains({value: 'mmm.kkk.xxx.ccc', isApplied: false},
                                            {value: 'aaa.xxx.zzz',isApplied: false}));
                done();
            })
            .catch((e) => { done(e); });
    });

    it("getItems() creates list items for cookies with normalized domain", function (done) {
        let api = {
            getStorage: (_) => {
                return asPromise({whitelistDomains: []});
            },
            getAllCookies: () => {
                return asPromise([{domain: '.aAa.XxX.zZz'}]);
            }
        };

        new WhiteListModel(api).getItems()
            .then((items) => {
                assertThat(array(items), contains({value: 'aaa.xxx.zzz', isApplied: false}));
                done();
            })
            .catch((e) => { done(e); });
    });

    it("getItems() creates list items for cookies that has no duplicates", function (done) {
        let api = {
            getStorage: (_) => {
                return asPromise({whitelistDomains: []});
            },
            getAllCookies: () => {
                return asPromise([{domain: 'aaa.xxx.zzz'}, {domain: 'aaa.xxx.zzz'}]);
            }
        };

        new WhiteListModel(api).getItems()
            .then((items) => {
                assertThat(array(items), contains({value: 'aaa.xxx.zzz', isApplied: false}));
                done();
            })
            .catch((e) => { done(e); });
    });

    it("getItems() creates list items for whitelist domains before cookie domains, if not in cookie domains", function (done) {
        let api = {
            getStorage: (_) => {
                return asPromise({whitelistDomains: ['zzz.zzz']});
            },
            getAllCookies: () => {
                return asPromise([{domain: 'aaa.aaa'}]);
            }
        };

        new WhiteListModel(api).getItems()
            .then((items) => {
                assertThat(array(items), contains({value: 'aaa.aaa', isApplied: false}, {value: 'zzz.zzz', isApplied: true}));
                done();
            })
            .catch((e) => { done(e); });
    });

    it("getItems() creates list items for whitelist domains activated within cookie domains, if domains is equal", function (done) {
        let api = {
            getStorage: (_) => {
                return asPromise({whitelistDomains: ['zZz.Zzz']});
            },
            getAllCookies: () => {
                return asPromise([{domain: 'aaa.aaa'}, {domain: 'zzz.zzz'}, {domain: '.zZz.ZzZ'}]);
            }
        };

        new WhiteListModel(api).getItems()
            .then((items) => {
                assertThat(array(items), contains({value: 'aaa.aaa', isApplied: false}, {value: 'zzz.zzz', isApplied: true}));
                done();
            })
            .catch((e) => { done(e); });
    });

    it("setItems() saves 'applied' items as new whitelist", function (done) {
        let api = {
            setStorage: (whitelistDomains) => {
                assertThat(whitelistDomains, is({whitelistDomains: ['ccc.ddd']}));
                done();
            }
        };

        new WhiteListModel(api).saveItems([{value: 'aaa.bbb', isApplied: false}, {value: 'ccc.ddd', isApplied: true}]);
    });
});
