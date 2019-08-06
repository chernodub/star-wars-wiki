<template>
  <div class="auth-component">
    <form
      @submit.prevent="onSubmit"
      class="auth-component__auth-form"
      aria-label="Register form"
    >
      <h3>New account</h3>
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
      <input
        type="password"
        name="repeatPassword"
        required
        v-model="repeatPassword"
        placeholder="Repeat password"
      />
      <button type="submit"><span>Register</span></button>
    </form>
    <div class="additional">
      <router-link :to="{ name: 'login' }">Login</router-link>
    </div>
  </div>
</template>

<script>
/** Registration form component */
export default {
  name: 'register-form',
  data() {
    return {
      /** Email */
      email: '',
      /** Password */
      password: '',
      /** Repeated password */
      repeatPassword: '',
    };
  },
  methods: {
    /** Emits event with CustomEvent type */
    onSubmit() {
      if (this.password !== this.repeatPassword) {
        // TODO: better notification
        console.log('Please repeat password correctly!');
      } else {
        this.$emit('submit',
            {
              type: 'register',
              email: this.email,
              password: this.password,
            }
        );
      }
    },
  },
};
</script>
<style>
h3,
.additional {
  text-align: center;
}
</style>
