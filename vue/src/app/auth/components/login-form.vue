<template>
  <div class="auth-component">
    <form @submit.prevent="onSubmit" class="auth-component__auth-form">
      <h3>Reveal yourself</h3>
      <input
        type="email"
        name="email"
        required
        v-model="email"
        placeholder="Login"
      />
      <input
        type="password"
        name="password"
        required
        v-model="password"
        placeholder="Password"
      />
      <button type="submit"><span>Log in</span></button>
    </form>
    <div class="additional">
      <router-link :to="{ name: 'register' }">I'm new</router-link>
    </div>
  </div>
</template>

<script>
/** Login form component */
export default {
  name: 'login-form',
  data() {
    return {
      /** Email */
      email: '',
      /** Password */
      password: '',
    };
  },
  methods: {
    /**
     * Emits event with CustomEvent type
     */
    onSubmit() {
      this.$emit('submit',
          {
            type: 'login',
            email: this.email,
            password: this.password,
          }
      );
    },
  },
};
</script>
<style scoped>
h3,
.additional {
  text-align: center;
}
</style>

