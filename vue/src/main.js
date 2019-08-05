import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app/app.vue';
import store from './app/store/index.js';
import {authGuard} from './app/core/guards/auth-guard';

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

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
