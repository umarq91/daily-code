import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Users() {
    const [users,setUsers] = useState([])
const [filter,setFilter] = useState("")
const navigate= useNavigate()



useEffect(()=>{
    async function getData(){
       const res =  await axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter)
       setUsers(res.data.user)
    }
    getData()
  },[filter])
  
  return (
    <div>
    {/* Users */}
    <input 
          value={filter}
          onChange={(e)=>setFilter(e.target.value)}
          type="text" placeholder='Search User' className='w-full py-2 px-3 border-2 border-gray-200 mt-2 rounded-xl' />

          {/* Users */}
          <div>
            {users.map((user)=>(
              <div key={user._id} className='flex items-center justify-between my-4 bg-white p-2 rounded-md'>
                <p>{user.firstName + " " + user.lastName}</p>
                <button 
                onClick={()=> navigate(`/transfer?id=${user._id}&name=${user.firstName}`)}
                className='bg-green-700 py-1 px-3  rounded-md text-white'>Transfer</button>
              </div>
            ))}
          </div>
    </div>
  )
}

export default Users