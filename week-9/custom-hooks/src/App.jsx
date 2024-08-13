import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useTodos from './hooks/useTodos'

function App() {
  const { todos, loading, error } = useTodos();




  return (
    <div>
      {todos.map((todo)=>{
        return <div>{todo.title} </div>
      })}
    </div>
  )
}

export default App
