<template>
  <v-expansion-panel>
    <v-expansion-panel-content v-for="(item, index) in items" :key="index" hide-actions>
      <div slot="header">
        <v-layout d-flex row>
          <v-flex d-flex md10>
            <div>
              <span>{{ item.title }}</span><br>
              <span class="grey--text">{{ item.notes }}</span><br>
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
            <span>{{ item.notes }}</span><br>
            <span>Due date</span><br>
            <span>{{ item.dueDate }}</span><br>
          </div>
        </v-card-title>
        </v-card>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters('dataModule', ['items'])
    },
    data: function () {
      return {

      }
    },
    methods: {
      loadData () {
        this.$store.dispatch('dataModule/loadItems')
      }
    },
    mounted () {
      this.loadData()
    }
  }
</script>
