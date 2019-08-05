import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    changeUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    changeUser({commit}, user) {
      commit('changeUser', user);
    },
  },
  getters: {
    user: (state) => state.user,
  },
  // Because of undefined process
  // eslint-disable-next-line
  strict: process.env.NODE_ENV !== 'production',
});

export default store;
