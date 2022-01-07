import { createStore } from 'vuex';

import { getDomains, mutateStoredWhitelistDomains } from './domains';
import { getSettings, mutateSettings } from './settings';

export const store = createStore({
  state () {
    return {
      domains: [],
      settings: {}
    };
  },
  mutations: {
    setDomains: (state, domains) => state.domains = domains,
    changeSetting: (state, settings) => state.settings = { ...state.settings, ...settings },
    setApplied: (state, { domain, apply }) => state.domains.find(d => d.name === domain.name).isApplied = apply
  },
  getters: {
    domains: state => state.domains,
    settings: state => state.settings
  },
  actions: {
    loadDomains: async ({ commit }) => commit('setDomains', await getDomains()),
    loadSettings: async ({ commit }) => commit('changeSetting', await getSettings()),
    toggleApplied: ({ commit }, domain) => {
      const apply = !domain.isApplied;

      commit('setApplied', { domain, apply });
      mutateStoredWhitelistDomains(
        apply
          ? whitelistDomains => whitelistDomains.add(domain.name)
          : whitelistDomains => whitelistDomains.delete(domain.name));
    },
    setRemoveOnStartup: ({ commit }, removeOnStartup) => {
      commit('changeSetting', { removeOnStartup });
      mutateSettings(settings => {
        settings.removeOnStartup = removeOnStartup;
      });
    },
    setNotifyCookiesRemoved: ({ commit }, notifyCookiesRemoved) => {
      commit('changeSetting', { notifyCookiesRemoved });
      mutateSettings(settings => settings.notifyCookiesRemoved = notifyCookiesRemoved);
    }
  }
});
