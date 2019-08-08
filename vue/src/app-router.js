import VueRouter from 'vue-router';
import { authGuard } from './app/core/guards/auth-guard';
import Vue from 'vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/films' },
    { path: '/login',
      component: () => import(
        /* webpackChunkName: "auth" */
        './app/auth/authorization-page.vue',
      ),
      children: [
        { name: 'login',
          path: '',
          component: () => import(
            /* webpackChunkName: "auth-login" */
            './app/auth/components/login-form.vue',
          ),
        },
        { name: 'register',
          path: 'new',
          component: () => import(
            /* webpackChunkName: "auth-registration" */
            './app/auth/components/register-form.vue',
          ),
        },
      ],
    },
    { name: 'films',
      path: '/films',
      component: () => import(
        /* webpackChunkName: "films" */
        './app/client/films/films-list.vue',
      ),
      beforeEnter: authGuard,
    },
    { name: 'film-page',
      path: '/films/:id',
      component: () => import(
        /* webpackChunkName: "film-page" */
        './app/client/films/film-description.vue',
      ),
      beforeEnter: authGuard,
    },
    { path: '*', redirect: 'films' },
  ],
});
