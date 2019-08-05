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

export default {
  name: 'the-authorization-page',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapActions({
      setNewUserInfo: CHANGE_USER,
    }),

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
  created() {
  },
};

/**
 * @typedef {Object} User
 * @property {string} email
 */
/**
 * @typedef {Object} UserDto
 * @property {string} email
 * ... and more
 */


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
        console.log(message);
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
        console.log(message);
      });
}
</script>
