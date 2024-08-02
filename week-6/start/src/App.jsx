import React, { useState } from 'react'

function App() {
const [name,setName] = useState('umer')
  return (
    <div>
      <br/>
      <button onClick={() => setName(Math.random())}>Click</button>
      <br/>
      <h2>my name {name}</h2>
      <br/>
      <Header title="asinkect"/>
      <HeaderwithButton/>
      <Header title="Ramana"/>
      <Header title="Ramana"/>
      <Header title="Ramana"/>
      <Header title="Ramana"/> <Header title="Ramana"/> <Header title="Ramana"/> <Header title="Ramana"/> <Header title="Ramana"/>
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

const Header = React.memo(function Header(props) {

  return (
    <div>I'm {props.title}</div>
  )
})