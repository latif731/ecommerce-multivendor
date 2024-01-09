import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../styles/styles'
import { Link } from 'react-router-dom'
import {AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart} from "react-icons/ai"
import { useSelector, useDispatch } from 'react-redux'
import { getAllProductsShop } from '../../redux/actions/product'
import { addToWishlist, removeFromWishlist } from '../../redux/actions/wishlist'
import { addToCart } from '../../redux/actions/cart'
import { toast } from "react-toastify"
import Ratings from "./Ratings"
import { server } from '../../server'
import axios from 'axios'


const ProductDetails = ({data}) => {
  // console.log("ini data di product detail page", data)
  const {products} = useSelector((state) => state.products)
  const { cart } = useSelector((state) => state.cart)
  const { user, isAuthenticated } = useSelector((state) => state.user)
  const { wishlist } = useSelector((state) => state.wishlist) 
  // const { seller } = useSelector((state) => state.seller)
  // console.log("products di detail ",products)
  console.log("data di detail",data)
  // console.log("Product detail", wishlist)
  const [count, setCount] = useState(1)
  const [click, setClick] = useState(false)
  const [select, setSelect] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id))
    if(wishlist && wishlist.find((i) => i._id === data?._id)){
      setClick(true)
    }else {
      setClick(false)
    }
  }, [data, wishlist])

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
        const cartData = { ...data, qty: count };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  
  
  const navigate = useNavigate()
  // const [count, setCount] = useState(1)
  const decrementCount = () => {
    if(count > 1){
        setCount(count - 1) 
    }
}

const incrementCount = () => {
        setCount(count + 1)
}

const handleMessageSubmit = async () => {
    // navigate("/inbox?conversation=507ebjver884chfdcsrsnhbn834klnw0qu34nfc")
  if(isAuthenticated){
    const groupTitle = data._id + user._id;
    const userId = user._id;
    const sellerId = data?.shop?._id
    console.log(sellerId)
    await axios.post(`${server}/conversation/create-new-conversation`, {
      groupTitle, userId,sellerId
    }).then((res) => {
      navigate(`/conversation/${res.data.conversation._id}`)
    }).catch((error) => {
      toast.error(error.response.data.message)
    })
  }else{
    toast.error("Please login to create a conversation")
  }

}

// const TotalReviewsLength = products && products.reduce((acc, product) => acc + product.reviews.length, 0)

// const totalRatings = products && products.reduce((acc, product) => acc + product?.reviews?.reduce((sum, review) => sum + review?.rating, 0))
// console.log("total rating", totalRatings)

const TotalReviewsLength = products && products.length > 0 ? products.reduce((acc, product) => acc + (product.reviews ? product.reviews.length : 0), 0) : 0;

