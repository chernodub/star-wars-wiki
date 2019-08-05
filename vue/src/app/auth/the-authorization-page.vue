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
      setNewUserInfo: 'changeUser',
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
    watchUserChanging(this.setNewUserInfo);
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

/** Maps userDto to User
 * @param {UserDto} userDto
 * @return {User}
 */
function mapUser(userDto) {
  if (!userDto) return null;
  return {
    email: userDto.email,
  };
}

/**
 * watchUserChanging
 * @argument {Function} saveUserCallback - function which
 * saves user into the store
 */
function watchUserChanging(saveUserCallback) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      saveUserCallback(mapUser(user));
    } else {
      saveUserCallback(null);
    }
  });
}

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
