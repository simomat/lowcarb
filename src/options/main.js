import { createApp } from 'vue';
import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap"

import { store} from './store';

const app = createApp(App);
app.use(store);
app.mount("#app");


store.dispatch('loadDomains')
store.dispatch('loadSettings')

