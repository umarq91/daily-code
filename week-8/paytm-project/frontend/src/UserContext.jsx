import axios from "axios";
import { createContext, useEffect, useState } from "react";



export const UserContext = createContext();


export function UserProvider ({children}) {
const [user,setUser] = useState({})
const [loading,setLoading]  =useState(false)

useEffect(()=>{
const fetchUser = async()=>{
    setLoading(true)
    try {
        const token = localStorage.getItem('token');
        if(token){
           const res =  await axios.get('http://localhost:3000/api/v1/user/me', {
                headers:{
                    authorization:`Bearer ${token}`
                }
            })
            
            if(res.status==200){
                setUser(res.data)
                setLoading(false)
            }
        }
    }catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
}
fetchUser()
},[])


    return (
<UserContext.Provider value={{user,loading}}>
    {children}
</UserContext.Provider>
    )
}