<template>
  <div v-if="film" :class="$style.filmDescription">
    <div :class="$style.imageInfoContainer">
      <img :class="$style.image" :src="film.imageUrl" alt="Film poster image" />
    </div>
    <sw-transition name="fade" mode="out-in">
      <div
        v-if="isAdminMode && film"
        :class="$style.textInfoContainer"
        key="edit"
      >
        <form @submit.prevent="saveFilm(film)">
          <div :class="$style.textInfoTableContainer">
            <table :class="[$style.textInfoTable, $style.fullWidth]">
              <tbody>
                <tr :class="$style.textInfoTableRow">
                  <td :class="$style.textInfoTableTdTitle">
                    Title:
                  </td>
                  <td>
                    <input
                      :class="['sw-input', $style.formInput]"
                      v-model="film.name"
                      name="name"
                    />
                  </td>
                </tr>
                <tr :class="$style.textInfoTableRow">
                  <td :class="$style.textInfoTableTdTitle">
                    Released:
                  </td>
                  <td>
                    <sw-datepicker
                      :class="$style.formInput"
                      v-model="film.releaseDate"
                    ></sw-datepicker>
                  </td>
                </tr>
                <tr :class="$style.textInfoTableRow">
                  <td :class="$style.textInfoTableTdTitle">
                    Produced by:
                  </td>
                  <td>
                    <input
                      :class="['sw-input', $style.formInput]"
                      v-model="film.producedBy"
                      name="producedBy"
                    />
                  </td>
                </tr>
                <tr :class="$style.textInfoTableRow">
                  <td :class="$style.textInfoTableTdTitle">
                    Directed by:
                  </td>
                  <td>
                    <input
                      :class="['sw-input', $style.formInput]"
                      v-model="film.director"
                      name="director"
                    />
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <sw-textarea
                      :class="$style.formInput"
                      v-model="film.description"
                    ></sw-textarea>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div :class="$style.buttonPanel">
            <button class="sw-button" type="submit">save</button>
          </div>
        </form>
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
      <div v-else-if="film" :class="$style.textInfoContainer" key="view">
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
                  {{ film.releaseDate | date }}
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
                    v-trim
                  >
                    {{ char.name }}
                  </router-link>
                </li>
              </ul>
            </div>
          </sw-transition>
        </div>
      </div>
    </sw-transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { GET_FILMS, GET_CHARACTERS, SAVE_FILM } from '../../store';
import SwTransition from '../sw-transition';
import SwDatepicker from '../components/sw-datepicker';
import SwTextarea from '../components/sw-textarea';

function trimInnerText(el) {
  el.innerText = el.innerText.trim();
}

export default {
  name: 'film-description',
  components: {
    'sw-transition': SwTransition,
    'sw-datepicker': SwDatepicker,
    'sw-textarea': SwTextarea,
  },
  computed: {
    ...mapGetters(['films', 'getFilmById', 'characters', 'getCharactersById', 'isAdminMode']),
    /** Selected film */
    film() {
      return { ...this.getFilmById(this.$route.params.id) };
    },
    /** Characters in film */
    filmCharacters() {
      return this.getCharactersById(this.film.characters);
    },
  },
  mounted() {
    if (!this.films.length) {
      this.getFilms();
    }
    if (!this.characters.length) {
      this.getCharacters();
    }
  },
  methods: {
    ...mapActions({ getFilms: GET_FILMS, getCharacters: GET_CHARACTERS, saveFilm: SAVE_FILM }),
  },
  filters: {
    /**
     * Makes Date human readable
     * @param {Date} date
     * @return {string}
     */
    date: date =>
      (date ? `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}` : ''),
  },
  directives: {
    trim: {
      inserted: trimInnerText,
    },
  },
};
</script>
<style module>
.buttonPanel {
  display: flex;
  justify-content: flex-end;
}
.formInput {
  font-size: 1rem;
  padding: 1em;
}
.textArea {
  transition: none;
  max-width: 100%;
}
.textArea::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 1em;
  background-color: inherit;
  margin: 0.6rem 0 0.6rem 0;
}

.textArea::-webkit-scrollbar {
  width: 0.5em;
  background-color: none;
}

.textArea::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f2a7a7;
}

.fullWidth {
  width: 100%;
}
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
