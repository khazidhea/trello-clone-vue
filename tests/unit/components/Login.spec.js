import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'

import Login from '@/components/Login'
import { LOGIN } from '@/store/auth.module/actions.type'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Login button', () => {
  let wrapper
  const mockStore = { dispatch: jest.fn() }

  beforeEach(() => {
    wrapper = mount(Login, {
      localVue,
      mocks: { $store: mockStore }
    })
  })

  it('should dispatch login action', () => {
    wrapper.find('[data-test="username"]').setValue('username')
    wrapper.find('[data-test="password"]').setValue('password')
    wrapper.find('[data-test="login"]').trigger('click')
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      LOGIN,
      { username: 'username', password: 'password' }
    )
  })
})
