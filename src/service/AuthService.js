import axios from 'axios'

const REST_API_BASE_URL = 'http://localhost:8080/api/auth'

export const userRegistration = (register) => {
  return axios.post(REST_API_BASE_URL +'/register', register)
}
