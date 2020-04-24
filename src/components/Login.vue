<template>
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">Login</h1>
    </v-card-title>
    <v-card-subtitle>
      <p data-test="error">{{ error }}</p>
    </v-card-subtitle>
    <v-card-text>
      <v-form>
        <v-text-field
          label="username"
          prepend-icon="mdi-account-circle"
          data-test="username"
          v-model="username"
        />
        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          label="password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          data-test="password"
          v-model="password"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn
        color="info"
        @click="login({ username, password })"
        data-test="login"
      >Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

import { LOGIN } from '@/store/auth.module/actions.type'
import { SET_ERROR } from '@/store/auth.module/mutations.type'

export default {
  data: () => ({
    showPassword: false,
    username: '',
    password: '',
  }),
  computed: {
    ...mapState('auth', ['error'])
  },
  methods: {
    login (credentials) {
      if (this.username === '') {
        this.$store.commit(`auth/${SET_ERROR}`, 'Login is a required field')
      } else {
        this.$store.dispatch(`auth/${LOGIN}`, credentials)
      }
    }
  },
}
</script>
