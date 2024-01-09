import React from 'react'
import DashboardHeader from '../../components/Dashboard/layout/DashboardHeader'
import DashboardSidebar from '../../components/Dashboard/layout/DashboardSidebar'
import ShopInbox from "../../components/shop/ShopInbox"

const ShopInboxPage = () => {
  return (
    <div>
         <DashboardHeader/>
        <div className='flex justify-between w-full'>
            <div className='w-[80px] 800px:w-[330px]'>
            <DashboardSidebar active={8}/>
            </div>
            <div className='w-full justify-center flex'>
            <ShopInbox/>
            </div>
        </div>
    </div>
  )
}

export default ShopInboxPage