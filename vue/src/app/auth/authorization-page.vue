<template>
  <div class="authorization-page">
    <transition name="fade" mode="out-in">
      <router-view @submit="onSubmit"></router-view>
    </transition>
  </div>
</template>
<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {mapActions} from 'vuex';
import {CHANGE_USER} from '../store';
import {mapUser} from '../core/map-model-service';

/** @typedef {Object} CustomEvent
 * @property {'login' | 'register'} type
 * @property {string} email
 * @property {string} password
 */

/** Authorization page component */
export default {
  name: 'authorization-page',
  methods: {
    ...mapActions({
      /** Replace user with new user object */
      setNewUserInfo: CHANGE_USER,
    }),

    /** Send request to sign in/up
     * @param {CustomEvent} event
     */
    onSubmit(event) {
      let resultPromise;

      switch (event.type) {
        case 'login':
          resultPromise = signIn(event.email, event.password);
          break;

        case 'register':
          resultPromise = signUp(event.email, event.password);
          break;

        default:
          break;
      }

      if (resultPromise) {
        resultPromise.then((user) => {
          this.setNewUserInfo(mapUser(user));
          this.$router.push({name: 'films'});
        });
      }
    },
  },
};


/**
 * signIn
 * @argument {string} email
 * @argument {string} password
 * @return {Promise}
 */
function signIn(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(({message}) => {
        // TODO: better notification
        alert(message);
      });
}


/**
 * signUp
 * @argument {string} email
 * @argument {string} password
 * @return {Promise}
 */
function signUp(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(({message}) => {
        // TODO: better notification
        alert(message);
      });
}
</script>
<style scoped>
.authorization-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
}
</style>
