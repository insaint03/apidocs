<template>
  <div class="d-flex-inline flex-grow">
    <v-btn text flat :size="size" readonly :color="$thx.color.http_method[method]">{{ method }}</v-btn>
    <v-btn text flat :size="size" readonly style="text-transform: none;">{{ pathname }}</v-btn>
  </div>
</template>
<script>
import Request from '@/models/request';
export default {
  name: 'requestGroup',
  props: {
    request: Request,
    size: { type: String, required: false, default: 'small' },
  },
  computed: {
    method() {
      return this.request.method;
    },
    pathname() {
      return this.request.pathname;
    },
  },
  data() {
    return {};
  },
}
</script>