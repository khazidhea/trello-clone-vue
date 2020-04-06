import ApiService from '@/services/api.service'
import TokenService from '@/services/token.service'
import {
  LOGIN,
  LOGOUT,
  // REGISTER,
  // CHECK_AUTH,
  // UPDATE_USER
} from './actions.type'
import { SET_AUTH, PURGE_AUTH, SET_ERROR } from './mutations.type'

const state = {
  errors: null,
  user: {},
  isAuthenticated: !!TokenService.getToken()
}

export const actions = {
  async [LOGIN] (context, credentials) {
    try {
      const response = await ApiService.post('auth', credentials)
      context.commit(SET_AUTH, response.data)
    } catch (error) {
      context.commit(SET_ERROR, error.response.data)
    }
  },
  [LOGOUT] (context) {
    context.commit(PURGE_AUTH)
  },
}

const mutations = {
  [SET_ERROR] (state, error) {
    state.errors = error
  },
  [SET_AUTH] (state, user) {
    state.isAuthenticated = true
    state.user = user
    state.errors = {}
    TokenService.saveToken(user.token)
  },
  [PURGE_AUTH] (state) {
    state.isAuthenticated = false
    state.user = {}
    state.errors = {}
    TokenService.destroyToken()
  }
}

export default {
  state,
  actions,
  mutations,
}