const totalRatings = products && products.length > 0 ? products.reduce((acc, product) => acc + (product.reviews ? product.reviews.reduce((sum, review) => sum + review.rating, 0) : 0), 0) : 0;
const averageRating = totalRatings/TotalReviewsLength


  return (
    <div className='bg-white'>
      {
        data ? (
          <div className={`${styles.section} w-[90%] 800px:w-[80%]`}> 
            <div className='w-full py-10 '>
              <div className='block w-full 800px:flex'>
                <div className="w-full 800px:w-[50%]">
                {data?.imageUrl && data?.imageUrl?.length > 0 && (
                  <img
                    src={data?.imageUrl[select]?.secure_url}
                    alt=''
                    className='w-[80%]'
                    onClick={() => setSelect(0)}
                  />
                )}
                  <div className='w-full flex'>
                    {/* <div className={`${select === 0 ? "border" : "null"} cursor-pointer`}>
                      {data && data.imageUrl && data.imageUrl[0] && (
                        <img 
                        src={data.imageUrl[0]} 
                        alt=''
                        className='h-[200px]'
                        onClick={() => setSelect(0)}
                        />

                      )}
                    </div>
                    <div className={`${select === 1 ? "border" : "null"} cursor-pointer`}>
                      {data && data.imageUrl &&  data.imageUrl[1] && (
                        <img 
                        src={data?.imageUrl[1]} 
                        alt=''
                        className='h-[200px]'
                        onClick={() => setSelect(1)}
                        />
                      )}
                    </div>
                    <div className={`${select === 2 ? "border" : "null"} cursor-pointer`}>
                      {data && data.imageUrl && data.imageUrl[2] && (
                        <img 
                        src={data?.imageUrl[2]} 
                        alt=''
                        className='h-[200px]'
                        onClick={() => setSelect(2)}
                        />
                      )}
                    </div> */}
                    {data.imageUrl && data.imageUrl.map((url, index) => {
                      // console.log("Image URL", url.secure_url)
                      return (
                      <div
                      key={index}
                      className={`${select === index ? `border`: 'null'} cursor-pointer`}
                      >
                        <img
                        src={url.secure_url}
                        alt=''
                        className='h-[200px]'
                        onClick={() => setSelect(index)}
                        onError={(e) => {
                          console.error('Error loading image:', e);
                          // Handle error or set a placeholder image
                        }}
                        />
                      </div>
                )})}
                  </div>  
                </div>
                <div className='w-full 800px:w-[50%] pt-5'>
                  <h1
                  className={`${styles.productTitle}`}
                  >
                    {data?.name}
                  </h1>
                  <p>{data.description}</p>
                  <div 
                  className='flex pt-3'
                  >
                    <h4 className={`${styles.productDiscountPrice}`}>
                        {data.discountPrice}$ 
                    </h4>
                    <h3
                    className={`${styles.price}`}
                    >
                      {data.originalPrice ? data.originalPrice + "$" : null}
                    </h3>  
                  </div>
                  <div className='flex items-center mt-12 justify-between pr-3'>
                                <div>
                                    <button
                                    className='bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out'
                                    onClick={decrementCount}
                                    >
                                        -
                                    </button>
                                    <span className='bg-gray-200 text-gray-800 font-medium px-4 py-[9px]'>
                                        {count}
                                    </span>
                                    <button
                                    onClick={incrementCount}
                                    className='bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out'
                                    >
                                        +
                                    </button>
                                </div>
                            <div>
                            {click ? 
                            <AiFillHeart
                            size={35}
                            className='cursor-pointer'
                            // onClick={() => setClick(!click)}
                            onClick={() => removeFromWishlistHandler(data)}
                            color={click ? 'red' : '#333'}
                            title='Remove from Wishlist'
                            /> 
                            : 
                            <AiOutlineHeart
                            size={35}
                            className='cursor-pointer'
                            // onClick={() => setClick(!click)}
                            onClick={() => addToWishlistHandler(data)}
                            color={click ? 'red' : '#333'}
                            title='Remove from Wishlist' 
                            />
                            }
                            </div>

                  </div>
                  <div className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                  onClick={() => addToCartHandler(data._id)}
                  >
                      <span className='text-[#fff] flex items-center'>
                          Add to cart <AiOutlineShoppingCart className='ml-1'/>
                      </span>
                  </div>
                  <div
                  className='flex items-center pt-8'
                  >
                    <Link to={`/shop/preview/${data.shop._id}`}>
                    <img src={data.shop.avatar?.url} alt=''
                    className='w-[50px] h-[50px] rounded-full mr-2'
                    />
                    </Link>
                    <div className='pr-8'>
                      <Link to={`/shop/preview/${data.shop._id}`}>
                        <h3
                        className={`${styles.shop_name} pb-1 pt-1`}
                        >
                          {data.shop.name}
                        </h3>
                      </Link>
                    <h5 className='pb-3 text-[15px]'>
                        ({averageRating}) Ratings
                    </h5>
                    </div>
                    <div
                    className={`${styles.button} bg-[#6443d1] rounded h-11`}
                    onClick={handleMessageSubmit}
                    >
                      <span className='text-white flex items-center gap-2'>
                          Send Message <AiOutlineMessage className='mt-1'/>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ProductDetailsInfo 
            data={data} 
            product={products} 
            TotalReviewsLength={TotalReviewsLength}
            averageRating= {averageRating}
            />
            <br/>
            <br/>
          </div>
        ) : null
      }
    </div>
  )
}

