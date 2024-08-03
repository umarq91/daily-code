import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
const [id,setId] = useState(0)
  return (
<div>
  <button onClick={() => setId(1)}>1</button>
  <button onClick={() => setId(2)}>2</button>
  <button onClick={() => setId(3)}>3</button>
<Todo id={id}/>
</div>
  )
}

export default App



function Todo({id}){
const [todo,setTodo] = useState({})
useEffect(()=>{
  fetch('https://sum-server.100xdevs.com/todo?id='+id)
  .then(function (response) {
    const data = response.json()
    return data
  }).then(function (data) {
    console.log(data);
    setTodo(data.todo)
  })
},[id])
  return (
    <div>
      <h1>{todo?.title}</h1>
      <h4>{todo?.description}</h4>
    </div>
  )
}