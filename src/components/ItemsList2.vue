<template>
  <v-container>
    <v-layout column>
      <template v-for="(item, index) in items">
        <v-flex d-flex md12 :key="index">
          <v-layout column>
            <v-flex v-on:click="item.expanded = !item.expanded">
              <v-layout d-flex row>
                <v-flex d-flex md10>
                  <v-card>
                    <v-card-title>
                      <div>
                        <span>{{ item.title }}</span><br>
                        <span class="grey--text">{{ item.notes }}</span><br>
                      </div>
                    </v-card-title>
                  </v-card>
                </v-flex>
                <v-flex d-flex md3>
                  <v-card>
                    <v-card-title>
                      <div>
                        <span>{{ item.type}}</span><br>
                        <span class="green--text">{{ item.when }}</span><br>
                      </div>
                    </v-card-title>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-slide-y-transition >
              <v-flex v-show="item.expanded">
                <v-card>
                  <v-card-title>
                    <div>
                      <span class="grey--text">{{ item.notes }}</span><br>
                    </div>
                  </v-card-title>
                </v-card>
              </v-flex>
            </v-slide-y-transition>
          </v-layout>
        </v-flex>
      </template>
    </v-layout>
  </v-container>
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
