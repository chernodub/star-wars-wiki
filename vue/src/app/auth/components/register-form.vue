<template>
  <div :class="$style.auth">
    <form
      @submit.prevent="onSubmit"
      :class="$style.authForm"
      aria-label="Register form"
    >
      <h3 class="sw-h3">New account</h3>
      <input
        :class="['sw-input', $style.authFormInput]"
        type="email"
        name="email"
        required
        v-model="email"
        placeholder="Login"
      />
      <input
        :class="['sw-input', $style.authFormInput]"
        type="password"
        name="password"
        required
        v-model="password"
        placeholder="Password"
      />
      <input
        :class="['sw-input', $style.authFormInput]"
        type="password"
        name="repeatPassword"
        required
        v-model="repeatPassword"
        placeholder="Repeat password"
      />
      <button :class="['sw-button', $style.authFormButton]" type="submit">
        <span>Sign up</span>
      </button>
    </form>
    <div :class="$style.authFormAdditional">
      <router-link class="sw-a" :to="{ name: 'login' }"
        >I have an account</router-link
      >
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
        alert('Please repeat password correctly!');
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

<style module src="../form-styles.css">
</style>
