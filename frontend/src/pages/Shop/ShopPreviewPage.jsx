// import React from 'react'

// const ShopPreviewPage = () => {
//   return (
//     <div>ShopPreviewPage</div>
//   )
// }

// export default ShopPreviewPage

import React from 'react'
import ShopInfo from '../../components/shop/layout/ShopInfo'
import ShopProfileData from '../../components/shop/layout/ShopProfileData'
import styles from '../../styles/styles'


const ShopPreviewPage = () => {
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <div className='w-full flex py-10 justify-between'>
        <div className='w-[25%] bg-[#fff] rounded-[5px] shadow-sm overflow-y-scroll h-screen sticky top-10 left-0 z-10'>
          <ShopInfo isOwner={false}/>
        </div>
        <div className='w-[72%] rounded-[4px]'>
          <ShopProfileData isOwner={false}/>
        </div>
      </div>
    </div>
  )
}

export default ShopPreviewPage