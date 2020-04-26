<template>
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">Login</h1>
    </v-card-title>
    <v-card-subtitle>
      <p data-test="error">{{ error }}</p>
    </v-card-subtitle>
    <v-card-text>
      <v-form v-model="valid">
        <v-text-field
          label="username"
          v-model="username"
          data-test="username"
          :rules="rules.username"
          prepend-icon="mdi-account-circle"
          required
        />
        <v-text-field
          label="password"
          v-model="password"
          data-test="password"
          :rules="rules.password"
          :type="showPassword ? 'text' : 'password'"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          required
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn
        color="info"
        @click="login({ username, password })"
        data-test="login"
        :disabled="!valid"
      >Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

import { LOGIN } from '@/store/auth.module/actions.type'

export default {
  data: () => ({
    showPassword: false,
    username: '',
    password: '',
    valid: false,
    rules: {
      username: [v => !!v || 'Username is required'],
      password: [v => !!v || 'Password is required'],
    }
  }),
  computed: {
    ...mapState('auth', ['error'])
  },
  methods: {
    async login (credentials) {
      await this.$store.dispatch(`auth/${LOGIN}`, credentials)
      this.$router.push({ name: 'tasks' })
    }
  },
}
</script>
