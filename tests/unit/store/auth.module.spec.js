import ApiService from '@/services/api.service'
import TokenService from '@/services/token.service'
import { actions } from '@/store/auth.module'
import { LOGIN, LOGOUT, CHECK_AUTH } from '@/store/auth.module/actions.type'
import { SET_AUTH, SET_ERROR, PURGE_AUTH } from '@/store/auth.module/mutations.type'

jest.mock('../../../src/services/api.service')
jest.mock('../../../src/services/token.service')

describe('Auth module', () => {
  const MOCK_USER = {}
  const MOCK_PASSWORD = 'goodpassword'
  const MOCK_CREDENTIALS = { user: MOCK_USER, password: MOCK_PASSWORD }
  const MOCK_TOKEN = 'sometoken'

  let commitFunction
  let context

  beforeEach(() => {
    commitFunction = jest.fn()
    context = { commit: commitFunction }
  })

  describe('Login action', () => {
    it('should set auth given good credentials', async () => {
      ApiService.post = jest.fn().mockResolvedValue({
        user: MOCK_USER, token: MOCK_TOKEN
      })

      await actions[LOGIN](context, MOCK_CREDENTIALS)

      expect(ApiService.post).toHaveBeenCalledWith('auth', MOCK_CREDENTIALS)
      expect(commitFunction.mock.calls[0][0]).toBe(SET_AUTH)
      expect(commitFunction.mock.calls[0][1]).toMatchObject(
        { user: MOCK_USER, token: MOCK_TOKEN }
      )
    })

    it('should set error given bad credentials', async () => {
      ApiService.post = jest.fn(() => {
        const error = new Error('test')
        error.response = {
          status: 400,
          data: {
            non_field_errors: ['Bad credentials']
          }
        }
        throw error
      })

      await actions[LOGIN](context, {})

      expect(commitFunction.mock.calls[0][0]).toBe(SET_ERROR)
      expect(commitFunction.mock.calls[0][1]).toBe('Bad credentials')
    })
  })

  describe('Logout action', () => {
    it('should purge auth', () => {
      actions[LOGOUT](context)

      expect(commitFunction.mock.calls[0][0]).toBe(PURGE_AUTH)
    })
  })

  describe('Check auth action', () => {
    it('should set header if there is saved auth data', () => {
      ApiService.setAuthHeader = jest.fn()
      TokenService.getToken = () => { return MOCK_TOKEN }

      actions[CHECK_AUTH](context)

      expect(ApiService.setAuthHeader).toHaveBeenCalledWith(MOCK_TOKEN)
    })

    it('should purge auth if there is no saved auth data', () => {
      ApiService.setAuthHeader = jest.fn()
      TokenService.getToken = () => { return undefined }

      actions[CHECK_AUTH](context)

      expect(commitFunction.mock.calls[0][0]).toBe(PURGE_AUTH)
    })
  })
})
