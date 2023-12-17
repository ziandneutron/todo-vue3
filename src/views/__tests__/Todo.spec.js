import { describe, beforeEach, it, vi, expect } from 'vitest'
import { createRouterMock, injectRouterMock } from 'vue-router-mock'
import { mount, flushPromises } from '@vue/test-utils'
import TodoView from '@/views/TodoView.vue'
import { getTodoList } from '@/services/todo.service.js';

vi.mock('@/services/todo.service')

let wrapper
describe('Test Feature Name List', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should ui failed when fetch todo is failed', async () => {
    getTodoListMockFailed()

    wrapper = createWrapper()

    await flushPromises()
    
    expectedUiFailedExistsToBe(true)
    expectedUiEmptyExistsToBe(false)
  })

  it('should ui empty when todo list is empty', async () => {
    getTodoListMockEmpty()

    wrapper = createWrapper()

    await flushPromises()

    expectedUiEmptyExistsToBe(true)
    expectedUiFailedExistsToBe(false)
  })

  it('should todo list exists with 5 items', async () => {
    getTodoListMock()

    wrapper = createWrapper()

    await flushPromises()

    expectedTodoCardLengthToBeFive()
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
  return mount(TodoView)
}

function getTodoListMockFailed() {
  getTodoList.mockRejectedValue({
    response: {
      data: {}
    }
  })
}

function expectedUiFailedExistsToBe(exists) {
  const uiFailed = wrapper.find('[data-test="ui-failed"]')
  expect(uiFailed.exists()).toBe(exists)
}

function getTodoListMockEmpty() {
  getTodoList.mockResolvedValue({
    data: {
      "page": 1,
      "docs": []
    }
  })
}

function expectedUiEmptyExistsToBe(exists) {
  const uiEmpty = wrapper.find('[data-test="ui-empty"]')
  expect(uiEmpty.exists()).toBe(exists)
}

function getTodoListMock() {
  getTodoList.mockResolvedValue({
    data: {
      "page": 1,
      "docs": [
        {
          "id": "1",
          "title": "todo 1",
          "description": "description todo 1"
        },
        {
          "id": "2",
          "title": "todo 2",
          "description": "description todo 2"
        },
        {
          "id": "3",
          "title": "todo 3",
          "description": "description todo 3"
        },
        {
          "id": "4",
          "title": "todo 4",
          "description": "description todo 4"
        },
        {
          "id": "5",
          "title": "todo 5",
          "description": "description todo 5"
        }
      ]
    }
  })
}

function expectedTodoCardLengthToBeFive() {
  const todoCard = wrapper.findAll('[data-test="todo-card"]')
    expect(todoCard.length).toBe(5)
}