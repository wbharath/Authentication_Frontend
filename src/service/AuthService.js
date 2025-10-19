import axios from 'axios'

const REST_API_BASE_URL = 'http://localhost:8080/api/auth'

export const userRegistration = (register) => {
  return axios.post(REST_API_BASE_URL + '/register', register)
}

export const userLogin = (usernameOrEmail, password) => {
  const token = 'Basic ' + window.btoa(usernameOrEmail + ':' + password)

  return axios.post(
    REST_API_BASE_URL + '/login',
    { usernameOrEmail, password },
    {
      headers: {
        Authorization: token
      }
    }
  )
}

export const storeToken = (token) => localStorage.setItem('token', token)

export const getToken = () => localStorage.getItem('token')
