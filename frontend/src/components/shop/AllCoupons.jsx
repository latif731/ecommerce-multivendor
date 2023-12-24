import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProductsShop } from '../../redux/actions/product'
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import { deleteProduct } from '../../redux/actions/product'
import { FaTimes } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import styles from '../../styles/styles'
import { categoriesData } from '../../static/data'
import { server } from '../../server'
import axios from 'axios'
import {toast} from "react-toastify"
import { BsPencil } from "react-icons/bs";


const AllCoupons = () => {
    const {products} = useSelector((state) => state.products || {} )
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [coupons, setCoupons] = useState([])
    console.log(coupons)
    const [name, setName] = useState("") 
    const [value, setValue] = useState(null)
    const [minAmount, setMinAmount] = useState(null)
    const [maxAmount, setMaxAmount] = useState(null)
    // const [category, setCategory] = useState("")
    const [selectedProducts, setSelectedProducts] = useState(null)
    const {seller} = useSelector((state) => state.seller )
    console.log("name",name)
    console.log("value", value)
    console.log("minAmount", minAmount)
    console.log("maxAmount", maxAmount)
    const dispatch = useDispatch()

    useEffect(() => {
        setIsLoading(true)
        axios.get(`${server}/coupon/get-coupon/${seller._id}`,{
            withCredentials: true
        }).then((res) => {
            setIsLoading(false)
            setCoupons(res.data.couponCodes)
            console.log(res.data)
        }).catch((error)=>{
            setIsLoading(false)
        })
    }, [dispatch])
    

    const handleSubmit = async (e) => {
        e.preventDefault()

        await axios.post(`${server}/coupon/create-coupon-code`, {
          name,
          minAmount,
          maxAmount,
          selectedProducts,
          shop: seller,
          value,
          shopId: seller._id,
        }, {withCredentials: true}).then((res) => {
          console.log(res.data)
          toast.success("Coupon code created successfully!");
          setOpen(false);
          window.location.reload();
        }).catch((error) => {
            toast.error(error.response.data.message)
        })
    }

    useEffect(() => {
        dispatch(getAllProductsShop(seller._id))
    }, [dispatch])

    
    const handleDelete = async (id) => {
        axios.delete(`${server}/coupon/delete-coupon/${id}`,{withCredentials: true}).then((res) => {
          toast.success("Coupon code deleted succesfully!")
        })
        window.location.reload();
      };
    
    const columns = [
        {field :"id", headerName: "Product Id",minWidth: 150, flex: 0.7},
        {
            field: "name",
            headerName: "Name",
            minWidth: 180,
            flex: 1.4,
        },
        {
            field: "price",
            headerName: "Price",
            minWidth: 100,
            flex: 0.6,
        },
        // {
        //     field: "stock",
        //     headerName: "Stock",
        //     type: "number",
        //     minWidth: 80,
        //     flex: 0.5,
        // },
        // {
        //     field: "sold",
        //     headerName: "Sold Out",
        //     type: "number",
        //     minWidth: 130,
        //     flex: 0.6,
        // },
        // {
        //     field:"Preview",
        //     flex: 0.8,
        //     minWidth: 100,
        //     headerName: "",
        //     type: "number",
        //     sortable: false,
        //     renderCell: (params) => {
        //         const d = params.row.name;
        //         const product_name = d.replace(/\s+/g,"-");
        //         return (
        //             <>
        //                 <Link to={`/product/${product_name}`}>
        //                     <Button>
        //                         <AiOutlineEye size={20}/>
        //                     </Button>
        //                 </Link>
        //             </>
        //         )
        //     }
        // },
        {
            field:"Delete",
            flex: 0.8,
            minWidth: 120,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        {/* <Link to={`/product/${product_name}`}> */}
                            <Button
                            onClick={() => handleDelete(params.id)}
                            >
                                <AiOutlineDelete size={20}/>
                            </Button>
                        {/* </Link> */}
                    </>
                )
            }
        },
    ]
    
    const row = []

    
    coupons && coupons?.forEach((item) => {
        row.push({
            id: item._id,
            name: item.name,
            price:item.value + "%",
            sold: 10
        })
    })



  return (
    <div className='w-full mx-8 pt-1 mt-10 bg-white'>
            <div className="w-full flex justify-end">
        <div className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
        onClick={() =>  setOpen(true)}
        >
            <span className='text-white'>Create Coupon Code</span>
        </div>
            </div>
        <DataGrid
        rows={row}
        columns={columns}
        pageSizeOptions={10}
        disableRowSelectionOnClick
        autoHeight
        />
        {
            open && (   
                <div className='fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex item-center justify-center p-10'>
                    <div className='w-[90%] 800px:w-[50%] h-[90vh] bg-white rounded-md shadow relative p-4'>
                        <div className='w-full flex justify-end'>
                        <LiaTimesSolid 
                        size={30} 
                        className='cursor-pointer'
                        onClick={() => setOpen(false)}
                        /> 
                        </div>
                        <h5 className='text-[30px] font-poppins text-center'>
                            Create Coupon
                        </h5>
                        <form onSubmit={handleSubmit} aria-aria-required={true}>
                            <br/>
                            <div>
                            <label className='pb-2'>
                                Name <span className='text-red-500'>*</span>
                            </label>
                            <input 
                            type='text' 
                            name="name" 
                            value={name}
                            required
                            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' 
                            onChange={(e) =>  
                            setName(e.target.value)}
                            placeholder='Enter your coupon code name...'
                            />
                            </div>
                            <br/>
                            <div>
                            <label className='pb-2'>
                                Discount Percentage <span className='text-red-500'>*</span>
                            </label>
                            <input 
                            type='number' 
                            name="value" 
                            value={value}
                            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' 
                            onChange={(e) =>  
                            setValue(e.target.value)}
                            placeholder='Enter your coupon code value...'
                            />
                            </div>
                            <br/>
                            <div>
                            <label className='pb-2'>
                                Min Amount <span className='text-red-500'>*</span>
                            </label>
                            <input 
                            type='number' 
                            name="value" 
                            value={minAmount}
                            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' 
                            onChange={(e) =>  
                            setMinAmount(e.target.value)}
                            placeholder='Enter your coupon code min amount...'
                            />
                            </div>
                            <br/>
                            <div>
                            <label className='pb-2'>
                                Max Amount <span className='text-red-500'>*</span>
                            </label>
                            <input 
                            type='number' 
                            name="value" 
                            value={maxAmount}
                            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' 
                            onChange={(e) =>  
                            setMaxAmount(e.target.value)}
                            placeholder='Enter your coupon code max amount...'
                            />
                            </div>
                            <br/>
                            <div>
                                <label className='pb-2'>
                                Selected Products  <span className='text-red-500'>*</span>
                                </label>
                                <select
                                className='w-full mt-2 border h-[35px] rounded-[5px]'
                                value={selectedProducts}
                                // placeholder='chose a category...'
                                onChange={(e) => setSelectedProducts(e.target.value)}
                                >   
                                <option value="Chose your selected products">Choose a selected products</option>
                                {
                                    products && products.map((i) => (
                                        <option
                                        value={i.name}
                                        key={i.name}
                                        >
                                            {i.name}
                                        </option>
                                    ))
                                }
                                </select>
                            </div>
                            <br/>
                            <div>
                            <input 
                            type='submit' 
                            name="value" 
                            value="Create"
                            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' 
                            // onChange={(e) =>  
                            // setMaxAmount(e.target.value)}
                            // placeholder='Enter your coupon code max amount...'
                            />
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default AllCoupons































