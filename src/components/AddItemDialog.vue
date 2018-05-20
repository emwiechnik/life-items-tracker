<template>
  <v-dialog v-model="show" width="800px">
      <v-card>
        <v-card-title class="grey lighten-4 py-4 title">
          Create event or task
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12>
              <v-select
                :items="[ 'Event', 'Task' ]"
                label="Type"
                single-line
                prepend-icon="calendar_today"
                v-model="currentItem.type"
              ></v-select>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="title"
                placeholder="Title"
                v-model="currentItem.title"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="notes"
                placeholder="Details"
                rows=2
                multi-line
                v-model="currentItem.details"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-dialog
                  ref="dateDialog"
                  v-model="datePickerModal"
                  :return-value.sync="currentItem.date"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="currentItem.date"
                    placeholder="Date"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="currentItem.date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="datePickerModal = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.dateDialog.save(currentItem.date)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
            </v-flex>
            <v-flex xs6>
              <v-dialog
                ref="timeDialog"
                v-model="timePickerModal"
                :return-value.sync="currentItem.time"
                persistent
                lazy
                full-width
                width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="currentItem.time"
                  placeholder="Time"
                  prepend-icon="access_time"
                  readonly
                ></v-text-field>
                <v-time-picker v-model="currentItem.time" actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="timePickerModal = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.timeDialog.save(currentItem.time)">OK</v-btn>
                </v-time-picker>
              </v-dialog>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="show = false">Cancel</v-btn>
          <v-btn flat @click="addItem">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
  export default {
    props: [
      'show'
    ],
    data: () => {
      return {
        currentItem: {
          type: '',
          details: null,
          date: null,
          time: null
        },
        datePickerModal: false,
        timePickerModal: false
      }
    },
    methods: {
      addItem (newItem) {
        let that = this
        this.$store.dispatch('dataModule/addItem', this.currentItem).then(() => {
          that.show = false
        })
      }
    }
  }
</script>

