import React, { useState } from 'react'

function App() {

  return (
    <div>
      <br/>
      <br/>
      <br/>
      <Header title="asinkect"/>
      <HeaderwithButton/>
      <Header title="Ramana"/>
    </div>
  )
}

export default App

function HeaderwithButton() {
  const [title,setTitle] = useState('test')

  return (
    <div>
      <button onClick={() => setTitle(Math.random())}>Click second</button>
    </div>
  )
}
function Header(props) {

  return (
    <div>I'm {props.title}</div>
  )
}