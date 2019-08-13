import firebase from 'firebase/app';
import 'firebase/auth';
import Vue from 'vue';
import App from '@/app/app';
import store, { CHANGE_USER } from '@/app/store/index';
import router from '@/app-router';
import { mapUser } from '@/app/core/map-model-service';
import { CHECK_ADMIN } from './app/store';

Vue.config.productionTip = false;

/**
 * initializeFirebase
 * @param {Function} saveUserCallback
 * @return {Promise}
 */
function initializeFirebase(saveUserCallback) {
  // Initialize Firebase
  if (!firebase.apps.length) {
    return new Promise((resolve) => {
      firebase.initializeApp(process.env.FIREBASE_CONFIG);
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          saveUserCallback(mapUser(user));
          store.dispatch(CHECK_ADMIN);
        } else {
          saveUserCallback(null);
        }
        resolve();
      });
    });
  }
  return Promise.resolve();
}


/** Initializing firebase database */
initializeFirebase(user => store.dispatch(CHANGE_USER, user)).then(() => {
  new Vue({
    render: h => h(App),
    store,
    router,
  }).$mount('#app');
});
