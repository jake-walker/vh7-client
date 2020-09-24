import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistance from 'vuex-persist';

Vue.use(Vuex);

const vuexLocal = new VuexPersistance({
  storage: window.localStorage,
  key: "vh7"
});

export default new Vuex.Store({
  state: {
    apiKey: null
  },
  plugins: [
    vuexLocal.plugin
  ]
});
