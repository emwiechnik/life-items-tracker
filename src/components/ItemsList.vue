<template>
  <v-expansion-panel>
    <div v-if="!authorized">{{ $t('db.unauthorized') }}</div>
    <div v-if="!connected">Could not initialize fetching data from remote source</div>
    <v-expansion-panel-content v-for="(item, index) in formattedItems" :key="index" hide-actions>
      <div slot="header">
        <v-layout d-flex row>
          <v-flex d-flex xs10 md10>
            <div>
              <span>{{ item.title }}</span><br>
              <span class="grey--text">{{ item.details }}</span><br>
            </div>
          </v-flex>
          <v-flex d-flex xs2 md2>
            <div>
              <span>{{ $t('item.type_'+item.type.toLowerCase()) }}</span><br>
              <span class="green--text">{{ item.when }}</span><br>
            </div>
          </v-flex>
        </v-layout>
      </div>
      <v-card>
        <v-card>
        <v-card-title>
          <div>
            <span>{{ $t('item.details') }}</span><br>
            <span>{{ item.details }}</span><br>
            <span>{{ $t('item.dateTime') }}</span><br>
            <span>{{ item.date }}, {{ item.time }}</span><br>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat v-on:click="editItem(item)"><v-icon>edit</v-icon>{{ $t('item.edit') }}</v-btn>
          <v-btn flat><v-icon>delete</v-icon>{{ $t('item.delete') }}</v-btn>
        </v-card-actions>
        </v-card>
      </v-card>
    </v-expansion-panel-content>
    <update-item-dialog v-model="dialog" :item="currentItem" v-on:submitted="updateItem" update></update-item-dialog>
  </v-expansion-panel>
</template>

<script>
  import { mapGetters } from 'vuex'
  import moment from 'moment'
  import UpdateItemDialog from './AddOrUpdateItemDialog.vue'

  export default {
    components: {
      UpdateItemDialog
    },
    computed: {
      ...mapGetters('dataModule', ['items', 'authorized', 'connected']),
      ...mapGetters('appModule', ['lang'])
    },
    watch: {
      items: function () {
        this.formatItems()
      },
      lang: function () {
        this.loadData()
      }
    },
    data: function () {
      return {
        formattedItems: [],
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
      loadData () {
        this.$store.dispatch('dataModule/loadItems').then(() => {
          this.formatItems()
        })
      },
      formatItems () {
        this.formattedItems = this.items
        this.items.forEach(item => {
          item.when = this.getWhenField(item.date, item.time)
        })
      },
      getWhenField (date, time) {
        return moment(date).fromNow()
      },
      editItem (item) {
        this.currentItem = item
        this.dialog = true
      },
      updateItem (item) {
        this.$store.dispatch('dataModule/updateItem', item)
      }
    },
    mounted () {
      this.loadData()
    }
  }
</script>
