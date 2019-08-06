<template>
  <ul aria-label="Films list">
    <li v-for="film in films" :key="film.id">
      <router-link to="">{{ film.name }}</router-link>
    </li>
  </ul>
</template>
<script>
import {GET_FILMS} from '../store';
import {mapActions, mapGetters} from 'vuex';
export default {
  name: 'films-list',
  methods: {
    ...mapActions([GET_FILMS]),
  },
  computed: {
    ...mapGetters(['films']),
  },
  mounted() {
    this[GET_FILMS]();
  },
};
</script>

