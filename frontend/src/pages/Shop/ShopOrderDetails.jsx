import React from 'react'
import DashboardHeader from '../../components/Dashboard/layout/DashboardHeader'
import DashboardSidebar from '../../components/Dashboard/layout/DashboardSidebar'
import OrderDetails from "../../components/shop/OrderDetails"
import Footer from '../../components/layout/Footer'

const ShopOrderDetails = () => {
  return (
    <div>
        <DashboardHeader/>
        <OrderDetails/>
        <Footer/>
    </div>
  )
}

export default ShopOrderDetails