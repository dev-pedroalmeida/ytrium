import React from 'react'
import { Outlet } from 'react-router-dom'
// import Navbar from '../components/Navbar'

const StudentDashboard = () => {
  return (
    <>
      {/* <Navbar userType={'estudante'} /> */}
      <Outlet />  
    </>
  )
}

export default StudentDashboard