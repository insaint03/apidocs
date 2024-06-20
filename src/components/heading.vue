<template>
  <component :is="`h${level}`" class="heading" v-bind="$props">
    <slot />
  </component>
</template>
<script>
export default {
  name: 'heading',
  props: {
    level: {type: Number, default: 3},
  },
  data() {
    return {
    };
  }
}
</script>
<style scoped>
.heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>