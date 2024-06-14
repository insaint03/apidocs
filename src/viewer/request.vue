<template>
  <v-card flat>
    <v-card-text>
      <v-textarea :model-value="request.desc" readonly v-bind="$thx.field" />
      <!-- TODO: body if exists -->
      <!-- TODO: queries if exists -->
      <!-- TODO: cookies if exists -->
      <!-- TODO: headers if exists -->
    </v-card-text>
  </v-card>

</template>
<script>
export default {
  name: 'requestView',
  props: {
    request: Object,
  },
  data() {
    return {
    };
  },
}
</script>