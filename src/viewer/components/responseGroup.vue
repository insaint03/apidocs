<template>
  <div class="d-flex-inline flex-grow">
    <v-btn text flat :size="size" readonly
      :color="color"
      :title="`${body} (${status_title})`">
      {{ body }}
    </v-btn>
  </div>
</template>
<script>
import Response from '@/models/response';
export default {
  name: 'responseGroup',
  props: {
    response: Response,
    size: { type: String, required: false, default: 'small' },
  },
  computed: {
    color() {
      switch(true) {
        case 200<=this.status && this.status<300:
          return this.$thx.color.success || 'primary';
        case 300<=this.status && this.status<400:
          return this.$thx.color.secondary || 'secondary';
        case 400<=this.status && this.status<500:
          return this.$thx.color.warning || 'warning';
        case 500<=this.status && this.status<600:
          return this.$thx.color.error || 'error';
        default:
          return null
      }
    },
    status() {
      return this.response.status_code;
    },
    status_title() {
      return this.response.status_title;
    },
    body() {
      return this.response.body;
    }
  },
  data() {
    return {};
  },
}
</script>