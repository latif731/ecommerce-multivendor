import React,{useState} from 'react'
import DashboardHeader from '../../components/Dashboard/layout/DashboardHeader'
import DashboardSidebar from '../../components/Dashboard/layout/DashboardSidebar'
import AllCoupons from "../../components/shop/AllCoupons"
import AllProducts from '../../components/shop/AllProducts'
import styles from '../../styles/styles'
import WithdrawMoney from "../../components/shop/WithdrawMoney"



const ShopWithDrawMoneyPage = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex items-start justify-between w-full">
      <div className="w-[80px] 800px:w-[330px]">
        <DashboardSidebar active={7} />
      </div>
       <WithdrawMoney />
    </div>
  </div>
  )
}

export default ShopWithDrawMoneyPage