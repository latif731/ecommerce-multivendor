import React, { useEffect, useState } from 'react'
import {RxCross1} from "react-icons/rx"
import styles from '../../styles/styles'
import { IoBagHandleOutline } from 'react-icons/io5'
// import cartData from "../../static/data"
import {HiOutlineMinus, HiPlus} from "react-icons/hi"
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../../redux/actions/cart'
import {toast} from "react-toastify"

const Cart = ({setOpenCart}) => {
    const {cart} = useSelector((state) =>  state.cart)
    console.log("cart in Cart", cart)
    const dispatch = useDispatch()

    const removeFromCartHandler = (data) => {
        dispatch(removeFromCart(data))
    }

    const quantityChangeHandler = (data) => {
        dispatch(addToCart(data))
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

    const totalPrice = cart.reduce(
        (acc, item) => acc + item.qty * item.discountPrice,
        0
      );
    

  return (
    <div className='fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10'>
        <div className='fixed top-0 right-0 h-[100%] w-[25%] bg-white flex flex-col justify-between'>
        {cart && cart.length === 0 ? (
            <div className='w-full h-screen flex items-center justify-content'>
                <div className='flex w-full justify-end pt-5 pr-5 fixed top-3 right-3'>
                    <RxCross1
                    size={25}
                    className='cursor-pointer'
                    onClick={() => setOpenCart(false)}
                    />
                </div>
                <h5>Cart Items is empty</h5>
            </div>
        ) : (
            <>
            
            <div
            className='flex w-full justify-end pt-5 pr-5'
            >
                <RxCross1
                size={25}
                className='cursor-pointer'
                onClick={() => setOpenCart(false)}
                />
            {/* Item length */}
            </div>
            <div className={`${styles.noramlFlex} p-4`}>
                <IoBagHandleOutline
                size={25}
                />
                <h5 className='pl-2 text-[20px] font-[500]'>
                    {cart && cart.length}
                </h5>
            </div>
            <br/>
            <div className='w-full border-t' style={{overflow:"scroll", overflowX:"hidden"}}>
                {/* { 
                   cartData && cartData?.map((item, index) =>(
                       <CartSingle key={index} data={item}/>
                    //    console.log(item)
                   ))
            } */}
            {
                cart && cart.map((i, index) =>  
                <CartSingle 
                key={index} 
                data={i}  
                quantityChangeHandler={quantityChangeHandler}
                removeFromCartHandler={removeFromCartHandler}
                />)
            }
            </div>
                <div className='px-5 mb-3'>
                    <Link to={"/checkout"}>
                        <div className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}>
                            <h1 
                            className='text-white text-[18px] text-[600]'
                            >   
                            Checkout Now (USD${totalPrice})
                            </h1>
                        </div>
                    </Link> 
                </div>
            
                </>
        )} 
        </div>
        </div>
  )
}

const CartSingle = ({data, quantityChangeHandler, removeFromCartHandler}) => {
    const [value, setValue] = useState(data.qty)
    const totalPrice = data.discountPrice * value
    console.log("total price", totalPrice)

    const increment = (data) => {
        setValue(value + 1);
        if(data.stock < value) {
            toast.error("Product stock limited!")
        }else{
            const updateCartData = {...data, qty: value + 1}
            quantityChangeHandler(updateCartData)
        }
    }

    const decrement = (data) => {
        setValue(value == 1 ? 1 : value - 1);
        const updateCartData = {...data, qty: value === 1 ? 1 : value - 1}
        quantityChangeHandler(updateCartData)
    }

    return (
        <div className="border-b p-4">
            <div className="w-full flex items-center">
                <div>
                    <div className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
                    // onClick={() =>  setValue(value + 1)}
                    onClick={() => increment(data)}
                    >
                        <HiPlus
                        size={18}
                        color='#fff'
                        />
                    </div>
                    <span className='pl-[10px]'>
                        {data.qty}
                    </span>
                    <div className='bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer'
                    // onClick={() => setValue(value === 1 ? 1 : value - 1)}
                    onClick={() => decrement(data)}

                    >
                        <HiOutlineMinus
                        size={16}
                        color='#7d879c'
                        />
                    </div>
                </div>
                <img 
                // src='https://cdn.eraspace.com/media/catalog/product/i/p/iphone_14_pro_deep_purple_1_1_1.jpg'
                className='w-[100px] ml-2 mr-2 h-min rounded-[5px]'
                src={`${data?.imageUrl[0]?.secure_url || data?.imageUrl2[0]?.secure_url}`}
                />
               <div className='pl-[5px]'>
                    <h1>{data.name}</h1>
                    <h4 
                    className='font-[400] text-[15px] text-[#00000082]'
                    >
                        ${data.discountPrice} * {value}
                    </h4>
                    <h4 className='font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto'>
                        US${totalPrice}
                    </h4>
               </div>
               <RxCross1 className='cursor-pointer' onClick={() => removeFromCartHandler(data)}/>
            </div>
        </div>
    )
}

export default Cart