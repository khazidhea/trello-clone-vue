import { mount, createLocalVue } from '@vue/test-utils'

import ApiService from '@/services/api.service'
import TaskList from '@/components/TaskList'

jest.mock('../../../src/services/api.service')

const localVue = createLocalVue()

describe('TaskList component', () => {
  it('should get data from api', async () => {
    ApiService.get = jest.fn()
    const tasks = [
      {
        title: 'First task'
      },
      {
        title: 'Second task'
      }
    ]
    ApiService.get.mockReturnValue(Promise.resolve(tasks))

    const wrapper = mount(TaskList, {
      localVue,
    })

    expect(ApiService.get).toHaveBeenCalledWith('tasks')
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('[data-test="task"]').length).toBe(2)
  })
})
