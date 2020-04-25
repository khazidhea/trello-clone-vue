import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'

import Login from '@/components/Login'
import { LOGIN } from '@/store/auth.module/actions.type'

import store from '@/store/index'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Login component', () => {
  let wrapper

  store.dispatch = jest.fn()

  beforeEach(() => {
    wrapper = mount(Login, {
      localVue,
      mocks: { $store: store },
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
    expect(store.dispatch).toHaveBeenCalledWith(
      `auth/${LOGIN}`,
      { username: 'username', password: 'password' }
    )
  })
})
