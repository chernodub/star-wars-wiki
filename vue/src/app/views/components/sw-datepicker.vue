<template>
  <input
    type="date"
    v-bind="$attrs"
    :class="['sw-input', $style.datepicker]"
    :value="dateString"
    @input="$emit('input', $event.target.valueAsDate)"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    }
  },
  inheritAttrs: false,
  name: 'sw-datepicker',
  computed: {
    dateString: this.value && this.value.toISOString().split('T')[0],
  },
};
</script>
<style module>
.datepicker {
  font: inherit;
}
.datepicker::-webkit-inner-spin-button {
  display: none;
}
.datepicker::-webkit-calendar-picker-indicator:hover {
  background-color: inherit;
  cursor: pointer;
}
.datepicker::-webkit-calendar-picker-indicator:active {
  color: #ff4c4c;
}
.datepicker::-webkit-clear-button {
  display: none;
}
</style>

