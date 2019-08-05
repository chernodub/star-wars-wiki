import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app/app.vue';
import store, {CHANGE_USER} from './app/store/index.js';
import {authGuard} from './app/core/guards/auth-guard';
import firebase from 'firebase/app';
import 'firebase/auth';
import {FIREBASE_CONFIG} from './app/core/config';
import {mapUser} from './app/core/map-model-service';

Vue.config.productionTip = false;
Vue.use(VueRouter);


const router = new VueRouter({
  routes: [
    {path: '/', redirect: '/films'},
    {path: '/login',
      component: () => import('./app/auth/the-authorization-page.vue'),
      children: [
        {name: 'login',
          path: '',
          component: () => import('./app/auth/components/login-form.vue'),
        },
        {name: 'register',
          path: 'new',
          component: () => import('./app/auth/components/register-form.vue'),
        },
      ],
    },
    {name: 'films',
      path: '/films',
      component: () => import('./app/shared/films-list.vue'),
      beforeEnter: authGuard,
    },
    {path: '*', redirect: 'login'},
  ],
});
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
