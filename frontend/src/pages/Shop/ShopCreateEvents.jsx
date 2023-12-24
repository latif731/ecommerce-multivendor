import React from 'react'
import CreateEvents from '../../components/shop/CreateEvents'
import DashboardHeader from '../../components/Dashboard/layout/DashboardHeader'
import DashboardSidebar from '../../components/Dashboard/layout/DashboardSidebar'


const ShopCreateEvents = () => {
  return (
    <div>
          <DashboardHeader/>
        <div className='flex items-center justify-between w-full'>
            <div className='w-[8p0x] 800px:w-[330px]'>
            <DashboardSidebar active={6}/>
            </div>
            <div className='w-full justify-center flex'>
            <CreateEvents/>
            </div>
        </div>
    </div>
  )
}

export default ShopCreateEvents