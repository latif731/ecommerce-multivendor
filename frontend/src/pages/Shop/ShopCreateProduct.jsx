import React from 'react'
import DashboardHeader from '../../components/Dashboard/layout/DashboardHeader'
import DashboardSidebar from '../../components/Dashboard/layout/DashboardSidebar'
import CreateProduct from  "../../components/shop/CreateProduct"

const ShopCreateProduct = () => {
  return (
    <div>
        <DashboardHeader/>
        <div className='flex items-center justify-between w-full'>
            <div className='w-[8p0x] 800px:w-[330px]'>
            <DashboardSidebar active={4}/>
            </div>
            <div className='w-full justify-center flex'>
            <CreateProduct/>
            </div>
        </div>
    </div>
  )
}

export default ShopCreateProduct