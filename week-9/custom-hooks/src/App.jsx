import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useTodos from './hooks/useTodos'
import useRefreshing from './hooks/useRefreshing'
import usePointer from './hooks/usePointer'

function App() {
  // const { todos, loading, error } = useTodos();
  const {todos,loading} = useRefreshing(10);
  const position = usePointer();

  return (
    <div>
      <p> Current Mouse Position is x: {position.x} , y: {position.y}</p>
      {todos.map((todo, index) => (
        <div key={index}>{todo.title}</div>
      ))}
    </div>
  );
}

export default App;
