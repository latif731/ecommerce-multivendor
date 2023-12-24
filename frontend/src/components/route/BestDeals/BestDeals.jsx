import React, { useEffect, useState } from 'react'
// import { productData } from '../../../static/data'
import styles from '../../../styles/styles'
import ProductCard from '../ProductCard/ProductCard'
import { getAllProductsShop } from '../../../redux/actions/product'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllProducts } from '../../../redux/actions/product'
// import { getAllProductsShop } from '../../../redux/actions/product'

const BestDeals = () => {
    const [data, setData] = useState([]);
    // console.log("data",data)
    // const { products } = useSelector((state) => state.products);
    const {allProducts} = useSelector((state) =>  state.products)
    // console.log("bestdeals", allProducts)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getAllProducts())
    },[])
    // console.log("allProducts",products)

    // const {id} = useParams()

    useEffect(() => {
        const allProductsData = allProducts ? [...allProducts] : [];
        const sortedData = allProductsData?.sort((a,b) => b.sold_out - a.sold_out); 
        const firstFive = sortedData && sortedData.slice(0, 5);
        setData(firstFive);
      }, [allProducts]);
    // useEffect(() => {
        //     const d = products && products.sort((a,b) =>  b.sold_out - a.sold_out)
    //     const firstFive = d?.slice(0,5)
    //     setData(firstFive)
    // },[])
    // useEffect(() => {
    //     const firstFive = products?.slice(0,5);
    //     setData(firstFive);
    // //   dispatch(getAllProductsShop(id))
    // },[])
    // useEffect(()=> {
    //     dispatch(getAllProductsShop(id))
    // },[dispatch])

  return (
    <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
            <h1>Best Deals</h1>
        </div>
        <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px]'>
            {
                data && data.map((i, index) => (
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

export default BestDeals