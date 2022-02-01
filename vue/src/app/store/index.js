import * as firebase from 'firebase/app';
import 'firebase/auth';
import Vue from 'vue';
import Vuex from 'vuex';
import { getFilms, saveFilm } from '@/app/core/films-api-service';
import { mapUser } from '@/app/core/map-model-service';
import { getCharacters } from '@/app/core/characters-api-service';
import { getPlanets } from '@/app/core/planets-api-service';
import { checkAdminRights } from '@/app/core/admin-service';


Vue.use(Vuex);

export const CHANGE_USER = 'CHANGE_USER';
export const GET_FILMS = 'GET_FILMS';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const GET_CHARACTERS = 'GET_CHARACTERS';
export const GET_PLANETS = 'GET_PLANETS';
export const CHECK_ADMIN = 'CHECK_ADMIN';
export const TOGGLE_ADMIN_MODE = 'TOGGLE_ADMIN_MODE';
export const SAVE_FILM = 'SAVE_FILM';


const store = new Vuex.Store({
  state: {
    /** Current user */
    user: null,
    /** Films */
    films: [],
    /** Characters */
    characters: [],
    /** Planets */
    planets: [],
    /** Is admin mode */
    isAdminMode: false,
    /** Is user admin */
    isUserAdmin: false,
  },
  mutations: {
    /** 
     * Replace user with new object or null value
     * @param {State} state
     * @param {User} user
     */
    [CHANGE_USER]: (state, user) => {
      state.user = user;
    },
    setFilms: (state, films) => {
      state.films = films;
    },
    setCharacters: (state, characters) => {
      state.characters = characters;
    },
    setPlanets: (state, planets) => {
      state.planets = planets;
    },
    /**
     * Set admin status
     * @param {boolean} value
     */
    setAdminStatus: (state, value) => {
      if (state.user) {
        state.isUserAdmin = value;
      }
    },
    setFilm: (state, newFilm) => {
      const idx = state.films.findIndex(film => film.episodeId === newFilm.episodeId);
      if (idx > 0) {
        state.films[idx] = newFilm;
      }
    },
    toggleAdminMode: (state) => {
      state.isAdminMode = !state.isAdminMode;
    },
  },
  actions: {
    /**
     * Replace user with new object or null value
     * @param {User} user
     */
    [CHANGE_USER]: ({ commit }, user) => {
      commit(CHANGE_USER, user);
    },

    [GET_FILMS]: ({ commit }) => getFilms().then((films) => {
      commit('setFilms', films);
    }),

    [GET_CHARACTERS]: ({ commit }) => getCharacters().then((characters) => {
      commit('setCharacters', characters);
    }),

    [GET_PLANETS]: ({ commit }) => getPlanets().then((planets) => {
      commit('setPlanets', planets);
    }),

    [SAVE_FILM]: ({ commit }, film) => saveFilm(film).then(() => {
      commit('toggleAdminMode');
      commit('setFilm', film);
    }),

    [TOGGLE_ADMIN_MODE]: ({ commit }) => commit('toggleAdminMode'),

    /** Checks if user is admin and sets it to the state.user */
    [CHECK_ADMIN]({ commit }) {
      return checkAdminRights(this.state.user.uid).then((isUserAdmin) => {
        commit('setAdminStatus', isUserAdmin);
      });
    },

    [SIGN_IN]: async ({ commit }, credentials) =>
      firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
        .then((user) => {
          commit(CHANGE_USER, mapUser(user));
        })
        .catch(({ message }) => {
        // TODO: better notification
          alert(message);
        }),

    [SIGN_UP]: ({ commit }, credentials) =>
      firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then((user) => {
          commit(CHANGE_USER, mapUser(user));
        })
        .catch(({ message }) => {
        // TODO: better notification
          alert(message);
        }),
  },
  getters: {

    /**
     * Current user
     * @param {State} state
     * @return {User} current user
     */
    user: state => state.user,
    films: state => state.films,
    planets: state => state.films,
    characters: state => state.characters,
    isAdminMode: state => state.isAdminMode,
    isUserAdmin: state => state.isUserAdmin,
    getFilmById: state => id => state.films.find(
      film =>
        film.episodeId === +id),
    getCharactersById: state => (ids) => {
      if (ids instanceof Array) {
        return state.characters.filter(character => ids.includes(character.id));
      }
      return state.characters.find(character => character.id === ids);
    },
    getPlanetsById: state => (ids) => {
      if (ids instanceof Array) {
        return state.planets.filter(planet => ids.includes(planet.id));
      }
      return state.planets.find(planet => planet.id === ids);
    },
  },
  // Because of undefined process
  // eslint-disable-next-line
  strict: process.env.NODE_ENV !== 'production',
});

export default store;

