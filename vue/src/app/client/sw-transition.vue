<template>
  <transition v-bind="$attrs">
    <slot></slot>
  </transition>
</template>

<script>
class SwTransitionError extends Error {
  message;
  constructor(message) {
    super();
    this.message = message;
  }
  toString() {
    return this.message;
  }
}

export default {
  name: 'sw-transition',
  inheritAttrs: false,
  data() {
    return {
      definedTransitions: ['slide', 'fade'],
      modes: ['out-in', 'in-out'],
    };
  },
  created() {
    const props = this.$attrs;
    if (props.name && !this.definedTransitions.includes(props.name)) {
      throw new SwTransitionError(`Such transition is not defined. Available transitions: ${this.definedTransitions.join(', ')}`);
    }
    if (props.mode && !this.modes.includes(props.mode)) {
      throw new SwTransitionError(`Available modes:  ${this.modes.join(', ')}`);
    }
  },
};

</script>

<style scoped>
/** Transition animation styles */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter {
  opacity: 0;
  transform: translateY(-3rem);
}
.slide-leave-to {
  opacity: 0;
  transform: translateY(-3rem);
}

/** Transition animation styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
