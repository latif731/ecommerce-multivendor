import React from 'react'
import DashboardSidebar from '../../components/Dashboard/layout/DashboardSidebar'
import DashboardHeader from '../../components/Dashboard/layout/DashboardHeader'
import AllOrders from "../../components/shop/AllOrders"

const ShopAllOrders = () => {
  return (
    <div>
        <DashboardHeader/>
        <div className='flex justify-between w-full'>
            <div className='w-[80px] 800px:w-[330px]'>
            <DashboardSidebar active={2}/>
            </div>
            <div className='w-full justify-center flex'>
            <AllOrders/>
            </div>
        </div>
    </div>
  )
}

export default ShopAllOrders