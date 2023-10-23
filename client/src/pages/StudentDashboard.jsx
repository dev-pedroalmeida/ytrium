import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const StudentDashboard = () => {
  return (
    <div>
      <Navbar userType={'estudante'} />
      <Outlet />  
    </div>
  )
}

export default StudentDashboard