import { describe, beforeEach, it, vi, expect } from 'vitest'
import { createRouterMock, injectRouterMock } from 'vue-router-mock'
import { mount, flushPromises } from '@vue/test-utils'
import TodoView from '@/views/TodoView.vue'
import { getTodoList, deleteTodo } from '@/services/todo.service.js';

vi.mock('@/services/todo.service')
window.alert = vi.fn()

let wrapper
describe('Test Feature Name Delete', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should show alert failed', async () => {
    getTodoListMock()
    deleteTodoMockFailed()
    confirmed()

    wrapper = createWrapper()

    await flushPromises()
    
    clickButtonDeleteTodo(0)

    await flushPromises()

    expectedTodoDeletedWithId("1")
    expectedNotRefreshTodoList()
    expectedShowAlert('Internal Server Error')
  })

  it('should cancel deleting', async () => {
    getTodoListMock()
    deleteTodoMockFailed()
    notConfirmed()

    wrapper = createWrapper()

    await flushPromises()
    
    clickButtonDeleteTodo(0)

    await flushPromises()

    expectedTodoNotDeleted()
    expectedNotRefreshTodoList()
  })

  it('should show alert success', async () => {
    getTodoListMock()
    deleteTodoMock()
    confirmed()

    wrapper = createWrapper()

    await flushPromises()
    
    clickButtonDeleteTodo(0)

    await flushPromises()

    expectedTodoDeletedWithId("1")
    expectedRefreshTodoList()
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

function deleteTodoMock() {
  deleteTodo.mockResolvedValue({
    data: {
      message: 'Todo is deleted'
    }
  })
}

function deleteTodoMockFailed() {
  deleteTodo.mockRejectedValue({
    response: {
      data: {
        message: 'Internal Server Error'
      }
    }
  })
}

function expectedShowAlert(message) {
  expect(window.alert).toHaveBeenCalledWith(message)
}

function notConfirmed() {
  window.confirm = vi.fn().mockReturnValue(false)
}

function confirmed() {
  window.confirm = vi.fn().mockReturnValue(true)
}

function clickButtonDeleteTodo(index) {
  wrapper.find(`[data-test="btn-delete-todo-${index}"]`).trigger('click')
}

function expectedTodoNotDeleted () {
  expect(deleteTodo).not.toHaveBeenCalled()
}

function expectedNotRefreshTodoList () {
  expect(getTodoList).toHaveBeenCalledTimes(1)
}

function expectedTodoDeletedWithId (id) {
  expect(deleteTodo).toHaveBeenCalledWith(id)
}

function expectedRefreshTodoList () {
  expect(getTodoList).toHaveBeenCalledTimes(2)
}