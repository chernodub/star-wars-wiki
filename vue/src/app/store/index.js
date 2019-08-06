import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export const CHANGE_USER = 'CHANGE_USER';

const store = new Vuex.Store({
  state: {
    /** Current user */
    user: null,
  },
  mutations: {
    /** Replace user with new object or null value
     * @param {State} state
     * @param {User} user
     */
    [CHANGE_USER]: (state, user) => {
      state.user = user;
    },
  },
  actions: {
    /** Replace user with new object or null value
     * @param {User} user
     */
    [CHANGE_USER]: ({commit}, user) => {
      commit(CHANGE_USER, user);
    },
  },
  getters: {

    /**
     * Current user
     * @param {State} state
     * @return {User} current user
     */
    user: (state) => state.user,
  },
  // Because of undefined process
  // eslint-disable-next-line
  strict: process.env.NODE_ENV !== 'production',
});

export default store;
