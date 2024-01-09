import React, {useState} from 'react'
import styles from '../../styles/styles'
import { Link } from 'react-router-dom'
import logo from "../../assets/logo-logo1.png"
import { categoriesData, productData } from '../../static/data'
import {AiOutlineSearch} from "react-icons/ai"
import {IoIosArrowRoundForward} from "react-icons/io"
import {IoMdArrowDropright} from "react-icons/io"
import {BiMenu, BiMenuAltLeft} from "react-icons/bi"
import {IoArrowDownOutline} from "react-icons/io5"
import DropDown from './DropDown'
import {MdOutlineKeyboardArrowDown} from "react-icons/md"
import Navbar from './Navbar'
import {AiOutlineHeart} from "react-icons/ai"
import {AiOutlineShoppingCart} from "react-icons/ai"
import {GoPerson} from "react-icons/go"
import { useSelector } from "react-redux"
import { backend_url } from '../../server'
import Cart from "../cart/Cart"
import Wishlist from '../Wishlist/Wishlist'
import { RxCross1, RxCross2 } from 'react-icons/rx'
// import { Link } from 'react-router-dom'



const Header = ({activeHeading}) => {
    const {isAuthenticated, user} = useSelector((state) => state.user)
    const {isSellerAuthenticated} = useSelector((state) => state.seller)
    // console.log("Header", user)
    const { wishlist } = useSelector((state) => state.wishlist)
    const {cart} = useSelector((state) => state.cart)
    // console.log("cart",cart)
    const {allProducts} = useSelector((state) =>  state.products)
    // console.log("Header",allProducts)
    // console.log("header" ,user)
    // console.log(isAuthenticated)
    
    // const user = [
    //     {
    //         name:"latif",
    //         avatar:`http://localhost:3000${logo}`,
    //         email:"latif@email.com",
    //         password:"12345"
    //     }
    // ]
    // console.log(user)
    // const isAuthenticated = true
    // console.log(isAuthenticated)
    const [searchTerm, setSearchTerm] = useState("")
    const [searchData, setSearchData] = useState(null)
    // console.log("search",searchData)
    // console.log("searchData",searchData)
    const [active, setActive] = useState(false)
    const [openCart, setOpenCart] = useState(false)
    const [openWishList, setOpenWishlist] = useState(false)
    const [dropDown, setDropDown] = useState(false)
    const [open, setOpen] = useState(false)
    // const [product, setProduct] = usePeState(productData)
    // console.log(product)

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term)

        const filteredProducts =  allProducts && allProducts.filter((product) => 
            product.name.toLowerCase().includes(term.toLowerCase())
        );
        setSearchData(filteredProducts)
    }

    window.addEventListener("scroll", () => {
        if(window.scrollY > 70){
            setActive(true)
        }else{
            setActive(false)
        }
    })  

  return (
    <>
    <div className={`${styles.section}`}>
        <div className='hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between'>
            <div>
                <Link to="/">
                    <img src={logo} className='w-20' alt=''/>
                </Link>
                {/* search box */}
            </div>
            <div className='w-[50%] relative'>
                    <input 
                    type="text" 
                    placeholder='Search Product...' 
                    value={searchTerm} 
                    onChange={handleSearchChange}
                    className='h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md cursor-pointer'
                    />
                    <AiOutlineSearch size={30} className='absolute right-2 top-1.5 cursor-pointer'/>
                    {
                        searchData && searchData.length !== 0 ? (
                            <div className='absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4'>
                                {searchData && searchData.map((i, index) => {
                                    const d = i.name

                                    const Product_name = d.replace(/\s*/g, "-");
                                    return (
                                        <Link to={`/product/${i._id}`}>
                                            <div className="w-full flex items-start-py-3">
                                                <img src={i.imageUrl[0].secure_url} alt='' className='w-[40px] h-[40px] mr-[10px]'/>
                                                <h1>{i.name}</h1>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        ) : null
                    }
            </div>
            <div className={`${styles.button}`}>
                <Link to={"/shop-create"}>
                    <h1 className='text-[#fff] flex items-center'>
                    { isSellerAuthenticated ? "Go Dashboard" : "Become a seller" } <IoMdArrowDropright size={25}/> 
                    </h1>
                    
                </Link>
            </div>
        </div>
    </div>
        <div 
        className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null} transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
        >
        <div className={`${styles.section} relative ${styles.noramlFlex} justify-between`} >
            {/* categories */}
            <div>
                <div className='relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block'>
                    <BiMenu size={30} className='absolute top-3 left-2'/>
                    <button
                       onClick={() => setDropDown(!dropDown)}
                    className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`} style={{paddingBottom:"7px", paddingLeft:"50px"}}
                    >
                        All Categories
                    <MdOutlineKeyboardArrowDown
                    size={20}
                    className='absolute right-2 top-4 cursor-pointer'
                    onClick={() => setDropDown(!dropDown)}
                    />
                    </button>
                    {
                        dropDown ? (
                            <DropDown
                            categoriesData={categoriesData}
                            setDropDown={setDropDown}
                            />
                        ) : null
                    }
                    {/* navitems */}
                </div>
            </div>
                    <div className={`${styles.noramlFlex}`}>
                        <Navbar
                        active={activeHeading}
                        />
                    </div>
                    <div className='flex '>
                        <div className={`${styles.noramlFlex}`}>
                            <div 
                            className="relative cursor-pointer mr-[15px]"
                            onClick={() =>  setOpenWishlist(true)}
                            >
                                <AiOutlineHeart
                                size={30}
                                color='white'
                                className='rgb(255 255 255 / 83%)'
                                />
                            </div>
                            <span className='absolute right-22 top-4 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight text-center'>
                                {wishlist && wishlist.length}
                            </span>
                        </div>
                        <div className={`${styles.noramlFlex}`}>
                            <div className="relative cursor-pointer mr-[15px]"
                            onClick={() =>  setOpenCart(true)}
                            >
                                <AiOutlineShoppingCart
                                size={30}
                                // color='white'
                                color='rgb(255 255 255 / 83%)'
                                />
                            </div>
                            <span className='absolute right-15 top-4 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center'>
                                {cart && cart.length}
                            </span>
                        </div>
                        <div className={`${styles.noramlFlex}`}>
                            <div className="relative cursor-pointer mr-[15px]">
                                {isAuthenticated ? (
                                    <Link to={"/profile"} >
                                        <img src={user?.avatar?.url}
                                        // style={{width:"50px"}}
                                        className='w-[40px] h-[40px] rounded-full'
                                        />
                                    </Link>
                                )
                                 : (
                                <>
                                <Link to="/login">
                                <GoPerson
                                size={30}
                                // color='white'
                                color='rgb(255 255 255 / 83%)'
                                />
                                </Link>
                                </>
                                )}
                            </div>
                        </div>
                        {/* wishlist popup */}
                        {
                            openCart ? (
                                <Cart setOpenCart={setOpenCart}/>
                            ) : null
                        }
                        {/* wishlist popup */}
                        {
                            openWishList ? (
                                <Wishlist setOpenWishlist={setOpenWishlist}/>
                            ) : null 
                        }

                    </div> 
        </div>
        </div>
        {/* mobile header */}
        <div className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null} w-full h-[60px] bg-[#fff] z-10 top-0 shadow-sm 800px:hidden`}>
            <div className='w-full justify-between flex items-center'>
                <div>
                    <BiMenuAltLeft
                    size={40}
                    className='ml-4'
                    onClick={() =>  setOpen(true)}
                    />
                </div>
                    <div>
                        <Link to={"/"}>
                        <img 
                        src={logo}
                        alt=''
                        className=' cursor-pointer w-10'
                        />
                        </Link>
                    </div>
                    <div>
                        <div className='relative mr-[20px]'>
                            <AiOutlineShoppingCart size={30}/>
                            <span class="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                                {cart && cart.length}
                            </span>
                        </div>
                    </div>
            </div>
        </div>
        {/* header sidebar */}
        {
            open && (
                <div className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null}  w-full bg-[#0000005f] z-20 h-full top-0 left-0`}>
                    <div className='fixed w-[60%] bg-[#fff] h-screen top-0 left-0 z-50'>
                        <div className="w-full justify-between flex pr-3">
                            <div>
                                <div className='relative mr-[15px]'>
                                    <AiOutlineHeart
                                    size={30}
                                    className='mt-5 ml-3'
                                    />
                                        <span class="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                                        {/* {wishlist && wishlist.length} */}
                                        0
                                        </span>
                                </div>
                            </div>
                            <RxCross1
                            size={30}
                            className='ml-4 mt-5'
                            onClick={() => setOpen(false)}
                            />
                        </div>
                        <div className='my-8 w-[92%] m-auto h-[40px]'>
                            <input
                            type='search'
                            placeholder='Search Product...'
                            className='h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md'
                            value={searchTerm}
                            onChange={handleSearchChange}
                            />
                        {
                            searchData && (
                                <div className='absolute bg-[#fff] z-10 shadow w-full left-0 p-3'>
                                    {
                                        searchData.map((i) => {
                                            return (
                                            <Link to={`/product/${i.name}`}>
                                                <div className='flex items-center'>
                                                    <img src={i.image_Url[0]?.url} alt='' className='w-[50px] mr-2'/>
                                                </div>
                                            </Link>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }
                        </div>
                        <Navbar active={activeHeading}/>
                        <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                        <Link to={"/seller"}>
                            <h1 className='text-[#fff] flex items-center pl-2'>
                                Become a seller <IoMdArrowDropright size={25} className='ml-1'/> 
                            </h1>
                        </Link>
                        </div>
                        <br/>
                        <br/>
                        <br/>

                        <div className='flex w-full justify-center'>
                        {isAuthenticated ? (
                            <div>
                                <Link to={"/profile"}>
                        <img 
                        src={user?.avatar?.url}
                        className='w-[70px] h-[70px] rounded-full border-[3px] border-[#40fa56]'
                        />
                                </Link>
                            </div>
                        ) : (
                            <>
                        <Link to={'/login'} className='text-[18px] pr-[10px] text-[#000000b7]'>
                            Login  /
                        </Link>
                        <Link to={'/sign-up'} className='text-[18px] pr-[10px] text-[#000000b7]'>
                            Sign up
                        </Link>
                            </>
                        )}
                        </div>
                    </div>
                </div>
            )
        }
    </>
  )
}

export default Header