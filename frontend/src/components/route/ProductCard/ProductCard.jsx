
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from '../../../styles/styles'
import {AiFillStar, AiOutlineStar, AiFillHeart, AiOutlineHeart, AiOutlineEye, AiOutlineShoppingCart} from "react-icons/ai"
import ProductDetailsCard from '../ProductDetail/ProductDetailsCard'
import { backend_url } from '../../../server'
import { useSelector, useDispatch } from 'react-redux'
import { addToWishlist, removeFromWishlist } from '../../../redux/actions/wishlist'
import {toast} from "react-toastify"
import { addToCart } from '../../../redux/actions/cart'
import Ratings from '../../Products/Ratings'

const ProductCard = ({data}) => {
    // console.log("poductCard",data)
    const {cart} = useSelector((state) => state.cart)
    const {wishlist} = useSelector((state) => state.wishlist)
    // console.log("ini wishlist", wishlist)
    // const {cart} = useSelector((state) =>  state.cart)
    const [click, setClick] = useState(false)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()

    // const d = data.name
    // const product_name = d.replace(/\s*/g,"-");

    useEffect(() => {
        if(wishlist && wishlist.find((i) => i._id === data._id)){
            setClick(true)
        }else{
            setClick(false)
        }
    }, [wishlist])

    const removeFromWishlistHandler = (data) => {
        setClick(!click)
        dispatch(removeFromWishlist(data))
    }

    const addToWishlistHandler = (data) => {
        setClick(!click)
        dispatch(addToWishlist(data))
    }

    const addToCartHandler = (id) => {
        const isItemExists = cart && cart.find((i) => i._id === id);
        if (isItemExists) {
          toast.error("Item already in cart!");
        } else {
          if (data.stock < 1) {
            toast.error("Product stock limited!");
          } else {
            const cartData = { ...data, qty: 1 };
            dispatch(addToCart(cartData));
            toast.success("Item added to cart successfully!");
          }
        }
      };

    


  return (
    <div className='w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer'>
        <div className='flex justify-content'>

        </div>
        <Link to={`/product/${data._id}`}>
            {/* <img 
            // src={data.image_Url[0].url} 
            src={data?.imageUrl[0]}
            alt='' 
            className='w-full h-[170px] object-contain'
            /> */}
               {/* {data && data.imageUrl && data.imageUrl[0] && (
        <img
          src={data.imageUrl[0]}
          alt=''
          className='w-full h-[170px] object-contain'
        />
      )} */}
         {data && (data.imageUrl && data.imageUrl.length > 0 || data.imageUrl2 && data.imageUrl2.length > 0) && (
          <img
            src={data?.imageUrl[0]?.secure_url || data?.imageUrl2[0]?.secure_url}
            alt=''
            className='w-full h-[170px] object-contain'
          />
        )}
        </Link>
        <Link to={"/"}>
            <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        <Link to={`/product/${data._id}`}>
            <h4 className='pb-3 font-[500]'>
                {data.name.length > 40 ? data.name.slice(0,40) + "..." : data.name}
            </h4>
            <div>
            <Ratings rating={data.ratings}/>
                {/* <AiFillStar
                color='#F6BA00'
                size={20}
                className="mr-2 cursor-pointer"
                />
                <AiFillStar
                color='#F6BA00'
                size={20}
                className="mr-2 cursor-pointer"
                />
                <AiFillStar
                color='#F6BA00'
                size={20}
                className="mr-2 cursor-pointer"
                />
                <AiFillStar
                color='#F6BA00'
                size={20}
                className="mr-2 cursor-pointer"
                />
                <AiOutlineStar
                color='#F6BA00'
                size={20}
                className="mr-2 cursor-pointer"
                /> */}
            </div>
            <div className='py-2 flex items-center justify-between'>
                <div className='flex'>
                    <h5 className={`${styles.productDiscountPrice}`}>
                        {data.originalPrice === 0 ? data.price : data.discountPrice}
                        $
                    </h5>
                    <h4 className={`${styles.price}`}>
                        {data.originalPrice ? data.originalPrice + " $" : null}
                    </h4>
                    <span className='font-[400] text-[17px] text-[#68d284]'>
                        {data.sold_out} sold
                    </span>
                </div>
                {/* side options */}
            </div>
        </Link>
                <div>
                    {click ? 
                    <AiFillHeart
                    size={22}
                    className='cursor-pointer absolute right-2 top-5'
                    // onClick={() => setClick(!click)}
                    onClick={() => removeFromWishlistHandler(data)}
                    color={click ? 'red' : '#333'}
                    title='Remove from Wishlist'
                    /> 
                    : 
                    <AiOutlineHeart
                    size={22}
                    onClick={() => addToWishlistHandler(data)}
                    className='cursor-pointer absolute right-2 top-5'
                    // onClick={() => setClick(!click)}
                    color={click ? 'red' : '#333'}
                    title='Remove from Wishlist' 
                    />
                    }
                    <AiOutlineEye
                    size={22}
                    className='cursor-pointer absolute right-2 top-14'
                    onClick={() => setOpen(!open)}
                    color='#333'
                    title='Quick view'
                    />
                    <AiOutlineShoppingCart
                    size={22}
                    className='cursor-pointer absolute right-2 top-24'
                    // onClick={() => setOpen(!open)}
                    onClick={() => addToCartHandler(data._id)}
                    color='#333'
                    title='Add to cart'
                    />
                    {
                        open ? (
                            <ProductDetailsCard
                            open={open}
                            setOpen={setOpen}
                            data={data}
                            // removeFromWishlistHandler={() => removeFromWishlistHandler()}
                            // addToWishlistHandler={() => addToWishlistHandler()}
                            // wishlist={wishlist}
                            />
                        ) : null
                    }
                </div>
    </div>
  )
}

export default ProductCard