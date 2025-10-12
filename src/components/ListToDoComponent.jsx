import { useEffect, useState } from 'react'
import { deleteTodo, getAllTodos } from '../service/TodoService'
import { useNavigate, useParams } from 'react-router-dom'

function ListToDoComponent() {
  const [todos, setTodos] = useState([])
  const navigator = useNavigate()
  useEffect(() => {
    getTodos()
  }, [todos])

  function getTodos() {
    getAllTodos()
      .then((response) => {
        console.log(response.data)
        setTodos(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function addNewTodo() {
    navigator('/add-todo')
  }
  function addUpdateTodo(id) {
    navigator(`/update-todo/${id}`)
  }
  function removeTodo(id) {
    console.log(id)
    deleteTodo(id)
      .then((response) => {
        getAllTodos()
      })
      .catch((error) => {
        console.log(error)
      })
    navigator('/todos')
  }

  return (
    <div className="container">
      <h2 className="text-center mb-4">List of Todos</h2>
      <button className="btn btn-primary mb-2" onClick={addNewTodo}>
        Add New Todo
      </button>

      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Completed</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => {
            return (
              <tr key={todo.id} className="table-primary">
                <th scope="row">{todo.id}</th>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo.completed ? 'Yes' : 'No'}</td>
                <td>
                  <button
                    type="submit"
                    className="btn btn-info me-2"
                    onClick={() => addUpdateTodo(todo.id)}
                  >
                    Update
                  </button>
                  <button
                    type="submit"
                    className="btn btn-danger"
                    onClick={() => removeTodo(todo.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ListToDoComponent
