<template>
  <v-expansion-panel>
    <v-expansion-panel-content v-for="(item, index) in formattedItems" :key="index" hide-actions>
      <div slot="header">
        <v-layout d-flex row>
          <v-flex d-flex md10>
            <div>
              <span>{{ item.title }}</span><br>
              <span class="grey--text">{{ item.details }}</span><br>
            </div>
          </v-flex>
          <v-flex d-flex md2>
            <div>
              <span>{{ item.type}}</span><br>
              <span class="green--text">{{ item.when }}</span><br>
            </div>
          </v-flex>
        </v-layout>
      </div>
      <v-card>
        <v-card>
        <v-card-title>
          <div>
            <span>Details</span><br>
            <span>{{ item.details }}</span><br>
            <span>Date and time</span><br>
            <span>{{ item.date }}, {{ item.time }}</span><br>
          </div>
        </v-card-title>
        </v-card>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
  import { mapGetters } from 'vuex'
  import moment from 'moment'

  export default {
    computed: {
      ...mapGetters('dataModule', ['items'])
    },
    watch: {
      items: function () {
        this.formatItems()
      }
    },
    data: function () {
      return {
        formattedItems: []
      }
    },
    methods: {
      loadData () {
        this.$store.dispatch('dataModule/loadItems').then(() => {
          this.formatItems()
        })
      },
      formatItems () {
        let that = this
        that.formattedItems = []
        this.items.forEach(item => {
          that.formattedItems.push({
            title: item.title,
            details: item.details,
            type: item.type,
            when: this.getWhenField(item.date, item.time),
            date: item.date,
            time: item.time
          })
        })
      },
      getWhenField (date, time) {
        return moment(date).fromNow()
      }
    },
    mounted () {
      this.loadData()
    }
  }
</script>
