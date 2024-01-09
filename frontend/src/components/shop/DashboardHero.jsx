import React,{useState, useEffect} from 'react'
import DashboardHeader from '../Dashboard/layout/DashboardHeader'
import { AiOutlineAccountBook, AiOutlineMoneyCollect } from 'react-icons/ai'
import styles from '../../styles/styles'
import {Link} from  "react-router-dom"
import order from "../../assets/order-delivery.png"
import productIcon from "../../assets/features.png"
import calculator from "../../assets/accounts.png"
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsShop } from '../../redux/actions/product'
import { getAllOrdersOfShop } from '../../redux/actions/order'
import { AiOutlineArrowRight } from 'react-icons/ai'
import {DataGrid} from "@mui/x-data-grid"
import { Button } from '@mui/material'



const DashboardHero = () => {
    const dispatch = useDispatch()
    const {seller } = useSelector((state) =>  state.seller)
    const {orders} = useSelector((state) => state.order)
    console.log("orders", orders)
    const {products} = useSelector((state) => state.products)
    const [deliveredOrder, setDeliveredOrder] = useState(null)
    console.log("deliveredorder", deliveredOrder)


    useEffect(() => {
        dispatch(getAllProductsShop(seller._id))
        dispatch(getAllOrdersOfShop(seller._id))

        const orderData = orders && orders.filter((item) => item.status === "Received")
        console.log("order data", orderData)
        setDeliveredOrder(orderData)
    },[dispatch])

    const totalEarningWithoutTax = deliveredOrder && deliveredOrder.reduce((acc, item) => acc + item.totalPrice, 0)

    const serviceCharge = totalEarningWithoutTax * 0.1;
    const availableBalance = totalEarningWithoutTax - serviceCharge
    console.log("availableBalance", availableBalance)


  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
    //   cellClassName: (params) => {
    //     return params.getValue(params.id, "status") === "Delivered"
    //       ? "greenColor"
    //       : "redColor";
    //   },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/dashboard/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders && orders.forEach((item) => {
    row.push({
        id: item._id,
        itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
  });

  return (
        <div className='w-full p-8'>
            <h3 className='text-[22px] font-Poppins pb-2'>
                Overview
            </h3>
            <div className="w-full block 800px:flex items-center justify-between">
                <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
                    <div className="flex items-center">
                        {/* <AiOutlineMoneyCollect
                        size={30}
                        className='mr-2'
                        fill='#00000085'
                        /> */}
                        <img src={calculator} style={{width:"27px", marginRight:"7px", color:"red"}}/>
                        <h3 
                        className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                        >
                        Account Balance <span className='text-[16px]'>(with 10% service change)</span>
                        </h3>
                    </div>
                    <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                        $({availableBalance})
                    </h5> 
                    <Link to={"/dashboard-withdraw-money"}>
                    <h5 className='pt-4 pl-2 text-[#077f9c]'>Withdraw Money</h5>
                    </Link>
                </div>
                <div className="w-full mb-4 800px:w-[30%] min-h-[23vh] bg-white shadow rounded px-2 py-5">
                    <div className="flex items-center">
                        {/* <AiOutlineMoneyCollect
                        size={30}
                        className='mr-2'
                        fill='#00000085'
                        /> */}
                        <img src={order} style={{width:"27px", marginRight:"7px", color:"red"}}/>
                        <h3 
                        className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                        >
                        All Orders <span className='text-[16px]'>(with 10% service change)</span>
                        </h3>
                    </div>
                    <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                        {orders?.length}
                    </h5> 
                    <Link to={"/dashboard-orders"}>
                    <h5 className='pt-4 pl-2 text-[#077f9c]'>View Orders</h5>
                    </Link>
                </div>
                <div className="w-full mb-4 800px:w-[30%] min-h-[23vh] bg-white shadow rounded px-2 py-5">
                    <div className="flex items-center">
                        {/* <AiOutlineMoneyCollect
                        size={30}
                        className='mr-2'
                        fill='#00000085'
                        /> */}
                        <img src={productIcon} style={{width:"27px", marginRight:"7px", color:"red"}}/>
                        <h3 
                        className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                        >
                        All Products <span className='text-[16px]'>(with 10% service change)</span>
                        </h3>
                    </div>
                    <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                        {products?.length}
                    </h5> 
                    <Link to={"/dashboard-products"}>
                    <h5 className='pt-4 pl-2 text-[#077f9c]'>View Products</h5>
                    </Link>
                </div>
            </div>
                <br/>
                <h3 className='text-[22px] font-Poppins pb-2'>Latest Orders</h3>
                <div className='w-full min-h-[40vh] bg-white rounded'>
                <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
                </div>
        </div>
  )
}

export default DashboardHero