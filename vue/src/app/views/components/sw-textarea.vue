<template>
  <textarea
    name="description"
    v-bind="$attrs"
    :class="['sw-input', $style.fullWidth, $style.textArea]"
    :value="value"
    @input="$emit('input', $event.target.value)"
  ></textarea>
</template>

<script>
export default {
  name: 'sw-textarea',
  inheritAttrs: false,
  props: ['value'],
};
</script>

<style module>
.textArea {
  transition: none;
  font: inherit;
  resize: vertical;
}
.textArea::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 1em;
  background-color: inherit;
  margin: 0.7em 0 0.7em 0;
}

.textArea::-webkit-scrollbar {
  width: 0.5em;
  background-color: none;
}

.textArea::-webkit-scrollbar-thumb {
  border-radius: 1em;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f2a7a7;
}
.textArea::-webkit-scrollbar-corner {
  display: none;
}
.textArea::-webkit-resizer {
  display: none;
}
.fullWidth {
  width: 90%;
}
</style>
