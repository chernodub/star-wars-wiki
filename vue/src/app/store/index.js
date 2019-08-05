import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export const CHANGE_USER = 'CHANGE_USER';

const store = new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    [CHANGE_USER]: (state, user) => {
      state.user = user;
    },
  },
  actions: {
    [CHANGE_USER]: ({commit}, user) => {
      commit(CHANGE_USER, user);
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
