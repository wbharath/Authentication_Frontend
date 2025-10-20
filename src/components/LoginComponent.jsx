import { useState } from 'react'
import { saveLoggedInUser, storeToken, userLogin } from '../service/AuthService'
import { useNavigate } from 'react-router-dom'

const LoginComponent = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigator = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()

    // console.log('=== LOGIN ATTEMPT ===')
    // console.log('Username:', username)
    // console.log('Password:', password)
    // console.log('Sending to backend:', {
    //   usernameOrEmail: username,
    //   password: password
    // })

    await userLogin(username, password)
      .then((response) => {
        console.log('Login success:', response.data)
        const token = 'Basic ' + window.btoa(username + ':' + password)
        storeToken(token)
        saveLoggedInUser(username)
        navigator('/todos')

        window.location.reload(false)
      })
      .catch((error) => {
        console.error('Login error:', error)
        console.error('Error response:', error.response?.data)
        alert('Invalid username or password')
      })
  }
  return (
    <div className="container mb-2">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h2 className="text-capitalize text-center">login form</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="row mb-3">
                  <label className="col-md-3 control-label">
                    Username or email
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value)
                      }}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-md-3 control-label">Password</label>
                  <div className="col-md-9">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                      }}
                    />
                  </div>
                </div>
                <div className="form-group mb-3">
                  <button
                    className="btn btn-primary"
                    onClick={(e) => handleLogin(e)}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent
