import 'babel-polyfill'
import {assertThat, is, contains, FeatureMatcher, not} from 'hamjest';
import {WhiteListModel} from '../src/settings/whitelistmodel';


const array = Array.from;

const cookieRepoOf = cookies => ({
        getAllCookies: () => Promise.resolve(cookies.map(cookieDomain => ({domain: cookieDomain})))
});

const whitelistRepoOf = whitelistDomains => ({
        getDomains: () => Promise.resolve(whitelistDomains)
});


describe("WhiteListModel", function () {

    it("getItems() creates list item for whitelist domains from storage", function (done) {
        let cookiesRepo = cookieRepoOf([]);
        let whitelistRepo = whitelistRepoOf(['heise.de', 'google.com']);

        new WhiteListModel(cookiesRepo, whitelistRepo).getItems()
            .then((items) => {
                assertThat(array(items), contains({value: 'google.com', isApplied: true}, {value: 'heise.de', isApplied: true}));
                done();
            })
            .catch((e) => { done(e); });
    });

    it("getItems() creates list items for cookies ordered backwards", function (done) {
        let cookiesRepo = cookieRepoOf(['aaa.xxx.zzz', 'mmm.kkk.xxx.ccc']);
        let whitelistRepo = whitelistRepoOf([]);

        new WhiteListModel(cookiesRepo, whitelistRepo).getItems()
            .then((items) => {
                assertThat(array(items), contains({value: 'mmm.kkk.xxx.ccc', isApplied: false}, {value: 'aaa.xxx.zzz',isApplied: false}));
                done();
            })
            .catch((e) => { done(e); });
    });

    it("getItems() creates list items for cookies with normalized domain", function (done) {
        let cookiesRepo = cookieRepoOf(['.aAa.XxX.zZz']);
        let whitelistRepo = whitelistRepoOf([]);

        new WhiteListModel(cookiesRepo, whitelistRepo).getItems()
            .then((items) => {
                assertThat(array(items), contains({value: 'aaa.xxx.zzz', isApplied: false}));
                done();
            })
            .catch((e) => { done(e); });
    });

    it("getItems() creates list items for cookies that has no duplicates", function (done) {
        let cookiesRepo = cookieRepoOf(['aaa.xxx.zzz', 'aaa.xxx.zzz']);
        let whitelistRepo = whitelistRepoOf([]);

        new WhiteListModel(cookiesRepo, whitelistRepo).getItems()
            .then((items) => {
                assertThat(array(items), contains({value: 'aaa.xxx.zzz', isApplied: false}));
                done();
            })
            .catch((e) => { done(e); });
    });

    it("getItems() creates list items for whitelist domains before cookie domains, if not in cookie domains", function (done) {
        let cookiesRepo = cookieRepoOf(['aaa.aaa']);
        let whitelistRepo = whitelistRepoOf(['zzz.zzz']);

        new WhiteListModel(cookiesRepo, whitelistRepo).getItems()
            .then((items) => {
                assertThat(array(items), contains({value: 'aaa.aaa', isApplied: false}, {value: 'zzz.zzz', isApplied: true}));
                done();
            })
            .catch((e) => { done(e); });
    });

    it("getItems() creates list items for whitelist domains activated within cookie domains, if domains is equal", function (done) {
        let cookiesRepo = cookieRepoOf(['aaa.aaa', 'zzz.zzz', '.zZz.ZzZ']);
        let whitelistRepo = whitelistRepoOf(['zZz.Zzz']);

        new WhiteListModel(cookiesRepo, whitelistRepo).getItems()
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
