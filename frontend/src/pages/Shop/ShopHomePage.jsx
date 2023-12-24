import React from 'react'
import ShopInfo from '../../components/shop/layout/ShopInfo'
import ShopProfileData from '../../components/shop/layout/ShopProfileData'
import styles from '../../styles/styles'


const ShopHomePage = () => {
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <div className='w-full flex py-10 justify-between'>
        <div className='w-[25%] bg-[#fff] rounded-[5px] shadow-sm overflow-y-scroll h-screen sticky top-10 left-0 z-10'>
          <ShopInfo isOwner={true}/>
        </div>
        <div className='w-[72%] rounded-[4px]'>
          <ShopProfileData isOwner={true}/>
        </div>
      </div>
    </div>
  )
}

export default ShopHomePage