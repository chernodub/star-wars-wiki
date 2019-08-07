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
      </div>
    </div>
  </div>
</template>
<style scoped>
table td {
  padding: 0.5rem;
}
</style>

<script>
import {GET_FILMS} from '../../store';
export default {
  name: 'film-description',
  computed: {
    film() {
      return this.$store.getters.films.find((film) => film.episodeId === +this.$route.params.id);
    },
  },
  mounted() {
    if (!this.$store.getters.films.length) {
      this.$store.dispatch(GET_FILMS);
    }
  },
  methods: {
    /** Makes Date human readable
     * @param {Date} date
     * @return {string}
     */
    formatDate: (date) =>
      (date.getMonth() + 1) + '.' + date.getDate() + '.' + date.getFullYear(),
  },
};
</script>

<style module>
.filmDescription {
  margin: 0 auto;
  padding: 3rem;
  display: flex;
  width: 60%;
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
