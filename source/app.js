import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';

import { createStore } from './store';
import { translation } from './l18n/translation';

export function createApp(config) {
  Vue.use(VueI18n);

  const messages = translation;

  const i18n = new VueI18n({
    locale: config.locale ? config.locale : 'de', // set locale
    messages, // set locale messages
  });

  const store = createStore();

  if (config.locale) store.commit('setLocale', config.locale);
  if (config.delay) store.commit('setDelay', config.delay);

  // Create the app instance.
  const app = new Vue({
    i18n,
    store,
    components: { App },
    render: (h) => h(App),
  });

  // Expose the app, the store and the router.
  // Note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return {
    app,
    store,
  };
}
