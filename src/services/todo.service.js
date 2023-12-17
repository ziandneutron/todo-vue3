import axios from "@/plugins/axios";

export function getTodoList(page) {
    return axios.get('/todo', {
    params: {
      page
    }
  });
}

export function createTodo({ title, description }) {
  return axios.post('/todo', {
    title,
    description,
  })
}

export function deleteTodo(id) {
  return axios.delete(`todo/${id}`)
}