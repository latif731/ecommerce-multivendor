import React,{useState} from 'react'
import DashboardHeader from '../../components/Dashboard/layout/DashboardHeader'
import DashboardSidebar from '../../components/Dashboard/layout/DashboardSidebar'
import AllCoupons from "../../components/shop/AllCoupons"
import AllProducts from '../../components/shop/AllProducts'
import styles from '../../styles/styles'

const ShopAllCoupons = () => {
    const [open, setOpen] = useState(false)
    return (
        <div>  
        <DashboardHeader/>
    <div className='flex justify-between w-full'>
        <div className='w-[80px] 800px:w-[330px]'>
        <DashboardSidebar active={9}/>
        </div>
        <div className='w-full justify-center flex'>
        {/* <AllProducts
        button={<Button
        setOpen={setOpen}
        />}
        open={open}
        setOpen= {setOpen}
        /> */}
        <AllCoupons/>
        </div>
    </div>
    </div>
  )
}

const Button = ({setOpen}) => {
    return (
    <div className="w-full flex justify-end">
        <div className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
        onClick={() =>  setOpen(true)}
        >
            <button className='text-white'>Create Coupon Code</button>
        </div>
    </div>
    )
}


export default ShopAllCoupons