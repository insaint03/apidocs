<template>
  <i :class="`mdi mdi-${icon}`"></i>
</template>
<script>
export default {
  name: 'mdIcon',
  props: {
    icon: String,
  },
  computed: {
    icon_name() {
      return this.icon;
    }
  },
  data() {
    return {
    };
  }
}
</script>
<style scoped>
i {
  align-items: center;
  display: inline-flex;
  height: 1em;
  justify-content: center;
  align-items: center;
  letter-spacing: normal;
  line-height: 1;
  position: relative;
  text-indent: 0;
  text-align: center;
  user-select: none;
  vertical-align: middle;
  width: 1em;
  min-width: 1em;
}
</style>