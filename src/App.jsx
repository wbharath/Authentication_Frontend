import ListToDoComponent from './components/ListToDoComponent'
import HeaderComponent from './components/HeaderComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TodoComponent from './components/TodoComponent'

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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
