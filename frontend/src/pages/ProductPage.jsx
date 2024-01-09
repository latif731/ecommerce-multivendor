import React, { useEffect, useState } from 'react'
import Header from "../components/layout/Header"
import styles from '../styles/styles'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/route/ProductCard/ProductCard'
import { productData } from '../static/data'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProducts } from '../redux/actions/product'

const ProductPage = () => {
    const [ searchParams ] = useSearchParams()
    const [data, setData] = useState([])
    const categoryData = searchParams.get("category")
    const { allProducts, isLoading } = useSelector((state) => state.products)
    // console.log("ProductPage", allProducts)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getAllProducts())
    },[])

    useEffect(() => { 
        if(categoryData === null){
            // const d = productData && productData.sort((a,b) => a.total_sell - b.total_sell);
            // setData(d);
            const d = allProducts && [...allProducts]?.sort((a,b) =>  a.sold_out - b.sold_out);
            setData(d)
        }else{
            const d = allProducts && allProducts?.filter((i) => i.category === categoryData)
            setData(d)
        }
        window.scrollTo(0,0) 
    }, [allProducts])


  return (
    <div>
        <Header activeHeading={3}/>
        <br/>
        <br/>
        <div className={`${styles.section}`}>
            <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12'>
                {
                    data && data.map((i,index) => <ProductCard data={i} key={index}/>)
                }
            </div>
                {
                    data && data.length === 0 ? (
                        <h1 className='text-center w-full pb-[100px] text-[20px]'>
                            No product Found!
                        </h1>
                    ) : null
                }
        </div>
    </div>
  )
}

export default ProductPage