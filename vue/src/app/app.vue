<template>
  <div id="app">
    <sw-transition name="slide" mode="in-out">
      <nav :class="[$style.nav]" v-if="showNavbar">
        <router-link :class="$style.logoLink" :to="{ name: 'films' }">
          <img
            :class="[$style.logoImage]"
            src="./assets/Vector.svg"
            alt="Logo SW"
          />
        </router-link>
        <button class="sw-button" @click="logOut" aria-label="Log out button">
          <span>Log out</span>
        </button>
      </nav>
    </sw-transition>
    <sw-transition name="fade" mode="out-in">
      <router-view :class="$style.viewPadding"></router-view>
    </sw-transition>
  </div>
</template>
<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import { mapMutations, mapGetters, mapActions } from 'vuex';
import { CHANGE_USER } from './store/index';
import SwTransition from './client/sw-transition';
/**
 * firebaseLogOut
 * @return {Promise}
 */
function firebaseLogOut() {
  return firebase.auth().signOut();
}

export default {
  name: 'app',
  components: { 'sw-transition': SwTransition },
  methods: {
    logOut() {
      firebaseLogOut().then(() => {
        this.$router.push({ name: 'login' });
      });
    },
    ...mapActions({ changeUser: CHANGE_USER }),
    ...mapMutations({ setNewUserInfo: CHANGE_USER }),
  },
  computed: {
    ...mapGetters(['user']),
    showNavbar() {
      return this.$route.name !== 'login' &&
       this.$route.name !== 'register' && this.user;
    },
  },
};


</script>


<style module>
.nav {
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 1.5rem 1.5rem 1.5rem;
  box-sizing: border-box;
  width: 100%;
  position: absolute;
}
.logoImage {
  width: 5em;
  height: 5em;
}
.logoLink:active {
  filter: none;
}
.logoImage:hover,
.logoLink:focus {
  outline: none;
  filter: drop-shadow(0 0 0.2em #ff4c4c);
}
.viewPadding {
  padding-top: 11.25rem !important;
}
@media screen and (max-width: 1000px) {
  .viewPadding {
    padding-top: 8rem !important;
  }
}
</style>

<style>
@import "./styles.css";
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

<style scoped>
</style>
