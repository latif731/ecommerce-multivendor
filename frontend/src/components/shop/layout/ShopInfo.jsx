import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { backend_url } from '../../../server'
import styles from '../../../styles/styles'
import axios from "axios"
import { server } from '../../../server'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getAllProductsShop } from '../../../redux/actions/product'


const ShopInfo = ({isOwner}) => {
    const { products } = useSelector((state) => state.products)
    console.log("ini adalah product",products)
    const { seller } = useSelector((state) => state.seller)
    // console.log("seller",seller)
    const [data, setData] = useState({})
    console.log("shopInfo", data)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const {id} = useParams()
    const logoutHandler = () => {
        axios.get(`${server}/shop/logout`,{
            withCredentials: true
        })
        window.location.reload()
    }


    useEffect(()=> {
        dispatch(getAllProductsShop(id))
        setLoading(true)
        axios.get(`${server}/shop/get-shop-info/${id}`).then((res) => {
            setData(res.data.shop)
        }).catch((error) => {
            console.log(error)
            setLoading(false)
        })
    },[])

    const TotalReviewsLength = products && products.length > 0 ? products.reduce((acc, product) => acc + (product.reviews ? product.reviews.length : 0), 0) : 0;

const totalRatings = products && products.length > 0 ? products.reduce((acc, product) => acc + (product.reviews ? product.reviews.reduce((sum, review) => sum + review.rating, 0) : 0), 0) : 0;
const averageRating = totalRatings/TotalReviewsLength

  return (
    <div className='w-full py-5'>
        <div className='w-full flex item-center justify-center'>
            <img src={data?.avatar?.url} alt=''
            className='w-[150px] h-[150px] object-cover rounded-full'
            />
        </div>
        <h3 className='text-center py-2 text-[20px]'>
            {data.name}
        </h3>
        <p className='text-[16px] text-[#000000a6] p-[10px] flex items-center'>
            {data.description}
        </p>
        <div>
            <div className='p-3'>
                <h5 className='font-[600]'>Address</h5>
                <h4 className='text-[#000000a6]'>{data.address}</h4>
            </div>
            <div className='p-3'>
                <h5 className='font-[600]'>Phone Number</h5>
                <h4 className='text-[#000000a6]'>{data.phoneNumber}</h4>
            </div>
            <div className='p-3'>
                <h5 className='font-[600]'>Total Products</h5>
                <h4 className='text-[#000000a6]'>
                    {products && products?.length}
                </h4>
            </div>
            <div className='p-3'>
                <h5 className='font-[600]'>Shop Ratings</h5>
                <h4 className='text-[#000000a6]'>
                    {averageRating}
                </h4>
            </div>
            <div className='p-3'>
                <h5 className='font-[600]'>Joined On</h5>
                <h4 className='text-[#000000a6]'>
                    {data?.createdAt?.slice(0, 10)}
                </h4>
            </div>
            {
                isOwner && (
                    <div className="py-3 px-4">
                        <Link to="/shop/settings">
                            <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}>
                                <span className='text-white'>Edit Shop</span>
                            </div>
                        </Link>
                        <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                        onClick={logoutHandler}
                        >
                            <span className='text-white'>Log Out</span>
                        </div>
                    </div>
                )
            }
        </div>
    </div>
  ) 
}

export default ShopInfo