import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarBook from './SidebarBook'

const DashboardLayout = () => {
    return (
        <div className="flex gap-4 flex-col md:flex-row lg:p-8 ">
            <SidebarBook />
            <Outlet />
        </div>
    )
}

export default DashboardLayout
