import Vue from 'vue';
import App from './app/app.vue';
import store, {CHANGE_USER} from './app/store/index.js';
import router from './app-router.js';
import firebase from 'firebase/app';
import 'firebase/auth';
import {FIREBASE_CONFIG} from './app/core/config';
import {mapUser} from './app/core/map-model-service';

Vue.config.productionTip = false;


/** Initializing firebase database */
initializeFirebase((user) => store.dispatch(CHANGE_USER, user)).then(() => {
  new Vue({
    render: (h) => h(App),
    store,
    router,
  }).$mount('#app');
});

/**
 * initializeFirebase
 * @param {Function} saveUserCallback
 * @return {Promise}
 */
function initializeFirebase(saveUserCallback) {
  // Initialize Firebase
  if (!firebase.apps.length) {
    return new Promise((resolve) => {
      firebase.initializeApp(FIREBASE_CONFIG);
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          saveUserCallback(mapUser(user));
        } else {
          saveUserCallback(null);
        }
        resolve();
      });
    });
  }
}
