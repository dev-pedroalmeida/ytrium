import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const InstructorDashboard = () => {
  return (
    <>
      <Navbar userType={'instrutor'} />
      <Outlet />
    </>
  )
}

export default InstructorDashboard