const ProductDetailsInfo = ({data, product, TotalReviewsLength, averageRating}) => {
  const [active, setActive] = useState(1)

    return (
      <div className='bg-[#f5f6fb] px-3 800px:px-10 py-10 rounded'>
        <div className="w-full flex justify-between border-b pl-10 pb-2">
          <div className='relative'>
            <h5
            className={"text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"}
            onClick={() => setActive(1)}
            >
              Product Details
            </h5>
            {
              active === 1 ? (
                <div className={`${styles.active_indicator}`} >

                </div>
              ) : null
            }
          </div>
          <div className='relative'>
            <h5
            className={"text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"}
            onClick={() => setActive(2)}
            >
              Product Reviews
            </h5>
            {
              active === 2 ? (
                <div className={`${styles.active_indicator}`} >

                </div>
              ) : null
            }
          </div>
          <div className='relative'>
            <h5
            className={"text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"}
            onClick={() => setActive(3)}
            >
              Seller Information 
            </h5>
            {
              active === 3 ? (
                <div className={`${styles.active_indicator}`} >

                </div>
              ) : null
            }
          </div>
        </div>
        {
          active === 1 ? (
            <>
            {/* <p
            className='py-2 text-[18px] leading-8 pb-10 whitespace-pre-line'
            > 
              Product details are a crucial part of any eCommerce website or
              online marketplace. These details help the potential customers to 
              make an informed decision about the product they are interested in 
              buying. A well-written product description can also be a powerful
              marketing tool that can help to increase sales. Product details 
              typically include information about the product's features,
              specifications, dimensions, weight, materials, and other relevant
              information that can help language, and be honest and transparent
              about the product's features and limitation
            </p>
            <p
            className='py-2 text-[18px] leading-8 pb-10 whitespace-pre-line'
            >
              customers to understand the product better. The product details
              section should also include high-quality images and videos of the
              product, as well as customers reviews adn ratings. When writing
              product details, it is essential to keep the target audience in
              mind. The language used should be clear and easy to understand, and
              technical terms should be explained in simple language. The tone of
              the product details should be persuasive, highlighting th unique
              features of the
            </p>
            <p
            className='py-2 text-[18px] leading-8 pb-10 whitespace-pre-line'
            >
              customers to understand the product better. The product details
              section should also include high-quality images and videos of the
              product, as well as customers reviews adn ratings. When writing
              product details, it is essential to keep the target audience in
              mind. The language used should be clear and easy to understand, and
              technical terms should be explained in simple language. The tone of
              the product details should be persuasive, highlighting th unique
              features of the
            </p> */}
            <p className='w-full justify-center min-h-[40vh] flex items-center'>
              {data.description}
            </p>
        </>
          ) : null
        }
        {
          active === 2 ? (
            
            <div className='w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll'>
                {data && data.reviews.map((item, index) => (
                  <div className='w-full flex my-2'>
                      <img src={item?.user?.avatar?.url} className="w-[50px] h-[50px] rounded-full"/>
                      <div className="pl-2">
                      <div className='flex items-center gap-5'>
                      <h1 className="text-[#000000] font-[500] mr-3">{item.user.name}</h1>
                      <Ratings rating={item?.rating}/>
                      </div>
                      <p>{item.comment}</p>
                      </div>
                  </div>
                ))}
                <div className="w-full flex justify-center">
                {
                  data && data.reviews.length === 0 && (
                    <p>No Reviews Yet</p>
                  )
                }
                </div>
            </div>
          ) :null
        }
        {
          active === 3 ? (
            <div className='w-full block 800px:flex p-5'>
              <div className='w-full 800px:w-[50%]'>
                <div className='flex items-center'>
                  <Link to={`/shop/preview/${data.shop._id}`}>
                    <img 
                    src={data.shop.avatar.url}
                    className='w-[50px] h-[50px] rounded-full'
                    alt=''/>
                  </Link>
                   <div className='ml-5'>
                    <Link to={`/shop/preview/${data.shop._id}`}>
                      <h3
                      className={`${styles.shop_name} pb-1 pt-1`}
                      >
                        {data.shop.name}
                      </h3>
                    </Link>
                    <h5 className='pb-3 text-[15px]'>
                        ({averageRating}) 
                        {/* {data.reviews.ratings} */}
                        Ratings
                    </h5>
                    </div>
                </div>
                      <p className='pt-2'>
                        {data.shop.description}
                        {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt voluptatem, quos sapiente necessitatibus illo, odio tempore blanditiis, suscipit commodi dicta voluptas consectetur perferendis? Aliquid dolore porro, doloribus maiores eligendi cumque! */}
                      </p>
              </div>
              <div className='w-full 800px:w-[50%] 800px:mt-0 800px:flex flex-col items-end'>
                <div className='text-left'>
                    <h5 className='font-[600]'>
                      Joined on: <span className='font-[500]'>{data.shop.createdAt.slice(0,10)}</span>
                    </h5>
                    <h5 className='font-[600] pt-3'>
                      Total Products: <span className='font-[500]'>{product.length}</span>
                    </h5>
                    <h5 className='font-[600] pt-3'>
                      Total Reviews: <span className='font-[500]'>{TotalReviewsLength}</span>
                    </h5>
                    <Link to="/">
                      <div
                      className={`${styles.button} rounded-[4px] h-[39.5px] mt-3`}
                      >
                        <h4 className='text-white'>Visit Shop</h4>
                      </div>
                    </Link>
                </div>
              </div>
            </div>
          ) : null
        }
      </div>
    )
}

export default ProductDetails