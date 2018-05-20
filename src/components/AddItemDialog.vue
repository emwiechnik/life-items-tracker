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
                :items="[ { text: 'Event' }, { text: 'Task' } ]"
                label="Type"
                single-line
                prepend-icon="calendar_today"
              ></v-select>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="notes"
                placeholder="Details"
                rows=2
                multi-line
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-dialog
                  ref="dateDialog"
                  v-model="datePickerModal"
                  :return-value.sync="date"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="date"
                    placeholder="Date"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="datePickerModal = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.dateDialog.save(date)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
            </v-flex>
            <v-flex xs6>
              <v-dialog
                ref="timeDialog"
                v-model="timePickerModal"
                :return-value.sync="time"
                persistent
                lazy
                full-width
                width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="time"
                  placeholder="Time"
                  prepend-icon="access_time"
                  readonly
                ></v-text-field>
                <v-time-picker v-model="time" actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="timePickerModal = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.timeDialog.save(time)">OK</v-btn>
                </v-time-picker>
              </v-dialog>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="show = false">Cancel</v-btn>
          <v-btn flat @click="show = false">Add</v-btn>
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
      date: null,
      time: null,
      datePickerModal: false,
      timePickerModal: false
    }
  }
}
</script>

