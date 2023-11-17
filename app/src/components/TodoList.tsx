// TodoList.tsx
import React, { useReducer, useState, ChangeEvent } from 'react'
import styled from 'styled-components'

// Types
interface Todo {
  id: number
  task: string
  isComplete: boolean
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'REMOVE_TODO'; payload: number }

// Reducer function
const todoReducer = (state: Todo[], action: TodoAction): Todo[] => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload]
    case 'TOGGLE_TODO':
      return state.map((todo) => (todo.id === action.payload ? { ...todo, isComplete: !todo.isComplete } : todo))
    case 'REMOVE_TODO':
      return state.filter((todo) => todo.id !== action.payload)
    default:
      return state
  }
}

// Styled components
const TodoContainer = styled.div`
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

const TodoItem = styled.div<{ isComplete: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: ${(props) => (props.isComplete ? '#e0f7fa' : 'white')};
`

// Component
const TodoList: React.FC = () => {
  const [todos, dispatch] = useReducer(todoReducer, [])
  const [newTodo, setNewTodo] = useState<string>('')

  const addTodo = () => {
    const todo: Todo = {
      id: Date.now(),
      task: newTodo,
      isComplete: false,
    }
    dispatch({ type: 'ADD_TODO', payload: todo })
    setNewTodo('')
  }

  return (
    <TodoContainer>
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="New Todo"
        value={newTodo}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      {todos.map((todo) => (
        <TodoItem key={todo.id} isComplete={todo.isComplete}>
          <div>{todo.task}</div>
          <div>
            <button onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}>
              {todo.isComplete ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => dispatch({ type: 'REMOVE_TODO', payload: todo.id })}>Remove</button>
          </div>
        </TodoItem>
      ))}
    </TodoContainer>
  )
}

export default TodoList
