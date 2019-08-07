<template>
  <div id="app">
    <transition name="slide" mode="in-out">
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
    </transition>
    <transition name="fade" mode="out-in">
      <router-view :class="$style.viewPadding"></router-view>
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
    showNavbar() {
      return this.$route.name !== 'login' &&
       this.$route.name !== 'register' && this.user;
    },
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
/** Transition animation styles */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter {
  opacity: 0;
  transform: translateY(-3rem);
}
.slide-leave-to {
  opacity: 0;
  transform: translateY(-3rem);
}
</style>
