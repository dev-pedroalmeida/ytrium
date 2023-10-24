import React from 'react'
// import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <>
      {/* <Navbar userType={'admin'} /> */}
      <Outlet />
    </>
  )
}

export default AdminDashboard