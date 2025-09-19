import './App.css'
import Todo from './composants/Todo'
import type { TodoProps } from './composants/Todo'
import { ThemeProvider } from './components/theme-provider'
import ProtectedRoute from './composants/ProtectedRoute'

function App() {
  const savedTodos = localStorage.getItem("todos")
  const initTodo = savedTodos ? JSON.parse(savedTodos) : []
  const t = initTodo as TodoProps[]

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ProtectedRoute>
        <div>
          <Todo todos={t}/>
        </div>
      </ProtectedRoute>
    </ThemeProvider>
  )
}

export default App