import 'babel-polyfill'
import {assertThat, contains, is} from 'hamjest';
import {spy, wasCalledWith} from 'spyjest';

import {isGeneratorThat, assertResolved} from './testutils';

import {WhiteListModel} from '../src/settings/whitelistmodel';


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

        let items = new WhiteListModel(cookiesRepo, whitelistRepo).getItems();

        assertResolved(items, isGeneratorThat(contains({value: 'google.com', isApplied: true}, { value: 'heise.de', isApplied: true }))).and(done);
    });

    it("getItems() creates list items for cookies ordered backwards", function (done) {
        let cookiesRepo = cookieRepoOf(['aaa.xxx.zzz', 'mmm.kkk.xxx.ccc']);
        let whitelistRepo = whitelistRepoOf([]);

        let items = new WhiteListModel(cookiesRepo, whitelistRepo).getItems();

        assertResolved(items, isGeneratorThat(contains({value: 'mmm.kkk.xxx.ccc', isApplied: false}, {value: 'aaa.xxx.zzz', isApplied: false }))).and(done);
    });

    it("getItems() creates list items for cookies with normalized domain", function (done) {
        let cookiesRepo = cookieRepoOf(['.aAa.XxX.zZz']);
        let whitelistRepo = whitelistRepoOf([]);

        let items = new WhiteListModel(cookiesRepo, whitelistRepo).getItems();

        assertResolved(items, isGeneratorThat(contains({value: 'aaa.xxx.zzz', isApplied: false}))).and(done);
    });

    it("getItems() creates list items for cookies that has no duplicates", function (done) {
        let cookiesRepo = cookieRepoOf(['aaa.xxx.zzz', 'aaa.xxx.zzz']);
        let whitelistRepo = whitelistRepoOf([]);

        let items = new WhiteListModel(cookiesRepo, whitelistRepo).getItems();

        assertResolved(items, isGeneratorThat(contains({value: 'aaa.xxx.zzz', isApplied: false}))).and(done);
    });

    it("getItems() creates list items for whitelist domains before cookie domains, if not in cookie domains", function (done) {
        let cookiesRepo = cookieRepoOf(['aaa.aaa']);
        let whitelistRepo = whitelistRepoOf(['zzz.zzz']);

        let items = new WhiteListModel(cookiesRepo, whitelistRepo).getItems();

        assertResolved(items, isGeneratorThat(contains({value: 'aaa.aaa', isApplied: false}, {value: 'zzz.zzz', isApplied: true }))).and(done);
    });

    it("getItems() creates list items for whitelist domains activated within cookie domains, if domains is equal", function (done) {
        let cookiesRepo = cookieRepoOf(['aaa.aaa', 'zzz.zzz', '.zZz.ZzZ']);
        let whitelistRepo = whitelistRepoOf(['zZz.Zzz']);

        let items = new WhiteListModel(cookiesRepo, whitelistRepo).getItems();

        assertResolved(items, isGeneratorThat(contains({value: 'aaa.aaa', isApplied: false}, {value: 'zzz.zzz', isApplied: true }))).and(done);
    });

    it("setItems() saves 'applied' items as new whitelist", function () {
        let setStorage = spy(_=>_);
        let whiteListModel = new WhiteListModel({setStorage: setStorage}, null);

        whiteListModel.saveItems([{value: 'aaa.bbb', isApplied: false}, {value: 'ccc.ddd', isApplied: true}]);

        assertThat(setStorage, wasCalledWith(is({whitelistDomains: ['ccc.ddd']})));
        assertThat(setStorage, wasCalledWith(is({whitelistDomains: ['aaa.bbb']})).times(0));
    });
});
