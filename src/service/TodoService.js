import axios from 'axios'

const REST_API_BASE_URL = 'http://localhost:8080/api/todos'

export const getAllTodos = () => {
  return axios.get(REST_API_BASE_URL)
}

export const createTodo = (todo) => {
  return axios.post(REST_API_BASE_URL, todo)
}

export const updateTodo = (todo, id) => {
  return axios.put(REST_API_BASE_URL + '/' + id, todo)
}

export const getTodo = (id) => {
  return axios.get(REST_API_BASE_URL + '/' + id)
}

export const deleteTodo = (id) => {
  return axios.delete(REST_API_BASE_URL + '/' + id)
}
