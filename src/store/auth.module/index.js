import ApiService from '@/services/api.service'
import TokenService from '@/services/token.service'
import {
  LOGIN,
  LOGOUT,
  CHECK_AUTH,
} from './actions.type'
import { SET_AUTH, PURGE_AUTH, SET_ERROR } from './mutations.type'

const state = {
  error: null,
  user: {},
  isAuthenticated: !!TokenService.getToken()
}

export const actions = {
  async [LOGIN] (context, credentials) {
    try {
      const response = await ApiService.post('auth', credentials)
      context.commit(SET_AUTH, response.data)
    } catch (error) {
      if (error.response.status === 400) {
        context.commit(SET_ERROR, error.response.data.non_field_errors[0])
      }
    }
  },
  [LOGOUT] (context) {
    context.commit(PURGE_AUTH)
  },
  [CHECK_AUTH] (context) {
    const token = TokenService.getToken()
    if (token) {
      ApiService.setAuthHeader(token)
    } else {
      context.commit(PURGE_AUTH)
    }
  }
}

const mutations = {
  [SET_ERROR] (state, error) {
    state.error = error
  },
  [SET_AUTH] (state, user) {
    state.isAuthenticated = true
    state.user = user
    state.error = null
    TokenService.saveToken(user.token)
  },
  [PURGE_AUTH] (state) {
    state.isAuthenticated = false
    state.user = {}
    state.error = null
    TokenService.destroyToken()
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
