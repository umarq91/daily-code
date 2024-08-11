import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import Users from '../components/Users'
import { UserContext } from '../UserContext'
import Balance from '../components/Balance'
function Dashboard() {
const {user} =useContext(UserContext)

  
  return (
    <div className='w-full min-h-screen bg-slate-300'>
      <h2 className='text-white font-bold text-3xl text-center py-10'>Dashboard</h2>
      <div className='md:p-20 w-full text-black'> 
      <Balance/>
        <Users/>
      </div>
    </div>
  )
}

export default Dashboard