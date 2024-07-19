<template>
  <v-footer app absolute height="400">
    <v-row class="border-t-thin">
      <v-col class="d-flex align-start flex-column">
        <div class="flex-fill" v-for="ln,li in links" :key="`footer-link.${li}`">
          <v-btn class="flex-fill"
            text flat size="small" 
            target="_blank" :href="ln.href" :title="ln.title">
            <v-icon left>{{ ln.icon }}</v-icon>
            &nbsp;
            <span>{{ ln.title }}</span>
          </v-btn>
        </div>
      </v-col>
      <v-col>
      </v-col>
      <v-col class="d-flex align-start justify-end">
        <div>
          <v-label class="d-flex flex-fill">&copy; yg.song, a.k.a. dxnlab. presents</v-label><br />
          <v-btn flat text
            class="inherit" 
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank"
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

const repository = 'https://github.com/insaint03/apidocs'
export default {
  name: 'appFooter',
  props: {
  },
  methods: {
  },
  data() {
    return {
      links: [
        {title: 'repository', icon: 'mdi-github', href: repository},
        {title: 'issues', icon: 'mdi-bug', href: `${repository}/issues`},
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