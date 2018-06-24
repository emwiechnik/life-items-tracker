<template>
  <v-list dense>
    <v-list-tile @click="showUpcomingItems" v-if="itemsViewMode.past">
      <v-list-tile-action><v-icon>settings</v-icon></v-list-tile-action>
      <v-list-tile-content><v-list-tile-title>{{ $t("mainMenu.futureItems") }}</v-list-tile-title></v-list-tile-content>
    </v-list-tile>
    <v-list-tile @click="showPastItems" v-if="itemsViewMode.upcoming">
      <v-list-tile-action><v-icon>settings</v-icon></v-list-tile-action>
      <v-list-tile-content><v-list-tile-title>{{ $t("mainMenu.pastItems") }}</v-list-tile-title></v-list-tile-content>
    </v-list-tile>
    <v-divider></v-divider>
    <v-list-tile @click="sync">
      <v-list-tile-action><v-icon>sync</v-icon></v-list-tile-action>
      <v-list-tile-content><v-list-tile-title>{{ $t("mainMenu.sync") }}</v-list-tile-title></v-list-tile-content>
    </v-list-tile>
    <v-divider></v-divider>
    <v-list-tile>
      <v-list-tile-action><v-icon>help</v-icon></v-list-tile-action>
      <v-list-tile-content><v-list-tile-title>{{ $t("mainMenu.help") }}</v-list-tile-title></v-list-tile-content>
    </v-list-tile>
    <v-list-tile>
      <v-list-tile-action><v-icon>settings</v-icon></v-list-tile-action>
      <v-list-tile-content><v-list-tile-title>{{ $t("mainMenu.settings") }}</v-list-tile-title></v-list-tile-content>
    </v-list-tile>
    <v-list-tile>
      <v-list-tile-action><v-icon>chat_bubble</v-icon></v-list-tile-action>
      <v-list-tile-content><v-list-tile-title>{{ $t("mainMenu.feedback") }}</v-list-tile-title></v-list-tile-content>
    </v-list-tile>
    <v-list-tile @click="logout">
      <v-list-tile-action><v-icon>exit_to_app</v-icon></v-list-tile-action>
      <v-list-tile-content><v-list-tile-title>{{ $t("mainMenu.logOut") }}</v-list-tile-title></v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters('dataModule', ['itemsViewMode'])
    },
    methods: {
      showUpcomingItems () {
        this.$store.dispatch('dataModule/loadUpcomingItems')
      },
      showPastItems () {
        this.$store.dispatch('dataModule/loadPastItems')
      },
      sync () {
        this.$store.dispatch('dataModule/sync').then(() => {
          this.$store.dispatch('dataModule/loadItems')
        })
        this.drawer = false
      },
      logout () {
        this.$store.dispatch('userModule/logout').then(() => {
          this.$router.push('/login')
        })
      }
    }
  }
</script>

