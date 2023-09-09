import React from 'react'
import { Link, useLocation} from 'react-router-dom'


const Failed = () => {
  const location = useLocation()
//   console.log(location);

  return (
    <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", gap: "20px", padding:"30px"}}>
      <div>Payment failed</div>
      <Link to="../login" >Login to continue</Link>
    </div>
  )
}

export default Failed