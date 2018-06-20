<template>
  <v-app id="life-tracker">
    <app-toolbar></app-toolbar>
    <v-content style="padding-left: 0px; padding-top: 0px;">
      <v-container fluid>
        <v-layout justify-center align-center>
          <v-card>
            <v-card-title class="grey lighten-4 py-4 title">
              {{ $t("login.title") }}
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    v-model="email"
                    box
                    :label="$t('login.emailAddress')"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    :append-icon="passwordHidden ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (passwordHidden = !passwordHidden)"
                    :type="passwordHidden ? 'password' : 'text'"
                    v-model="password"
                    box
                    :label="$t('login.password')">
                  </v-text-field>
                </v-flex>
                <v-layout justify-center align-center>
                  <v-btn v-on:click="loginWithEmailAndPassword">{{ $t("login.signinBtn") }}</v-btn>
                  <v-btn flat>{{ $t("login.signupBtn") }}</v-btn>
                </v-layout>
              </v-layout>
            </v-container>
            <v-container grid-list-sm class="pa-4">
              <v-layout column>
                <v-btn color="white" black v-on:click="loginWithGoogle"><img class="login-icon with-padding" alt="" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg">{{ $t("login.googleSigninBtn") }}</v-btn>
                <v-btn color="primary" white><img class="login-icon with-padding" alt="" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg">{{ $t("login.fbSigninBtn") }}</v-btn>
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
      passwordHidden: true
    }),
    methods: {
      loginWithEmailAndPassword () {
        this.$store.dispatch('userModule/loginWithEmailAndPassword', { email: this.email, password: this.password }).then(() => {
          this.$router.replace('/')
        }, err => {
          alert(err)
        })
      },
      loginWithGoogle () {
        this.$store.dispatch('userModule/loginWithGoogle').then(() => {
          this.$router.replace('/')
        })
      }
    }
  }
</script>
