import React from 'react'
import DashboardHeader from '../../components/Dashboard/layout/DashboardHeader'
import DashboardSidebar from '../../components/Dashboard/layout/DashboardSidebar'
import AllProducts from "../../components/shop/AllProducts.jsx"

const ShopAllProducts = () => {
  return (
    <div>
        <DashboardHeader/>
        <div className='flex justify-between w-full'>
            <div className='w-[80px] 800px:w-[330px]'>
            <DashboardSidebar active={3}/>
            </div>
            <div className='w-full justify-center flex'>
            <AllProducts/>
            </div>
        </div>
    </div>
  )
}

export default ShopAllProducts