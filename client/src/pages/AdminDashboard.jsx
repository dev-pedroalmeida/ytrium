import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div>
      <Navbar userType={'admin'} />
      <Outlet />
    </div>
  )
}

export default AdminDashboard