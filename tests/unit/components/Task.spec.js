import { mount, createLocalVue } from '@vue/test-utils'

import ApiService from '@/services/api.service'
import Task from '@/components/Task'

jest.mock('../../../src/services/api.service')

const localVue = createLocalVue()

describe('Task component', () => {
  const task = {
    title: 'Test task'
  }

  it('should render task prop', async () => {
    const wrapper = mount(Task, {
      localVue,
      propsData: {
        task: task
      }
    })
    expect(wrapper.find('[data-test="title"]').text()).toBe('Test task')
  })

  it('should fetch task from api if no task prop is set', async () => {
    ApiService.get = jest.fn().mockResolvedValue(task)
    const wrapper = mount(Task, {
      localVue,
      propsData: {
        id: 123
      }
    })

    expect(ApiService.get).toHaveBeenCalledWith('tasks/123')
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[data-test="title"]').text()).toBe('Test task')
  })
})
