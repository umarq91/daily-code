import { useEffect, useState } from "react";


export function useIsOnline(){
const [isOnline,setIsOnline ] = useState(false)



useEffect(()=>{

window.addEventListener('online',()=>setIsOnline(true))
window.addEventListener('offline',()=>setIsOnline(false))

},[])

return isOnline;
} 