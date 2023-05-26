import React from 'react'
import { useLocation } from 'react-router-dom'

const Failed = () => {
  const location = useLocation()
//   console.log(location);
  return (
    <div>Payment failed</div>
  )
}

export default Failed