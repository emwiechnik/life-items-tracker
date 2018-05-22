<template>
  <div>
    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click.stop="invokeAddDialog"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <add-item-dialog v-model="dialog" :item="currentItem" v-on:submitted="addItem" add></add-item-dialog>
  </div>
</template>

<script>
  import AddItemDialog from './AddOrUpdateItemDialog.vue'

  export default {
    components: {
      AddItemDialog
    },
    data: () => {
      return {
        dialog: false,
        currentItem: {
          type: '',
          details: null,
          date: null,
          time: null
        }
      }
    },
    methods: {
      invokeAddDialog () {
        this.currentItem = this.getClearCurrentItem()
        this.dialog = true
      },
      addItem (item) {
        this.$store.dispatch('dataModule/addItem', item)
      },
      getClearCurrentItem () { // find a way not to duplicate the clear current item code
        return {
          type: '',
          details: null,
          date: null,
          time: null
        }
      }
    }
  }
</script>

