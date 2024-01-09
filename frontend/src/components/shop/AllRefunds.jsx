import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProductsShop } from '../../redux/actions/product'
import { AiOutlineDelete, AiOutlineEye,AiOutlineArrowRight } from 'react-icons/ai'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import { deleteProduct } from '../../redux/actions/product'
import { FaTimes } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import styles from '../../styles/styles'
import { BsPencil } from "react-icons/bs";
import { categoriesData } from '../../static/data'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import Loader from '../layout/Loader'
import { getAllOrdersOfShop } from '../../redux/actions/order'


const AllRefunds = () => {
    const {orders, isLoading} = useSelector((state) => state.order || {} )
    console.log("orders", orders)
    const {seller} = useSelector((state) => state.seller )
    const [open, setOpen] = useState(false)

    
    const [images, setImages] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [tags, setTags] = useState("")
    const [originalPrice, setOriginalPrice] = useState()
    const [discountPrice, setDiscountPrice] = useState()
    const [stock, setStockPrice] = useState()

    const dispatch = useDispatch()

    const handleSubmit = () => {

    }

    const handleImageChange = () => {

    }

    useEffect(() => {
        dispatch(getAllOrdersOfShop(seller._id))
    }, [dispatch])

    const handleDelete = (id) => {
        dispatch(deleteProduct(id))
        window.location.reload()
    }

    const refundOrders = orders && orders.filter((item) => item.status === "Processing refund")
    
    const columns = [
        {field:"id", headerName:"Order ID", minWidth: 150, flex:0.7},
        {
          field:"status",
          headerName: "Status",
          minWidth: 130,
          valueGetter: (params: GridValueGetterParams) => 
            `${params.row.status}`
        },
        {
          field:"itemQty",
          headerName:"items Qty",
          type:"number",
          minWidth:130,
          flex:0.7
        },
        {
          field:"total",
          headerName:"Total",
          type:"number",
          minWidth:130,
          flex:0.7
        },
        {
          field:"",
          flex:1,
          headerName:"",
          type:"number",
          sortable:false,
          renderCell: (params) => {
            return (
              <>
                <Link to={`/order/${params.id}`}>
                  <Button>
                    {/* <AiOutlineArrowRight size={20}/> */}
                    <AiOutlineArrowRight size={20}/>
                  </Button>
                </Link>
              </>
            )
          }
        }
      ]
    
      const row = []
    
      refundOrders && refundOrders.forEach((item) => {
        row.push({
          id: item._id,
          itemQty: item.cart.length,
          total: "US$ " + item.totalPrice,
          status: item.status
        })
      })

  return (
    <>
    {isLoading ? (<Loader/>) : (
    <div className='w-full mx-8 pt-1 mt-10 bg-white'>
           {/* <div className="w-full flex justify-end">
        <div className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
        onClick={() =>  setOpen(true)}
        >
            <span className='text-white'>Create Coupon Code</span>
        </div>
            </div> */}
        <DataGrid
        rows={row}
        columns={columns}
        pageSizeOptions={[9, 25, 50, 100]} 
        disableRowSelectionOnClick
        autoHeight
        />
        {
            open && (   
                <div className='fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex item-center justify-center p-10'>
                    <div className='w-[90%] 800px:w-[50%] h-[90vh] bg-white rounded-md shadow relative p-4 overflow-y-auto'>
                        <div className='w-full flex justify-end'>
                        <LiaTimesSolid 
                        size={30} 
                        className='cursor-pointer'
                        onClick={() => setOpen(false)}
                        /> 
                        </div>
                        <h5 className="text-[30px] font-Poppins text-center">
                          Update Product
                        </h5>
                        <form onSubmit={handleSubmit}>
            <br/>
            <div>
                <label className='pb-2'>
                    Name <span className='text-red-500'>*</span>
                </label>
                <input 
                type='text' 
                name="name" 
                value={name}
                className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' 
                onChange={(e) =>  
                setName(e.target.value)}
                placeholder='Enter your product name...'
                />
            </div>
            <br/>
            <div>
                <label className='pb-2'>
                    Description <span className='text-red-500'>*</span>
                </label>
                <textarea
                cols="30"
                required
                rows="8"
                type='text' 
                name="descriptions" 
                value={description}
                className='mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' 
                onChange={(e) =>  
                setDescription(e.target.value)}
                placeholder='Enter your product descriptions...'
                ></textarea>
            </div>
            <br/>
            <div>
                <label className='pb-2'>
                   Category  <span className='text-red-500'>*</span>
                </label>
                <select
                className='w-full mt-2 border h-[35px] rounded-[5px]'
                value={category}
                // placeholder='chose a category...'
                onChange={(e) => setCategory(e.target.value)}
                >   
                    <option value="Chose a category">Choose a category</option>
                    {
                        categoriesData && categoriesData.map((i) => (
                            <option
                            value={i.title}
                            key={i.title}
                            >
                                {i.title}
                            </option>
                        ))
                    }
                </select>
            </div>
            <br/>
            <div>
            <label className='pb-2'>
                    Tags <span className='text-red-500'>*</span>
                </label>
                <input 
                type='text' 
                name="descriptions" 
                value={tags}
                className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' 
                onChange={(e) =>  
                setTags(e.target.value)}
                placeholder='Enter your product tags...'
                />
            </div>
            <br/>
            <div>
            <label className='pb-2'>
                    Original Price <span className='text-red-500'>*</span>
                </label>
                <input 
                type='number' 
                name="price" 
                value={originalPrice}
                className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' 
                onChange={(e) =>  
                setOriginalPrice(e.target.value)}
                placeholder='Enter your product price...'
                />
            </div>
            <br/>
            <div>
            <label className='pb-2'>
                 Price (With Discount) <span className='text-red-500'>*</span>
                </label>
                <input 
                type='number' 
                name="price" 
                value={discountPrice}
                className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' 
                onChange={(e) =>  
                setDiscountPrice(e.target.value)}
                placeholder='Enter your product discount price...'
                />
            </div>
            <br/>
            <div>
            <label className='pb-2'>
                 Product Stock <span className='text-red-500'>*</span>
                </label>
                <input 
                type='number' 
                name="stock" 
                value={stock}
                className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' 
                onChange={(e) =>  
                setStockPrice(e.target.value)}
                placeholder='Enter your product discount price...'
                />
            </div>
            <br/>
            <div>
            <label className='pb-2'>
                 Upload Image <span className='text-red-500'>*</span>
                </label>
                <input 
                type='file' 
                name=""
                id='upload' 
                className='hidden'
                multiple 
                onChange={handleImageChange}
                placeholder='Enter your product discount price...'
                />
              <div className="w-full flex items-center flex-wrap">
              <label htmlFor='upload'>
                    <AiOutlinePlusCircle
                    size={30}
                    className='mt-3'
                    color='#555'
                    
                    />
                </label>
                {
                    images && images.map((i) => (
                        <img src={URL.createObjectURL(i)} key={i} alt="" className='h-[120px] w-[120px] object-cover m-2'/>
                    ))
                }
              </div>
              <br/>
              <div>
                <input type='submit' value="Create"
                className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
              </div>
            </div>
        </form>
                    </div>
                </div>
            )
        }
    </div>
    )}
    </>
  )
}

export default AllRefunds