import nock from 'nock'

import { actions } from '@/store/auth.module'
import { LOGIN, LOGOUT } from '@/store/actions.type'
import { SET_AUTH, SET_ERROR, PURGE_AUTH } from '@/store/mutations.type'
import { API_URL } from '@/config'

const MOCK_USERNAME = 'user'
const MOCK_TOKEN = 'token'

describe('Auth module', () => {
  let commitFunction
  let context

  beforeEach(() => {
    commitFunction = jest.fn()
    context = { commit: commitFunction }
  })

  describe('Login action', () => {
    it('should set auth given good credentials', async () => {
      nock(API_URL)
        .post('/auth/')
        .reply(200, { user: MOCK_USERNAME, token: MOCK_TOKEN })

      await actions[LOGIN](context, {})
      expect(commitFunction.mock.calls[0][0]).toBe(SET_AUTH)
      expect(commitFunction.mock.calls[0][1]).toMatchObject({ user: MOCK_USERNAME, token: MOCK_TOKEN })
    })

    it('should set error given bad credentials', async () => {
      nock(API_URL)
        .post('/auth/')
        .reply(401, 'Bad credentials')

      await actions[LOGIN](context, {})
      expect(commitFunction.mock.calls[0][0]).toBe(SET_ERROR)
      expect(commitFunction.mock.calls[0][1]).toBe('Bad credentials')
    })
  })

  describe('Logout action', () => {
    it('should purge auth', async () => {
      await actions[LOGOUT](context, {})
      expect(commitFunction.mock.calls[0][0]).toBe(PURGE_AUTH)
    })
  })
})
