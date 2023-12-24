import React from 'react'
import styles from '../../../styles/styles'
import ProductCard from '../ProductCard/ProductCard'
import { useSelector } from 'react-redux'
import { productData } from '../../../static/data'

const FeaturedProduct = () => {

    const {allProducts} = useSelector((state) => state.products)
    // console.log("featured product", allProducts)



  return (
    <div className={`${styles.section}`} style={{marginTop:"40px"}}>
        <div className={`${styles.heading}`}>
            <h1>Featured Product</h1>
        </div>
        <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px]'>
            {
                allProducts && allProducts.map((i, index) => (
                    <ProductCard
                    data={i}
                    key={index}
                    />
                ))
            }
        </div>
    </div>
  )
}

export default FeaturedProduct