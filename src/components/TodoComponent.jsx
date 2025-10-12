import { useEffect, useState } from 'react'
import { createTodo, getTodo, updateTodo } from '../service/TodoService'
import { useNavigate, useParams } from 'react-router-dom'

function TodoComponent() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)
  const navigator = useNavigate()

  const { id } = useParams()
  const [errors, setErrors] = useState({
    title: '',
    description: ''
  })

  useEffect(() => {
    if (id) {
      getTodo(id)
        .then((response) => {
          setTitle(response.data.title)
          setDescription(response.data.description)
          setIsCompleted(response.data.completed)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [id])

  function saveOrUpdateorDeleteTodo(e) {
    e.preventDefault()
    if (validateForm()) {
      const todo = { title, description, completed: isCompleted }
      console.log(todo)
      console.log(isCompleted)

      if (id) {
        updateTodo(todo, id)
          .then((response) => {
            console.log(response.data)
            navigator('/todos')
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        createTodo(todo)
          .then((response) => {
            console.log(response.data)
            navigator('/todos')
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  }

  function validateForm() {
    let valid = true
    const errorsCopy = { ...errors }

    if (title.trim()) {
      errorsCopy.title = ''
    } else {
      errorsCopy.title = 'Title is required'
      valid = false
    }

    if (description.trim()) {
      errorsCopy.description = ''
    } else {
      errorsCopy.description = 'Description is required'
      valid = false
    }
    setErrors(errorsCopy)
    return valid
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white text-center py-3">
              <h2 className="mb-0">{id ? 'Update Todo' : 'Add Todo'}</h2>
            </div>
            <div className="card-body p-4">
              <form onSubmit={saveOrUpdateorDeleteTodo}>
                <div className="mb-4">
                  <label
                    htmlFor="exampleinputtext"
                    className="form-label fw-semibold"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-lg ${
                      errors.title ? 'is-invalid' : ''
                    }`}
                    id="exampleinputtext"
                    placeholder="Enter todo title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  {errors.title && (
                    <div className="invalid-feedback">{errors.title}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="exampleInputtext_desc"
                    className="form-label fw-semibold"
                  >
                    Description
                  </label>
                  <textarea
                    className={`form-control form-control-lg ${
                      errors.description ? 'is-invalid' : ''
                    }`}
                    id="exampleInputtext_desc"
                    rows="4"
                    placeholder="Enter todo description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>

                <div className="mb-4">
                  <div className="form-check form-switch">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheckCompleted"
                      checked={isCompleted}
                      onChange={(e) => setIsCompleted(e.target.checked)}
                      style={{ width: '3em', height: '1.5em' }}
                    />
                    <label
                      className="form-check-label fw-semibold ms-2"
                      htmlFor="exampleCheckCompleted"
                    >
                      Mark as Completed
                    </label>
                  </div>
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary btn-lg">
                    {id ? 'Update Todo' : 'Add Todo'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigator('/todos')}
                  >
                    Cancel
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

export default TodoComponent
