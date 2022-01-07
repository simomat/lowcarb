<template>
  <div id="lowcarb">
    <header class="panel-section panel-section-header">
      <div class="text-section-header">{{ m("selectCookies") }}</div>
    </header>

    <div class="panel-section">
      <div class="lc-table">
        <div class="panel-section-list">
          <div
            class="panel-list-item"
            v-bind:key="domain.name"
            v-for="domain in domains"
            v-bind:class="{ 'lc-active': domain.isApplied }"
            @click="toggleApplied(domain)"
          >
            <div class="text">{{ domain.name }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel-section-separator"></div>

    <div class="panel-section">
      <div class="lc-option browser-style">
        <input
          type="checkbox"
          v-model="removeOnStartup"
          role="switch"
          id="s-removeOnStartup"
        />
        <label class="form-check-label" for="s-removeOnStartup">
          {{ m("removeOnStartup") }}
        </label>
      </div>
      <div class="lc-option browser-style">
        <input
          type="checkbox"
          v-model="notifyCookiesRemoved"
          role="switch"
          id="s-notify"
        />
        <label class="form-check-label" for="s-notify">
          {{ m("notifyCookiesRemoved") }}
        </label>
      </div>
    </div>

    <footer class="lc-footer panel-section panel-section-footer">
      <button
        type="button"
        class="lc-button browser-style panel-section-footer-button default"
        @click="apply"
      >
        {{ m("saveAndRemoveCookies") }}
      </button>
      <div class="panel-section-footer-separator"></div>
      <button
        type="button"
        class="lc-button browser-style panel-section-footer-button"
        @click="refresh"
      >
        {{ m("refresh") }}
      </button>
    </footer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { removeCookies } from '../removecookies'
import { getIntMessage } from '../webext'

export default {
  computed: {
    domains () {
      return this.$store.getters.domains
    },
    removeOnStartup: {
      get () {
        return this.$store.getters.settings.removeOnStartup
      },
      set (newValue) {
        this.$store.dispatch('setRemoveOnStartup', newValue)
      }
    },
    notifyCookiesRemoved: {
      get () {
        return this.$store.getters.settings.notifyCookiesRemoved
      },
      set (newValue) {
        this.$store.dispatch('setNotifyCookiesRemoved', newValue)
      }
    }
  },
  methods: {
    ...mapActions(['toggleApplied']),
    apply () {
      removeCookies().map(this.refresh)
    },
    refresh () {
      this.$store.dispatch('loadDomains')
    },
    m: getIntMessage
  }
}
</script>

<style>
#lowcarb {
  width: 99%;
}

.lc-table {
  overflow-y: scroll;
  height: 15em;
  width: 100vw;
  border-left: 1px solid #e2e3e2;
}

.lc-footer {
  margin-bottom: 5px;
}

.lc-button {
  height: inherit;
}

.lc-option {
  margin: 1em;
}

.panel-list-item {
  height: 2em;
  border-bottom: 1px solid #e2e3e2;
}

.lc-active {
  font-weight: bolder;
}

.panel-section-list {
  font-weight: lighter;
}
</style>
