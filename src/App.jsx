import ListToDoComponent from './components/ListToDoComponent'
import HeaderComponent from './components/HeaderComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TodoComponent from './components/TodoComponent'
import RegisterComponent from './components/RegisterComponent'

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<ListToDoComponent />} />
          <Route path="/todos" element={<ListToDoComponent />} />
          <Route path="/add-todo" element={<TodoComponent />} />
          <Route path="/update-todo/:id" element={<TodoComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
