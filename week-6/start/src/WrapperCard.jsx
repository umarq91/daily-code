import React from 'react'

function WrapperCard({children}) {

  return (
    <div className='card' style={{border:'2px solid black',padding:'10px'}}>
        {children}
        </div>
  )
}

export default WrapperCard