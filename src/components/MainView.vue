<template>
  <v-app id="life-tracker">
    <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" fixed app>
      <app-menu :items="items"></app-menu>
    </v-navigation-drawer>
    <app-toolbar v-model="drawer"></app-toolbar>

    <v-content style="padding-left: 0px; padding-top: 0px;">
      <v-container fluid>
        <v-layout justify-center align-center>
          <items-list></items-list>
        </v-layout>
      </v-container>
    </v-content>
    <add-item-button></add-item-button>
  </v-app>
</template>

<script>
  import ItemsList from './ItemsList.vue'
  import AppMenu from './AppMenu.vue'
  import AppToolbar from './AppToolbar.vue'
  import AddItemButton from './AddItemButton.vue'

  export default {
    components: {
      ItemsList,
      AppMenu,
      AppToolbar,
      AddItemButton
    },
    data: function () {
      return {
        drawer: null
      }
    }
  }
</script>
