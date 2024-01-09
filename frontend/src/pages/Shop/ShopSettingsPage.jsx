import React from 'react'
import DashboardHeader from '../../components/Dashboard/layout/DashboardHeader'
import DashboardSidebar from '../../components/Dashboard/layout/DashboardSidebar'
import ShopSettings from "../../components/shop/ShopSettings"

const ShopSettingsPage = () => {
  return (
    <div>
          <DashboardHeader/>
        <div className='flex justify-between w-full'>
            <div className='w-[80px] 800px:w-[330px]'>
            <DashboardSidebar active={2}/>
            </div>
            <div className='w-full justify-center flex'>
            <ShopSettings/>
            </div>
        </div>
    </div>
  )
}

export default ShopSettingsPage