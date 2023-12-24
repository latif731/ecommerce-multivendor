import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProductsShop } from '../../redux/actions/product'
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import { deleteEvent } from '../../redux/actions/event'
import { getAllEventsShop } from '../../redux/actions/event'
import Loader from '../layout/Loader'

const AllEvents = () => {
    const {events, isLoading} = useSelector((state) => state?.events || {} )
    console.log("events",events)
    const {seller} = useSelector((state) => state.seller )

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllEventsShop(seller._id))
    }, [dispatch])

    const handleDelete = (id) => {
        dispatch(deleteEvent(id))
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
            headerName: "Preview",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                const d = params.row.name;
                const product_name = d.replace(/\s+/g,"-");
                return (
                    <>
                        <Link to={`/events`}>
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
    ]
    
    const row = []

    events && events.forEach((item) => {
        row.push({
            id: item._id,
            name: item.name,
            price: "US$ " + item.discountPrice,
            stock: item.stock,
            sold: 10
        })
    })


  return (
    <>
    {isLoading ? (
        <Loader/>
    ) : (
    <div className='w-full mx-8 pt-1 mt-10 bg-white'>
        <DataGrid
        rows={row}
        columns={columns}
        pageSizeOptions={10}
        disableRowSelectionOnClick
        autoHeight
        />
    </div>
    )}
    </>
  )
}

export default AllEvents