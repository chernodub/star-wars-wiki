<template>
  <div id="app">
    <nav class="nav" v-if="user">
      <router-link class="logo" to="films">
        <img src="./assets/Vector.svg" alt="Logo SW" />
      </router-link>
      <button class="exit-button" @click="logOut" aria-label="Log out button">
        <span>Log out</span>
      </button>
    </nav>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import {mapMutations, mapGetters} from 'vuex';
import {FIREBASE_CONFIG} from './core/config';


export default {
  name: 'app',
  components: {},
  created() {
    initializeFirebase();
  },
  methods: {
    logOut() {
      firebaseLogOut().then(() => {
        this.$router.push({name: 'login'});
      });
    },
    ...mapMutations({setNewUserInfo: 'changeUser'}),
  },
  computed: {
    ...mapGetters(['user']),
  },
  destroyed() {
  },
};

/**
 * initializeFirebase
 */
function initializeFirebase() {
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
}

/**
 * firebaseLogOut
 * @return {Promise}
 */
function firebaseLogOut() {
  return firebase.auth().signOut();
}
</script>

<style>
@import "./styles.css";
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/** Transition animation styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  padding: 1rem 1rem 1rem 1rem;
}
.logo img {
  width: 3em;
  height: 3em;
}
.logo:focus {
  outline: none;
}
.logo img:hover,
.logo:focus img {
  filter: drop-shadow(0 0 0.15em red);
}
.logo img:active {
  filter: none;
}
</style>
