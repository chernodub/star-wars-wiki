<template>
  <div :class="$style.auth">
    <form @submit.prevent="onSubmit" :class="$style.authForm">
      <h3 :class="$style.authFormHeader">Reveal yourself</h3>
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
      <button :class="['sw-button', $style.authFormButton]" type="submit">
        <span>Log in</span>
      </button>
    </form>
    <div :class="$style.authFormAdditional">
      <router-link class="sw-a" :to="{ name: 'register' }">I'm new</router-link>
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
<style module src="../form-styles.css">
</style>


