<template>
  <v-card>
    <v-list three-line>
      <template v-for="(item, index) in items">
        <v-list-tile :key="item.title" avatar ripple @click="toggle(index)">
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
            <!-- <div>
              <span class="grey--text">Number 10</span><br>
              <span>Whitehaven Beach</span><br>
              <span>Whitsunday Island, Whitsunday Islands</span>
            </div> -->
          </v-list-tile-content>
          <v-list-tile-action>
            <v-list-tile-action-text>Event</v-list-tile-action-text>
            <v-list-tile-action-text>In 2 days 5hours</v-list-tile-action-text>
            <v-list-tile-action-text></v-list-tile-action-text>
            <v-list-tile-action-text></v-list-tile-action-text>
            <!-- <v-icon
              v-if="selected.indexOf(index) < 0"
              color="grey lighten-1"
            >star_border</v-icon>
            <v-icon
              v-else
              color="yellow darken-2"
            >star</v-icon> -->
          </v-list-tile-action>
          <!-- <v-list-tile-action>
            <v-icon>edit</v-icon>
            <v-icon>cancel</v-icon>
          </v-list-tile-action> -->
          <!-- <v-card>
            <v-card-title>
              <div>
                <span class="grey--text">Number 10</span><br>
                <span>Whitehaven Beach</span><br>
                <span>Whitsunday Island, Whitsunday Islands</span>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="orange">Share</v-btn>
              <v-btn flat color="orange">Explore</v-btn>
            </v-card-actions>
          </v-card> -->
        </v-list-tile>
        <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
      </template>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        selected: [2],
        items: [
          { action: '15 min', headline: 'Brunch this weekend?', title: 'Lightning Talk: Let\'s do it offline', subtitle: 'I need to be ready by this time, as I am giving a presentation!' },
          { action: '2 hr', headline: 'Summer BBQ', title: 'me, Scrott, Jennifer', subtitle: "Wish I could come, but I'm out of town this weekend." },
          { action: '6 hr', headline: 'Oui oui', title: 'Sandra Adams', subtitle: 'Do you have Paris recommendations? Have you ever been?' },
          { action: '12 hr', headline: 'Birthday gift', title: 'Trevor Hansen', subtitle: 'Have any ideas about what we should get Heidi for her birthday?' },
          { action: '18hr', headline: 'Recipe to try', title: 'Britta Holt', subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.' }
        ]
      }
    },

    methods: {
      toggle (index) {
        const i = this.selected.indexOf(index)

        if (i > -1) {
          this.selected.splice(i, 1)
        } else {
          this.selected.push(index)
        }
      }
    }
  }
</script>
