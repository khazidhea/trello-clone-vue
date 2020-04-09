<template>
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">Login</h1>
    </v-card-title>
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
import { mapActions } from 'vuex'
import { LOGIN } from '@/store/auth.module/actions.type'

export default {
  data: () => ({
    showPassword: false,
    username: '',
    password: '',
  }),
  methods: {
    ...mapActions([LOGIN])
  },
}
</script>
