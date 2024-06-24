<template>
  <v-toolbar flat :color="$thx.color.datatype">
    <v-toolbar-title>
      <v-icon>{{ $thx.icon.datatype }}</v-icon>
      datatypes
    </v-toolbar-title>
  </v-toolbar>
  <v-expansion-window>
    <v-expansion-window-item value="datatypes">
      <v-card flat>
        <v-card-text>
          <v-row>
            <v-col>
              <v-list>
                <v-list-item-group>
                  <v-list-item v-for="dt in datatypes" :key="`datatype-${dt.name}`" :value="dt.name">
                    <v-list-item-title>{{ dt.localname }}</v-list-item-title>
                    <v-list-item-subtitle>{{ dt.summary }}</v-list-item-subtitle>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-expansion-window-item>
  </v-expansion-window>

</template>