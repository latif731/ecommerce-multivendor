import React from 'react'
import DashboardHeader from '../../components/Dashboard/layout/DashboardHeader'
import DashboardSidebar from "../../components/Dashboard/layout/DashboardSidebar"

const ShopDashboardPage = () => {
  return (
    <div>
        <DashboardHeader/>
        <div
        className='flex items-center justify-between w-full'
        >
          <div className='w-[100px] 800px:w-[330px]'>
            <DashboardSidebar active={1}/>
          </div>
        </div>
    </div>
  )
}

export default ShopDashboardPage