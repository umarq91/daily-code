import React, { useEffect, useState } from 'react'

function usePointer() {
const [mousePosition,setMousePosition] = useState({ x: 0, y: 0 })

useEffect(()=>{

    window.addEventListener('mousemove',(e)=>{
        setMousePosition({x:e.clientX,y:e.clientY})
        
    })

    return () => window.removeEventListener('mousemove',()=>{
        setMousePosition({ x: e.clientX, y: e.clientY });
    })
},[])



    return mousePosition
}

export default usePointer