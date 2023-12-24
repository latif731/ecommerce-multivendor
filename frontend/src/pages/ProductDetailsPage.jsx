import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import ProductDetails from '../components/Products/ProductDetails'
import { useParams, useSearchParams } from 'react-router-dom'
import { productData } from '../static/data'
import SuggestedProducts from "../components/Products/SuggestedProducts.jsx" 
import { getAllProductsShop } from '../redux/actions/product.js'
import { getAllProducts } from '../redux/actions/product.js'


const ProductDetailsPage = () => {
    const { name } = useParams()
    const [data, setData] = useState()
    console.log("data",data)
    const { allProducts } = useSelector((state) => state.products)
    console.log("AllProducts", allProducts)
    const { id } = useParams();
    const [searchParams] = useSearchParams()
    const eventData = searchParams.get("isEvent")
    const dispatch = useDispatch()
    // const productName = name.replace(/-/g," ")
    // const productName = name.trim()
    
    
    // console.log(name)
    // console.log(data)
    useEffect(() => {
      dispatch(getAllProducts())
    }, [])
    
    
    useEffect(() => {
      // const product = allProducts && allProducts.find((i) => i._id === id);
      // setData(product
      const product = allProducts && allProducts.find((i) => i._id === id);
      // console.log("product detail", product)
      setData(product)
    },[allProducts, id])
    // console.log("productName",name)

  return (
    <div>
        <Header/>
        <ProductDetails 
        data={data}
        />
        {
          data && <SuggestedProducts data={data}/>
        }
        <Footer/>
    </div>
  )
}

export default ProductDetailsPage