import { createStore } from 'vuex';

import { normalizeDomain, toDomainMatcher } from '../domain';


const toListItem = isApplied => name => ({ name, isApplied });

const addToMap = (map, domain) => map.set(domain.name, domain);

function createListItems(cookies, whitelistDomains) {

    let itemMap = cookies
        .map(cookie => cookie.domain)
        .map(normalizeDomain)
        .map(toListItem(false))
        .reduce(addToMap, new Map());

    itemMap = whitelistDomains
        .map(normalizeDomain)
        .map(toListItem(true))
        .reduce(addToMap, itemMap);

    return Array.from(itemMap.values());
}

const removeDuplicates = domains => Array.from(new Set(domains));

const DEFAULT_SETTINGS = {
    removeOnStartup: false,
    notifyCookiesRemoved: false
}

const mutateStoredWhitelistDomains = mutator =>
    browser.storage.sync.get({ 'whitelistDomains': [] })
        .then(storage => {
            let whitelistDomains = new Set(storage.whitelistDomains);
            mutator(whitelistDomains);
            browser.storage.sync.set({ whitelistDomains: Array.from(whitelistDomains) }).then(() => console.log('safed ' + JSON.stringify(whitelistDomains)));
        });

const mutateSettings = mutator =>
    browser.storage.sync.get({ 'settings': {} })
    .then(storage => {
        mutator(storage.settings);
        browser.storage.sync.set({ settings: storage.settings });
    });

export const store = createStore({
    state() {
        return {
            domains: [],
            settings: {}
        }
    },

    mutations: {
        setDomains(state, domains) {
            
            state.domains = domains;
            console.log('+++ ' + JSON.stringify(state.domains))
        },
        changeSetting(state, settings) {
            state.settings = { ...state.settings, ... settings}
        },
        setApplied(state, domain, isApplied) {
            let domainFromStore = state.domains.find(d => d.name === domain.name);
            domainFromStore.isApplied = isApplied;
        }
    },
    getters: {
        domains: state => state.domains,
        settings: state=> state.settings
    },
    actions: {
        async loadDomains({ commit }) {
            const [cookies, whitelistDomains] = await Promise.all([
                browser.cookies.getAll({}),
                browser.storage.sync.get('whitelistDomains') // was kommt hier wenn nichts gespeichert ist?
                    .then(storage => storage.whitelistDomains)
                    .then(domainNames => Array.from(new Set(domainNames)))
            ]);

            
            const newLocal = createListItems(cookies, whitelistDomains);
            console.log('+++ ' + JSON.stringify(newLocal))
            commit('setDomains', newLocal)

        },
        async toggleApplied({ dispatch, commit }, domain) {
            let newIsApplied = ! domain.isApplied;
            commit('setApplied', domain, newIsApplied)
            await mutateStoredWhitelistDomains(
                newIsApplied
                    ? whitelistDomains => whitelistDomains.add(domain.name)
                    : whitelistDomains => whitelistDomains.delete(domain.name));

            dispatch('loadDomains');

        },
        async loadSettings({commit}) {
            let savedSettings = await browser.storage.sync.get('settings')
            commit('changeSetting', {...DEFAULT_SETTINGS, ...savedSettings.settings })

        },
        setRemoveOnStartup({commit}, removeOnStartup) {
            commit('changeSetting', {removeOnStartup})
            mutateSettings(settings => {
                settings.removeOnStartup = removeOnStartup
            })
            

        },
        setNotifyCookiesRemoved({commit}, notifyCookiesRemoved) {
            commit('changeSetting', {notifyCookiesRemoved})
            mutateSettings(settings => settings.notifyCookiesRemoved = notifyCookiesRemoved)
        },
    }
});