<template>
  <!-- right panel -->
  <v-navigation-drawer location="right" permanent>
    <v-list v-model:opened="opentabs">
      <!-- -->
      <!-- project info -->
      <v-list-subheader>{{ project.name }}</v-list-subheader>
      <v-list-group value="info">
        <template v-slot:activator="{ props }">
          <v-list-item title="info" v-bind="props"></v-list-item>
        </template>
        <v-list-item title="summary" />
        <v-list-item title="legal" />
        <v-list-item title="history" />
      </v-list-group>
      <!-- datatype schema -->
      <v-divider />
      <v-list-subheader>datatypes</v-list-subheader>
      <v-list-group v-for="types in tagtypes" :key="`schema-${types.title}`">
        <template v-slot:activator="{ props }">
          <v-list-item :title="types.title" v-bind="props"></v-list-item>
        </template>
        <v-list-item v-for="tp in types.scheme" :key="`schema-${types.title}-${tp}`" :title="tp" />
        <!-- TODO: other objects -->
        <!-- TODO: other enumerations -->
      </v-list-group>
      <v-divider />
      <!-- api endpoints -->
      <v-list-subheader>apis</v-list-subheader>
      <v-list-group v-for="apis in tagapis" :key="`ep-${apis.title}`">
        <template v-slot:activator="{ props }">
          <v-list-item :title="apis.title" v-bind="props"></v-list-item>
        </template>
        <v-list-item v-for="(ei, ep) in apis.endpoints" :key="`ep-${apis.title}-${ei}`">
          <v-list-item-title>{{ ep }}</v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
  <v-main>
    <v-expansion-panels>
      <!-- project info window -->
      <v-expansion-panel>
        <v-expansion-panel-title>
          {{ project.name }}
          <v-chip>{{ project.version }}</v-chip>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-card>
            <v-card-text>
              <v-row>
                <v-col>
                  <v-tabs v-model="prj_tab" direction="vertical">
                    <v-tab text="summary" value="summary"></v-tab>
                    <v-tab text="legal" value="legal"></v-tab>
                    <v-tab text="history" value="history"></v-tab>
                  </v-tabs>
                </v-col>
                <v-col>
                  <v-window v-model="prj_tab">
                    <v-window-item value="summary">
                      <v-table>
                        <tbody>
                          <tr>
                            <th>project</th>
                            <td>{{ project.name }}</td>
                          </tr>
                          <tr>
                            <th>version</th>
                            <td>{{ project.version }}</td>
                          </tr>
                        </tbody>
                      </v-table>
                    </v-window-item>
                  </v-window>
                </v-col>
              </v-row>
            </v-card-text>

          </v-card>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <!-- datatypes scheme -->
    <!-- api endpoints -->
  </v-main>
</template>
<script>
import { mapWritableState, mapActions, mapState } from 'pinia';
import { useProjectStore } from '@/stores/project';

export default {
  name: 'viewerView',
  methods: {
    ...mapActions(useProjectStore, [
      'load', 'save', 'cache',
    ]),
  },
  computed: {
    // computed getters (readonly)
    ...mapState(useProjectStore, [
      // templates getter
      'tagnames',
      // schema getter
      'tagtypes',
      // entities getter
      'tagapis',

    ]),
    // state properties
    ...mapWritableState(useProjectStore, [
      'project',
      'datatypes',
      'templates',
      'entities',
      'timestamp',
    ]),
  },
  data() {
    return {
      opentabs: [],
      prj_tab: null,
    };
  },
}
</script>