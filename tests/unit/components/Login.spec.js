import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'

import Login from '@/components/Login'
import { LOGIN } from '@/store/auth.module/actions.type'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Login component', () => {
  let wrapper
  const mockStore = {
    dispatch: jest.fn(),
    _modulesNamespaceMap: {
      'auth/': {
        context: {
          dispatch: jest.fn()
        }
      }
    }
  }

  beforeEach(() => {
    wrapper = mount(Login, {
      localVue,
      mocks: { $store: mockStore },
      computed: {
        error: () => 'test error',
      },
      data: () => ({
        valid: true
      })
    })
  })

  it('should dispatch login action', async () => {
    wrapper.find('[data-test="username"]').setValue('username')
    wrapper.find('[data-test="password"]').setValue('password')
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    wrapper.find('[data-test="login"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(mockStore._modulesNamespaceMap['auth/'].context.dispatch).toHaveBeenCalledWith(
      `${LOGIN}`,
      { username: 'username', password: 'password' }
    )
  })
})
