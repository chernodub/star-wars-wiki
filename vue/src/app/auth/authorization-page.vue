<template>
  <div :class="$style.authorizationPage">
    <sw-transition name="fade" mode="out-in">
      <router-view @submit="onSubmit"></router-view>
    </sw-transition>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { SIGN_IN, SIGN_UP, CHECK_ADMIN } from '../store';
import SwTransition from '../views/sw-transition';

/** @typedef {Object} CustomEvent
 * @property {'login' | 'register'} type
 * @property {string} email
 * @property {string} password
 */

/** Authorization page component */
export default {
  name: 'authorization-page',
  components: { 'sw-transition': SwTransition },
  methods: {
    ...mapActions({
      /** Replace user with new user object */
      signIn: SIGN_IN,
      signUp: SIGN_UP,
      checkAdmin: CHECK_ADMIN,
    }),

    /** Send request to sign in/up
     * @param {CustomEvent} event
     */
    onSubmit(event) {
      let resultPromise;
      const email = event.email;
      const password = event.password;
      switch (event.type) {
        case 'login':
          resultPromise = this.signIn({ email, password });
          break;

        case 'register':
          resultPromise = this.signUp({ email, password });
          break;

        default:
          break;
      }

      if (resultPromise) {
        resultPromise.then(() => this.checkAdmin()).then(() => {
          this.$router.push({ name: 'films' });
        });
      }
    },
  },
};
</script>
<style module>
.authorizationPage {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
