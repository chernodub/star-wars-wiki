import * as firebase from 'firebase/app';
import 'firebase/auth';
import Vue from 'vue';
import Vuex from 'vuex';
import { getFilms } from '../core/films-api-service';
import { mapUser } from '../core/map-model-service';
import { getCharacters } from '../core/characters-api-service';
import { getPlanets } from '../core/planets-api-service';


Vue.use(Vuex);

export const CHANGE_USER = 'CHANGE_USER';
export const GET_FILMS = 'GET_FILMS';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const GET_CHARACTERS = 'GET_CHARACTERS';
export const GET_PLANETS = 'GET_PLANETS';


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
    setCharacters: (state, characters) => {
      state.characters = characters;
    },
    setPlanets: (state, planets) => {
      state.planets = planets;
    },
  },
  actions: {
    /** Replace user with new object or null value
     * @param {User} user
     */
    [CHANGE_USER]: ({ commit }, user) => {
      commit(CHANGE_USER, user);
    },

    [GET_FILMS]: async ({ commit }) => {
      const films = await getFilms();
      commit('setFilms', films);
    },

    [GET_CHARACTERS]: async ({ commit }) => {
      const characters = await getCharacters();
      commit('setCharacters', characters);
    },

    [GET_PLANETS]: async ({ commit }) => {
      const planets = await getPlanets();
      commit('setPlanets', planets);
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

