<template>
  <div :class="[$style.filmsPage]">
    <ul
      aria-label="Films list"
      :class="$style.filmsPageList"
    >
      <li
        v-for="film in sortedFilms"
        :key="film.episodeId"
        :class="[$style.filmsPageListLi]"
      >
        <div @mouseover="chooseFilm(film.episodeId)">
          <router-link
            :class="[$style.filmsPageLink, 'sw-a']"
            :to="{ name: 'film-page', params: { id: film.episodeId } }"
          >
            <span :class="$style.filmsPageLinkText">
              Episode {{ film.episodeId }}:
            </span>
            <span :class="[$style.filmsPageLinkText, $style.filmNamePadding]">
              {{ film.name }}
            </span>
          </router-link>
        </div>
      </li>
    </ul>
    <sw-transition name="slide" mode="out-in">
      <div :class="$style.filmsPageDescription" v-if="focusedId !== null">
        <img
          :class="[$style.filmsPageDescriptionImage]"
          :src="selectFilm.imageUrl"
          alt="Film poster image"
        />
        <p :class="[$style.filmsPageDescriptionP]">
          {{ selectFilm.description }}
        </p>
      </div>
    </sw-transition>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { GET_FILMS } from '../../store';
import SwTransition from '../sw-transition';

/** Films list component */
export default {
  name: 'films-list',
  components: { 'sw-transition': SwTransition },
  data() {
    return {
      /** Id of the film user set focus on */
      focusedId: null,
      /** Debounce timeout id */
      debounceTimeoutId: null,
    };
  },
  methods: {
    ...mapActions({ getFilms: GET_FILMS }),
    /**
     * Selects film to show
     * @param {number} id
     */
    chooseFilm(id) {
      if (id === this.focusedId) return;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.focusedId = null;
      this.timer = setTimeout(() => {
        this.focusedId = id;
      }, 500);
    },
  },
  computed: {
    ...mapGetters(['films']),
    /** Select film */
    selectFilm() {
      return this.films.find(film => film.episodeId === this.focusedId);
    },
    /** Sorted by episode */
    sortedFilms() {
      return this.films.slice(0).sort((a, b) => a.episodeId - b.episodeId);
    },
  },
  mounted() {
    if (!this.films.length) {
      this.getFilms();
    }
  },
};
</script>
<style scoped>
/** Transition animation styles */
.slide-enter-active,
.slide-leave-active {
  transition: all 1.1s ease;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(2rem);
}
</style>

<style module>
.filmNamePadding {
  padding-left: 1.5rem;
}
.filmsPage {
  display: flex;
  justify-content: left;
  overflow-x: hidden;
}
.filmsPageLink {
  font-size: 2.5rem;
}
.filmsPageLink:hover {
  filter: drop-shadow(0 0 0.5rem #f2a7a7);
}
.filmsPageList {
  list-style: none;
  min-width: 40%;
  max-width: 40rem;
}
.filmsPageListLi {
  padding: 0 1rem 2rem 1rem;
}
.filmsPageDescription {
  display: flex;
}
.filmsPageLinkText {
  color: inherit;
}
@media screen and (max-width: 1200px) {
  .filmsPageLinkText {
    display: inline-block;
    width: 100%;
  }
  .filmsPageDescriptionP {
    width: 0;
    display: none;
  }
  .filmsPageList {
    padding-left: 1.5rem;
  }
  .filmsPageListLi {
    padding-left: 0;
  }
}
@media screen and (max-width: 800px) {
  .filmsPageDescription {
    display: none;
    width: 0;
  }
}
.filmsPageList {
  padding-right: 1.5rem;
}
.filmsPageDescriptionP {
  padding: 0 1rem 2rem 1.5rem;
  font-size: 2rem;
}
.filmsPageDescriptionImage {
  height: 25em;
  min-width: 17em;
  padding-top: calc(3 / 4 * 1rem);
}
</style>
