import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

export function createStore() {
  /* eslint-disable no-new */

  return new Vuex.Store({
    state: {
      locale: null,
      delay: 0,
    },
    actions,
    mutations,
    getters,
  });
}
