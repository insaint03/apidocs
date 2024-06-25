<template>
  <v-footer app absolute height="400" color="black">
    <v-row>
      <v-col>
        <v-list dark color="default" lines="two" class="inherit">
          <v-list-subheader class="inherit">Featured Thanks to</v-list-subheader>
          <v-list-item v-for="(item, index) in supplied" :key="index" :href="item.href"
            :prepend-icon="item.icon" :title="item.title" :subtitle="item.subtitle">
            <template #append v-if="item.href">
              <v-btn flat icon :href="item.href" target="_blank" class="inherit">
                <v-icon>mdi-link</v-icon>
              </v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col>
      </v-col>
      <v-col class="d-flex align-start justify-end">
        <div>
          <v-label class="d-flex flex-fill">&copy;dxnlab. &lt;yg.song&gt; presents</v-label><br />
          <v-btn class="inherit" text href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank"
            title="license via Creative Commons BY-NC-SA 4.0">
            CC BY-NC-SA &nbsp;
            <br />
            <v-img 
              width="88"
              src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-sa.png"
              title="license via Creative Commons BY-NC-SA 4.0"
              alt="license via Creative Commons BY-NC-SA 4.0" />
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
export default {
  name: 'appFooter',
  props: {
  },
  data() {
    return {
      supplied: [
        {title: 'vuetify', icon:'$vuetify', subtitle: 'components/layout', href: 'https://vuetifyjs.com'},
        {title: 'markdown-it', icon:'mdi-language-markdown', subtitle: 'markdown', href: 'https://markdown-it.github.io'},
        {title: 'material design icons', icon:'mdi-material-design', subtitle: 'icons', href: 'https://pictogrammers.com/'},
        {title: 'github', icon: 'mdi-github', subtitle: 'Repository & others', href: 'https://github.com/insaint03/apidocs' },
      ]
    };
  }
}
</script>
<style scoped>
.inherit {
  background: inherit;
  color: inherit;
}
</style>