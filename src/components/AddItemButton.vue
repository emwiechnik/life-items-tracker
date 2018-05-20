<template>
  <div>
    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click.stop="dialog = !dialog"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <add-item-dialog v-model="dialog"></add-item-dialog>
  </div>
</template>

<script>
  import AddItemDialog from './AddItemDialog.vue'

  export default {
    components: {
      AddItemDialog
    },
    data: () => {
      return {
        dialog: false
      }
    }
  }
</script>

