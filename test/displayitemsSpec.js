import {assertThat, is, FeatureMatcher, containsInAnyOrder} from 'hamjest';
import {spy, wasCalled, wasCalledWith} from 'spyjest';
import {maybeOf} from 'wellmaybe';
import {installGlobalMock, uninstallGlobalMocks} from './globalMock';
import {getDisplayItems, setDisplayItems} from '../src/displayitems';

describe("displayitems", function () {

    afterEach(uninstallGlobalMocks);

    it("getDisplayItems gets cooke-whitelist items", function (done) {
        let getCookies = () => [{domain: 'hi'}, {domain: 'narf'}];
        let getStorage = () => ({whitelistDomains: ['ho', 'narf']});
        installGlobalMock('browser.cookies.getAll', getCookies);
        installGlobalMock('browser.storage.sync.get', getStorage);

        getDisplayItems()

            .map(items => {
                assertThat(items, containsInAnyOrder(
                    {value: 'hi', isApplied: false},
                    {value: 'narf', isApplied: true},
                    {value: 'ho', isApplied: true}
                ));
                done();
            });
    });

    it("getDisplayItems gets only cookie items if no whitelist domains are present", function (done) {
        let getCookies = () => [{domain: 'hi'}, {domain: 'narf'}];
        let getStorage = () => ({});
        installGlobalMock('browser.cookies.getAll', getCookies);
        installGlobalMock('browser.storage.sync.get', getStorage);

        getDisplayItems()

            .map(items => {
                assertThat(items, containsInAnyOrder(
                    {value: 'hi', isApplied: false},
                    {value: 'narf', isApplied: false}
                ));
                done();
            });
    });

    it("getDisplayItems gets only whitelist items if no cookies are present", function (done) {
        let getCookies = () => [];
        let getStorage = () => ({whitelistDomains: ['ho', 'narf']});
        installGlobalMock('browser.cookies.getAll', getCookies);
        installGlobalMock('browser.storage.sync.get', getStorage);

        getDisplayItems()

            .map(items => {
                assertThat(items, containsInAnyOrder(
                    {value: 'narf', isApplied: true},
                    {value: 'ho', isApplied: true}
                ));
                done();
            });
    });

    it("getDisplayItems gets empty array if no cookies and no whitelist domains are present", function (done) {
        let getCookies = () => [];
        let getStorage = () => ({});
        installGlobalMock('browser.cookies.getAll', getCookies);
        installGlobalMock('browser.storage.sync.get', getStorage);

        getDisplayItems()

            .map(items => {
                assertThat(items, is([]));
                done();
            });
    });


    it("setDisplayItems sets whitelist of applied items", function () {
        let setSyncStorage = spy(_=> Promise.resolve());
        installGlobalMock('browser.storage.sync.get', () => ({whitelistDomains:[]}));
        installGlobalMock('browser.storage.sync.set', setSyncStorage);

        let items = maybeOf([{value: 'hi', isApplied: true}, {value: 'ho', isApplied: false}]);
        setDisplayItems(items);

        assertThat(setSyncStorage, wasCalledWith({whitelistDomains: ['hi']}));
    });

    it("setDisplayItems sets empty whitelist array if no items are applied", function () {
        let setSyncStorage = spy(_=> Promise.resolve());
        installGlobalMock('browser.storage.sync.get', () => ({whitelistDomains:['x']}));
        installGlobalMock('browser.storage.sync.set', setSyncStorage);

        let items = maybeOf([{value: 'hi', isApplied: false}, {value: 'ho', isApplied: false}]);
        setDisplayItems(items);

        assertThat(setSyncStorage, wasCalledWith({whitelistDomains: []}));
    });

    it("setDisplayItems sets empty whitelist array if no items are given", function () {
        let setSyncStorage = spy(_=> Promise.resolve());
        installGlobalMock('browser.storage.sync.get', () => ({whitelistDomains:['x']}));
        installGlobalMock('browser.storage.sync.set', setSyncStorage);

        setDisplayItems(maybeOf([]));

        assertThat(setSyncStorage, wasCalledWith({whitelistDomains: []}));
    });

});