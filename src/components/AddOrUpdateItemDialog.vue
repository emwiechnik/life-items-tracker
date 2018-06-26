<template>
  <v-dialog v-if="currentItem" v-model="value" width="800px">
      <v-card>
        <v-card-title class="grey lighten-4 py-4 title">
          {{ $t('addOrUpdateDialog.title') }}
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12>
              <v-select
                :items="itemTypes"
                :label="$t('addOrUpdateDialog.itemType')"
                single-line
                prepend-icon="calendar_today"
                v-model="currentItem.type"
              ></v-select>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="title"
                :placeholder="$t('addOrUpdateDialog.placeholder_title')"
                v-model="currentItem.title"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="notes"
                :placeholder="$t('addOrUpdateDialog.placeholder_details')"
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
                    :placeholder="$t('addOrUpdateDialog.placeholder_date')"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="currentItem.date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="datePickerModal = false">{{ $t('button.cancel') }}</v-btn>
                    <v-btn flat color="primary" @click="$refs.dateDialog.save(currentItem.date)">{{ $t('button.ok') }}</v-btn>
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
                  :placeholder="$t('addOrUpdateDialog.placeholder_time')"
                  prepend-icon="access_time"
                  readonly
                ></v-text-field>
                <v-time-picker v-model="currentItem.time" actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="timePickerModal = false">{{ $t('button.cancel') }}</v-btn>
                  <v-btn flat color="primary" @click="$refs.timeDialog.save(currentItem.time)">{{ $t('button.ok') }}</v-btn>
                </v-time-picker>
              </v-dialog>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="hide">{{ $t('button.cancel') }}</v-btn>
          <v-btn flat @click="submit">{{ buttonTitle }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
  export default {
    props: {
      value: Boolean,
      item: Object,
      add: Boolean,
      update: Boolean
    },
    computed: {
      currentItem: function () {
        let dc = JSON.parse(JSON.stringify(this.item))
        // let sc = { ...this.item }
        // console.log(sc)
        // console.log(this.item)
        // return this.item
        return dc // todo: find out why only passing the this.item allows to edit the date properly; the other two options break the bahviour of the date update
      },
      buttonTitle: function () {
        if (this.add) {
          return this.$t('addOrUpdateDialog.add')
        } else {
          return this.$t('addOrUpdateDialog.update')
        }
      },
      itemTypes: function () {
        return [
          { text: this.$t('item.type_event'), value: 'event' },
          { text: this.$t('item.type_task'), value: 'task' }
        ]
      }
    },
    data: () => {
      return {
        datePickerModal: false,
        timePickerModal: false,
        show: this.value
      }
    },
    methods: {
      submit () {
        this.$emit('submitted', this.currentItem)
        this.hide()
      },
      hide () {
        this.$emit('input', false)
      }
    }
  }
</script>

