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
import { BsPencil } from "react-icons/bs";
import { categoriesData } from '../../static/data'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import Loader from '../layout/Loader'


const AllProducts = () => {
    const {products, isLoading} = useSelector((state) => state.products || {} )
    console.log("products", products)
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
        dispatch(getAllProductsShop(seller._id))
    }, [dispatch])

    const handleDelete = (id) => {
        dispatch(deleteProduct(id))
        window.location.reload()
    }
    
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
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 80,
            flex: 0.5,
        },
        {
            field: "sold",
            headerName: "Sold Out",
            type: "number",
            minWidth: 130,
            flex: 0.6,
        },
        {
            field:"Preview",
            flex: 0.8,
            minWidth: 100,
            headerName: "Watch",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                const d = params.row.name;
                const product_name = d.replace(/\s+/g,"-");
                return (
                    <>
                        <Link to={`/product/${params.id}`}>
                            <Button>
                                <AiOutlineEye size={20}/>
                            </Button>
                        </Link>
                    </>
                )
            }
        },
        {
            field:"Delete",
            flex: 0.8,
            minWidth: 120,
            headerName: "Delete",
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
        {
            field:"Update",
            flex: 0.8,
            minWidth: 120,
            headerName: "Update",
            // type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        {/* <Link to={`/product/${product_name}`}> */}
                            <Button
                            onClick={() => setOpen(true)}
                            >
                                <BsPencil size={20}/>
                            </Button>
                        {/* </Link> */}
                    </>
                )
            }
        },
    ]
    
    const row = []

    products && products.forEach((item) => {
        row.push({
            id: item._id,
            name: item.name,
            price: "US$ " + item.discountPrice,
            stock: item.stock,
            // sold: 10
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

export default AllProducts