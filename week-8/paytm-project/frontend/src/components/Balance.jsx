import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Balance() {
    const [balance,setBalance] = useState('')
useEffect(() => {
const getBalance = async()=>{

  const {data} =await axios.get('http://localhost:3000/api/v1/account/balance',{
    headers:{
      authorization:`Bearer ${localStorage.getItem('token')}`
    }
  })
  setBalance(data.balance)
}
getBalance()
},[])
  return (
    <div>
        <h2 className='font-bold text-xl'> Balance : {balance} PKR  </h2>
    </div>
  )
}

export default Balance