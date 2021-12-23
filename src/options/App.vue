<template>
  <div>
    <h5>{{ m('selectCookies')}}</h5>

    <div class="lowcard container">
      <div class="p-2">
        <div id="lc-table">
          <table class="table table-light table-hover">
            <tbody>
              <tr
                scope="row"
                v-bind:key="domain.name"
                v-for="domain in domains"
                v-bind:class="{ 'table-active': domain.isApplied }"
              >
                <td scope="col" @click="toggleApplied(domain)" class="">
                  {{ domain.name }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="btn-group container-fluid p-2">
        <button type="button" class="btn btn-primary" @click="apply">{{ m('saveAndRemoveCookies') }}</button>
        <button type="button" class="btn btn-secondary" @click="refresh">{{ m('refresh') }}</button>
      </div>

      <div class="p-2">
        <div class="form-check form-switch">
          <input
            
            class="form-check-input"
            type="checkbox"
            v-model="removeOnStartup"
            role="switch"
            id="s-removeOnStartup"
          />
          <label class="form-check-label" for="s-removeOnStartup">{{ m('removeOnStartup') }}</label
          >
        </div>
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="notifyCookiesRemoved"
            role="switch"
            id="s-notify"
          />
          <label class="form-check-label" for="s-notify">{{ m('notifyCookiesRemoved') }}</label
          >
        </div>
      </div>
    </div>

    <p></p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { removeCookies } from '../removecookies'

export default {
  computed: {
    domains() {
      return this.$store.getters.domains;
    },
    removeOnStartup: {
      get() {
        return this.$store.getters.settings.removeOnStartup;
      },
      set(newValue) {
        console.log('setRemoveOnStartup')
        this.$store.dispatch('setRemoveOnStartup', newValue);  
      }
    },
    notifyCookiesRemoved: {
      get() {
        return this.$store.getters.settings.notifyCookiesRemoved;
      },
      set(newValue) {
        this.$store.dispatch('setNotifyCookiesRemoved', newValue);  
      }
    },
  },
  methods: {
    ...mapActions(["toggleApplied"]),
    apply() {
      removeCookies().map(this.refresh)
    },
    refresh() {
      this.$store.dispatch('loadDomains');
    },
    m(key) {
      return browser.i18n.getMessage(key);
    }
  },
};
</script>

<style scoped>
.lowcard {
  width: 500px;
}

#lc-table {
  overflow: hidden;
  overflow-y: scroll;
  height: 20em;
}
</style>