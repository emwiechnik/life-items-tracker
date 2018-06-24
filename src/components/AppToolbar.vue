<template>
  <v-toolbar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    color="blue darken-3"
    dark
    app
    fixed
  >
    <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
      <v-toolbar-side-icon v-if="userAuthenticated" v-on:click.stop="$emit('input', !drawer)"></v-toolbar-side-icon>
      <span>Life Tracker</span>
    </v-toolbar-title>
    <v-text-field
      v-if="userAuthenticated"
      flat
      solo-inverted
      prepend-icon="search"
      label="Search"
      class="hidden-sm-and-down"
    ></v-text-field>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-card flat color="blue darken-3" v-if="userEmail"><v-card-title>{{ userEmail }}</v-card-title></v-card>
      <v-menu offset-y>
        <v-card slot="activator" flat color="blue darken-3"><v-card-title>{{ langName }} </v-card-title></v-card>
        <v-list>
          <v-list-tile v-for="lang in availableLanguages" :key="lang.locale" v-on:click="setLang(lang.locale)">
            <v-list-tile-title>{{ lang.name }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    props: [
      'value'
    ],
    computed: {
      drawer: function () {
        return this.value
      },
      ...mapGetters('userModule', ['userAuthenticated', 'userEmail']),
      ...mapGetters('appModule', ['lang', 'langName', 'availableLanguages'])
    },
    methods: {
      ...mapActions({
        setLang: 'appModule/setLocale'
      })
    },
    mounted () {
      this.$store.dispatch('userModule/refresh')
    }
  }
</script>

