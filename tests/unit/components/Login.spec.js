import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'

import Login from '@/components/Login'
import { LOGIN } from '@/store/auth.module/actions.type'
import { SET_ERROR } from '@/store/auth.module/mutations.type'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Login component', () => {
  let wrapper
  const mockStore = { 
    dispatch: jest.fn(),
    commit: jest.fn()
  }

  beforeEach(() => {
    wrapper = mount(Login, {
      localVue,
      mocks: { $store: mockStore },
      computed: {
        error: () => 'test error'
      }
    })
  })

  it('requires login', () => {
    wrapper.find('[data-test="login"]').trigger('click')
    expect(mockStore.commit).toHaveBeenCalledWith(
      `auth/${SET_ERROR}`,
      'Login is a required field'
    )
  })

  // it('requires password', () => {

  // })

  // it('shows error given invalid credentials', () => {

  // })

  it('should dispatch login action', () => {
    wrapper.find('[data-test="username"]').setValue('username')
    wrapper.find('[data-test="password"]').setValue('password')
    wrapper.find('[data-test="login"]').trigger('click')
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      `auth/${LOGIN}`,
      { username: 'username', password: 'password' }
    )
  })
})
