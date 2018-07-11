<template>
  <v-app id="life-tracker">
    <app-toolbar></app-toolbar>
    <v-content style="padding-left: 0px; padding-top: 0px;">
      <v-container fluid>
        <v-layout justify-center align-center>
          <v-card>
            <v-card-title class="grey lighten-4 py-4 title">
              {{ $t("signup.title") }}
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    v-model="email"
                    box
                    :label="$t('signup.emailAddress')"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    :append-icon="passwordHidden ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (passwordHidden = !passwordHidden)"
                    :type="passwordHidden ? 'password' : 'text'"
                    v-model="password"
                    box
                    :label="$t('signup.password')">
                  </v-text-field>
                </v-flex>
                <v-layout justify-center align-center>
                  <v-btn v-on:click="signUp">{{ $t("signup.signupBtn") }}</v-btn>
                </v-layout>
              </v-layout>
            </v-container>
          </v-card>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<style scoped>
.login-icon {
    border: none;
    display: inline-block;
    height: 18px;
    vertical-align: middle;
    width: 18px;
}
.with-padding {
  margin-right: 5px;
}
</style>
<script>
  import AppToolbar from './AppToolbar.vue'

  export default {
    components: {
      AppToolbar
    },
    data: () => ({
      email: '',
      password: '',
      repeatedPassword: ''
    }),
    methods: {
      signUp () {
        this.$store.dispatch('userModule/signUp', { email: this.email, password: this.password }).then(() => {
          this.$router.replace('/')
        }, err => {
          alert(err)
        })
      }
    }
  }
</script>
