import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

/* problem : making a counter , and a complex calculation, when counter changes , that calculation has to 
unneccessary re render again , that's why we use useMemo , to memoize / cache it between renders
*/
function App() {
  const [counter, setCounter] = useState(0)
  const [input,setInput] = useState(0)
  let count=0

  // here this is unnecessary re rendering when counter changes  
  for(let i=0;i<=input;i++){
    count += i
  }
  return (
   <div>
    <input type="number" onChange={(e)=>setInput(e.target.value)} />
    <p>text is 1 to {input} is {count}</p>
    <button onClick={()=>setCounter(counter+1)}>Counter {counter} </button>
   </div>
  )
}

export default App
