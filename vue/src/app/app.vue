<template>
  <div id="app">
    <nav class="nav" v-if="user">
      <router-link class="logo" :to="{ name: 'films' }">
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
import {mapMutations, mapGetters, mapActions} from 'vuex';
import {CHANGE_USER} from './store/index';

export default {
  name: 'app',
  components: {},
  methods: {
    logOut() {
      firebaseLogOut().then(() => {
        this.$router.push({name: 'login'});
      });
    },
    ...mapActions({changeUser: CHANGE_USER}),
    ...mapMutations({setNewUserInfo: CHANGE_USER}),
  },
  computed: {
    ...mapGetters(['user']),
  },
};


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
.logo img:active {
  filter: none;
}
</style>
