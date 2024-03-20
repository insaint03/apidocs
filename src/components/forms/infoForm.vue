<template>
  <form-card>
    <template #title>Service Info</template>
    <!-- form input  -->
    <v-form>
      <v-row>
        <v-col>
          <v-text-field label="Service Name" v-model="service.name" v-bind="ui.text" />
          <v-text-field label="Service URL" v-model="service.url" v-bind="ui.text" />
          <v-text-field label="Version" v-model="service.version" v-bind="ui.text" />
          <v-text-field label="License" v-model="service.license" v-bind="ui.text" />
          <v-text-field label="Summary" v-model="service.summary" v-bind="ui.text" />
          <v-textarea label="Long Description" v-model="service.description" v-bind="ui.text" />
          <v-list twolines label="Contacts">
            <v-list-item v-for="(a,ai) in service.contacts" :key="`service-info.contact-${ai}`"
                :title="a.fullname || 'Anonymous'" :subtitle="a.contribution" :prepend-icon="a.icon || 'mdi-account'" />
            <v-spacer />
            <v-list-item title="Add" prepend-icon="mdi-plus"></v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-form>
    <!-- actions -->
    <template #actions>
      <v-card-actions>
        <v-btn text @click="dispose">Cancel</v-btn>
        <v-spacer />
        <v-btn text @click="submit">Save</v-btn>
      </v-card-actions>
    </template>
  </form-card>
</template>

<script>
import formCard from '@/components/forms/formCard.vue';
import uiconf from '@/uiconf';

export default {
  name: 'infoDialog',
  components: {
    formCard,
  },
  props: {
    value: {
      type: Object,
      required: false,
      default: ()=>({})
    },
  },
  methods: {
    dispose() {
      this.$emit('close', false);
    },
    submit() {
      // update the value then dispose
      this.$emit('value', this.service);
      this.dispose();
    }
  },
  data() {
    return {
      service: Object.assign({}, this.value),
      contact: {},
      ui: uiconf.fields,
    }
  },
}
</script>