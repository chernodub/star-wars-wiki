<template>
  <div id="films-list">
    <ul aria-label="Films list">
      <li v-for="film in films" :key="film.id">
        <router-link to="">{{ film.name }}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import {API} from '../core/config';
import firebase from 'firebase/app';
import 'firebase/database';

export default {
  name: 'the-films-list',
  data() {
    return {
      films: [],
    };
  },
  methods: {
  },
  async created() {
    this.films = await getFilms();
  },
};


/** Removes wrapper
 * @return {Film} film
 * @param {Wrap} wrap
 */
const removeWrap = (wrap) => wrap.fields;

/** Gets films in wrappers
 * @return {Promise<Film[]>}
 */
async function getFilms() {
  const url = new URL('swapi/films.json', API.URL);
  url.searchParams.append('key', API.KEY);

  return firebase.database().ref('swapi/films').once('value')
      .then((snapshot) => {
        const wraps = snapshot.val();
        if (wraps) {
          return wraps.map(removeWrap).map((film) => ({
            name: film.title,
            id: film.episode_id,
          }));
        }
        // TODO: make better notification
        console.log('No films in DB');
        return [];
      });
}

</script>

