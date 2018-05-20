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
          <v-flex d-flex md3>
            <div>
              <span>{{ item.type}}</span><br>
              <span class="green--text">{{ item.when }}</span><br>
            </div>
          </v-flex>
        </v-layout>
      </div>
      <v-card>
        <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
  export default {
    data: function () {
      return {
        items: [
          { title: 'Lightning Talk: Let\'s do it offline', notes: 'I need to be ready by this time, as I am giving a presentation!', type: 'Event', when: 'In 1 week 2 days 3 hours', expanded: false },
          { title: 'Party at John Doe\'s', notes: 'A lot of everything!', type: 'Event', when: 'In 1 week 3 days', expanded: false },
          { title: 'Buy lamp', notes: 'I need it for an upcoming event', type: 'Task', when: 'Due in 1 week 2 days 3 hours', expanded: false },
          { title: 'Lightning Talk: Let\'s do it offline', notes: 'I need to be ready by this time, as I am giving a presentation!', type: 'Event', when: 'In 1 week 2 days 3 hours', expanded: false },
          { title: 'Lightning Talk: Let\'s do it offline', notes: 'I need to be ready by this time, as I am giving a presentation!', type: 'Event', when: 'In 1 week 2 days 3 hours', expanded: false }
        ]
      }
    }
  }
</script>
