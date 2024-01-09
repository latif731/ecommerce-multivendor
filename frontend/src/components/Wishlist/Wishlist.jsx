import React, { useEffect, useState } from 'react'
import {RxCross1} from "react-icons/rx"
import styles from '../../styles/styles'
import { IoBagHandleOutline } from 'react-icons/io5'
// import cartData from "../../static/data"
import {HiOutlineMinus, HiPlus} from "react-icons/hi"
import { Link } from 'react-router-dom'
import { BsCartPlus } from "react-icons/bs"
import {AiOutlineHeart, AiOutlineShoppingCart} from "react-icons/ai"
import { useSelector, useDispatch } from 'react-redux'
import { addToCart }  from '../../redux/actions/cart'
import { removeFromWishlist } from '../../redux/actions/wishlist'
import { toast } from "react-toastify"

const Wishlist = ({setOpenWishlist}) => {
    const {wishlist} = useSelector((state) => state.wishlist)
    // console.log(wishlist)
    const {cart} = useSelector((state) =>  state.cart)
    const dispatch = useDispatch()
    const removeFromWishlistHandler = (data) => {
        dispatch(removeFromWishlist(data));
      };
    
      const addToCartHandler = (data) => {
        const isItemExists = cart && cart.find((i) => i._id === data._id);
        if(isItemExists){
            toast.error("Item already in cart!")
        }else{
            if (data.stock < 1) {
                toast.error("Product stock limited!");
            }else{
                const newData = {...data, qty:1};
                dispatch(addToCart(newData));
                setOpenWishlist(false);
                toast.success("Item added to cart successfully!");
            }
        }
        setOpenWishlist(false);
      }

    // const cartData = [
    //     {
    //         name:"Iphone 14 pro max 256 gb ssd and 8gb ram silver colour",
    //         description:"test",
    //         price:999
    //     },
    //     {
    //         name:"Iphone 14 pro max 256 gb ssd and 8gb ram silver colour",
    //         description:"test",
    //         price:245
    //     },
    //     {
    //         name:"Iphone 14 pro max 256 gb ssd and 8gb ram silver colour",
    //         description:"test",
    //         price:645
    //     },
    // ]
    // const [showScroll, setShowScroll] = useState(false)


  return (
    <div className='fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10'>
        <div className='fixed top-0 right-0 h-[100%] w-[25%] bg-white flex flex-col justify-start'>
        {wishlist && wishlist.length === 0 ? (
          <>
             <div className='w-full h-screen flex items-center justify-content'>
                <div className='flex w-full justify-end pt-5 pr-5 fixed top-3 right-3'>
                    <RxCross1
                    size={25}
                    className='cursor-pointer'
                    onClick={() => setOpenWishlist(false)}
                    />
                </div>
                <h5>Wishlist Items is empty</h5>
            </div>  
          </>
          ) : (
            <>
               <div
            className='flex w-full justify-end pt-5 pr-5'
            >
                <RxCross1
                size={25}
                className='cursor-pointer'
                onClick={() => setOpenWishlist(false)}
                />
            {/* Item length */}
            </div>
            <div 
            className={`${styles.noramlFlex} 
            p-4 pb-0`}
            >
                <AiOutlineHeart
                size={25}
                />
                <h5 className='pl-2 text-[20px] font-[500]'>
                    {/* {cartData.length} */}
                    {wishlist.length}  items
                </h5>
            </div>
            <br/>
            <div 
            className='w-full border-t mt-14' 
            style={{overflow:"scroll", overflowX:"hidden"}}
            >
                { 
                   wishlist && wishlist?.map((item, index) =>(
                       <CartSingle key={index} data={item} addToCartHandler={addToCartHandler} removeFromWishlistHandler={removeFromWishlistHandler}/>
                    //    console.log(item)
                   ))
            }
            </div>
            </>
          )}
         
            </div>
        </div>
  )
}

const CartSingle = ({ data,removeFromWishlistHandler,addToCartHandler }) => {
    const [value, setValue] = useState(1);
    const totalPrice = data.discountPrice * value;
  
    return (
      <div className="border-b p-4">
        <div 
        className="w-full 800px:flex items-center"
        >
          <RxCross1 className="cursor-pointer 800px:mb-['unset'] 800px:ml-['unset'] mb-2 ml-2"
          onClick={() => removeFromWishlistHandler(data)}
          />
          <img
            // src={`${data?.images[0]?.url}`}
            src={data && data.imageUrl[0].secure_url}
            alt=""
            className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
          />
  
          <div className="pl-[5px]">
            <h1>{data.name}</h1>
            <h4 className="font-[600] pt-3 800px:pt-[3px] text-[17px] text-[#d02222] font-Roboto">
              US${totalPrice}
            </h4>
          </div>
          <div>
            <BsCartPlus size={20} className="cursor-pointer" tile="Add to cart"
             onClick={() => addToCartHandler(data)}
            />
          </div>
        </div>
      </div>
    );
  };

export default Wishlist