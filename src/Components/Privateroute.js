import React, { useContext} from 'react'
import {Navigate,Outlet} from 'react-router-dom'
import {AuthContext} from '../Context/AuthContext'
 
function Privateroute() {
    const {user} = useContext(AuthContext)
  return (
      user?<Outlet/>:<Navigate to='/login'/>
  )
}

export default Privateroute