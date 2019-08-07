import Vue from 'vue';
import Vuex from 'vuex';
import {getFilms} from '../core/films-api-service';

Vue.use(Vuex);

export const CHANGE_USER = 'CHANGE_USER';
export const GET_FILMS = 'GET_FILMS';

const store = new Vuex.Store({
  state: {
    /** Current user */
    user: null,
    /** Films */
    films: [],
  },
  mutations: {
    /** Replace user with new object or null value
     * @param {State} state
     * @param {User} user
     */
    [CHANGE_USER]: (state, user) => {
      state.user = user;
    },
    setFilms: (state, films) => {
      state.films = films;
    },
  },
  actions: {
    /** Replace user with new object or null value
     * @param {User} user
     */
    [CHANGE_USER]: ({commit}, user) => {
      commit(CHANGE_USER, user);
    },

    [GET_FILMS]: async ({commit}) => {
      const films = await getFilms();
      commit('setFilms', films);
    },
  },
  getters: {

    /**
     * Current user
     * @param {State} state
     * @return {User} current user
     */
    user: (state) => state.user,
    films: (state) => state.films,
  },
  // Because of undefined process
  // eslint-disable-next-line
  strict: process.env.NODE_ENV !== 'production',
});

export default store;

