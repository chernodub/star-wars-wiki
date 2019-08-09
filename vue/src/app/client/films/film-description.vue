<template>
  <div v-if="film" :class="[$style.filmDescription]">
    <div :class="$style.imageInfoContainer">
      <img
        :class="[$style.image]"
        :src="film.imageUrl"
        alt="Film poster image"
      />
    </div>
    <div :class="$style.textInfoContainer">
      <div :class="$style.headerContainer">
        <div :class="$style.textInfoName">
          <h2>{{ film.name }}</h2>
        </div>
        <div :class="$style.textInfoAlternativeName">
          Episode {{ film.episodeId }}
        </div>
      </div>
      <div :class="$style.textInfoTableContainer">
        <table :class="$style.textInfoTable">
          <tbody>
            <tr :class="$style.textInfoTableRow">
              <td :class="$style.textInfoTableTdTitle">
                Released:
              </td>
              <td>
                {{ formatDate(film.releaseDate) }}
              </td>
            </tr>
            <tr :class="$style.textInfoTableRow">
              <td :class="$style.textInfoTableTdTitle">
                Produced by:
              </td>
              <td>
                {{ film.producedBy }}
              </td>
            </tr>
            <tr :class="$style.textInfoTableRow">
              <td :class="$style.textInfoTableTdTitle">
                Directed by:
              </td>
              <td>
                {{ film.director }}
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p>
                  {{ film.description }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <sw-transition name="fade" appear>
          <div>
            <span :class="$style.additionalTitle">Characters: </span>
            <ul :class="$style.charactersList">
              <li v-for="char in filmCharacters" :key="char.id">
                <router-link
                  :to="{ name: 'character-page', params: { id: char.id } }"
                  class="sw-a"
                >
                  <!-- router-link is in one line with {{}} because there is a space after char.name appearing
                when I move in under the {{}} -->
                  {{ char.name }}</router-link
                >
              </li>
            </ul>
          </div>
        </sw-transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { GET_FILMS, GET_CHARACTERS } from '../../store';
import SwTransition from '../sw-transition';

export default {
  name: 'film-description',
  components: { 'sw-transition': SwTransition },
  computed: {
    ...mapGetters(['films', 'getFilmById', 'characters', 'getCharactersById']),
    /** Selected film */
    film() {
      return this.getFilmById(this.$route.params.id);
    },
    /** Characters in film */
    filmCharacters() {
      return this.getCharactersById(this.film.characters);
    },
  },
  mounted() {
    if (!this.films.length) {
      this.$store.dispatch(GET_FILMS);
    }
    if (!this.characters.length) {
      this.$store.dispatch(GET_CHARACTERS);
    }
  },
  methods: {
    /** Makes Date human readable
     * @param {Date} date
     * @return {string}
     */
    formatDate: date =>
      `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`,
  },
};
</script>
<style module>
.additionalTitle {
  font-weight: bold;
  padding-left: 0.5rem;
}
.charactersList {
  list-style-type: none;
  padding: 0;
}
.charactersList li {
  display: inline;
}
.charactersList li + li:before {
  content: ", ";
}
.filmDescription {
  margin: 0 auto;
  padding: 3rem;
  display: flex;
  width: 60%;
}
.textInfoAlternativeName {
  padding-left: 0.5rem;
}
.image {
  height: 25em;
  min-width: 17em;
}
.imageInfoContainer {
  padding-top: calc(3 / 4 * 1rem);
}
.headerContainer {
  width: 100%;
  padding-bottom: 1.5rem;
}
.textInfoContainer {
  padding: 0 3rem 3rem 3rem;
  width: 100%;
}
.textInfoTable {
  border-collapse: collapse;
}
.textInfoTable td {
  padding: 0.5rem;
}
.textInfoTableRow {
  border-bottom: 0.1rem solid #ff4c4c;
}
.textInfoTableTdTitle {
  font-weight: bold;
}
@media screen and (max-width: 1000px) {
  .filmDescription {
    width: 100%;
    padding: 0;
    display: flex;
    flex-direction: column;
  }
  .imageInfoContainer {
    margin: 0 auto;
  }
  .textInfoContainer {
    box-sizing: border-box;
    padding: 1.5rem;
  }
  .imageInfoContainer {
    padding: 0;
  }
}
</style>
