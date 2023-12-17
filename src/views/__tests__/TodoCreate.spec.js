import { describe, beforeEach, it, vi, expect } from 'vitest'
import { createRouterMock, injectRouterMock } from 'vue-router-mock'
import { mount, flushPromises } from '@vue/test-utils'
import TodoCreateView from '@/views/TodoCreateView.vue'
import { createTodo } from '@/services/todo.service.js';

vi.mock('@/services/todo.service')

window.alert = vi.fn()

let wrapper
describe('Test Feature Name Create', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should show alert failed when click btn save', async () => {
    createTodoMockFailed()
    wrapper = createWrapper()
    
    inputTitle('todo 1')
    inputDescription('description todo 1')
    
    clickButtonCreate()

    await flushPromises()

    expectedCreateTodoCalledWith({ title: 'todo 1', description: 'description todo 1'})
    expectedAlertShowWithMessage('Internal Server Error')
  })

  it('should show alert success', async () => {
    createTodoMock()
    wrapper = createWrapper()
    
    inputTitle('todo 1')
    inputDescription('description todo 1')
    
    clickButtonCreate()

    await flushPromises()

    expectedCreateTodoCalledWith({ title: 'todo 1', description: 'description todo 1'})
    expectedAlertShowWithMessage('Todo is created')
  })

  it('should cannot save when required fields are empty', async () => {
    createTodoMock()
    wrapper = createWrapper()
    
    clickButtonCreate()

    await flushPromises()

    expectedCreateTodoNotCalled()
    expectedAlertNotShow()
  })
})

function createWrapper () {
  const router = createRouterMock({
    spy: {
      create: fn => vi.fn(fn),
      reset: spy => spy.mockReset()
    }
  })

  injectRouterMock(router)
  return mount(TodoCreateView)
}

function createTodoMock() {
  createTodo.mockResolvedValue({
    data: {
      message: 'Todo is created'
    }
  })
}

function createTodoMockFailed() {
  createTodo.mockRejectedValue({
    response: {
      data: {
        message: 'Internal Server Error'
      }
    }
  })
}

function inputTitle(title) {
  wrapper.find('[data-test="input-title"]').setValue(title)
}

function inputDescription(description) {
  wrapper.find('[data-test="input-description"]').setValue(description)
}

function clickButtonCreate() {
  wrapper.find('[data-test="btn-create"]').trigger('click')
}

function expectedCreateTodoCalledWith ({ title, description }) {
  expect(createTodo).toHaveBeenCalledWith({ title, description })
}

function expectedAlertShowWithMessage(message) {
  expect(window.alert).toHaveBeenCalledWith(message)
}

function expectedCreateTodoNotCalled () {
  expect(createTodo).not.toHaveBeenCalled()
}

function expectedAlertNotShow () {
  expect(window.alert).not.toHaveBeenCalled()
} 