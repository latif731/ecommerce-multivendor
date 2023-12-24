import React from 'react'
import { Link } from 'react-router-dom'
import { RxDashboard } from 'react-icons/rx'
import {AiFillShop, AiOutlineFolderAdd, AiOutlineGift, AiOutlineShopping} from "react-icons/ai"
import {FiShoppingBag} from "react-icons/fi"
import {TbPackages} from "react-icons/tb"
import { FiPackage } from 'react-icons/fi'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill } from "react-icons/ci"
import { BiMessageSquareDetail } from 'react-icons/bi'
import { IoReceiptOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";


const DashboardSidebar = ({active}) => {
  return (
    <div className='w-full h-[89vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10'>
      {/* single item */}
      <div className="w-full flex-center p-3">
        <Link to={"/dashboard"} className='w-full flex items-center'>
          <RxDashboard
          size={30}
          color={`${active === 1 ? "crimson" : "#555"}`}
          />
          <h5 className={`hidden 800px:block pl-3 text-[18px] font-[400] ${active === 1 ? "text-[crimson]" : "text-[#555]" }`}>
            Dashboard
          </h5>
        </Link>
      </div>
      <div className="w-full flex-center p-3">
        <Link to={"/dashboard-orders"} className='w-full flex items-center'>
          <FiShoppingBag
          size={30}
          color={`${active === 2 ? "crimson" : "#555"}`}
          />
          <h5 className={`hidden 800px:block pl-3 text-[18px] font-[400] ${active === 2 ? "text-[crimson]" : "text-[#555]" }`}>
            All Orders
          </h5>
        </Link>
      </div>
      <div className="w-full flex-center p-3">
        <Link to={"/dashboard-all-products"} className='w-full flex items-center'>
          <TbPackages
          size={30}
          color={`${active === 3 ? "crimson" : "#555"}`}
          />
          <h5 className={`hidden 800px:block pl-3 text-[18px] font-[400] ${active === 3 ? "text-[crimson]" : "text-[#555]" }`}>
            All Products
          </h5>
        </Link>
      </div>
      <div className="w-full flex-center p-3">
        <Link to={"/dashboard-create-products"} className='w-full flex items-center'>
          <AiOutlineFolderAdd
          size={30}
          color={`${active === 4 ? "crimson" : "#555"}`}
          />
          <h5 className={`hidden 800px:block pl-3 text-[18px] font-[400] ${active === 4 ? "text-[crimson]" : "text-[#555]" }`}>
          Create Product
          </h5>
        </Link>
      </div>
      <div className="w-full flex-center p-3">
        <Link to={"/dashboard-all-events"} className='w-full flex items-center'>
          <MdOutlineLocalOffer
          size={30}
          color={`${active === 5 ? "crimson" : "#555"}`}
          />
          <h5 className={`hidden 800px:block pl-3 text-[18px] font-[400] ${active === 5 ? "text-[crimson]" : "text-[#555]" }`}>
            All Events
          </h5>
        </Link>
      </div>
      <div className="w-full flex-center p-3">
        <Link to={"/dashboard-create-events"} className='w-full flex items-center'>
          <VscNewFile
          size={30}
          color={`${active === 6 ? "crimson" : "#555"}`}
          />
          <h5 className={`hidden 800px:block pl-3 text-[18px] font-[400] ${active === 6 ? "text-[crimson]" : "text-[#555]" }`}>
            Create Events
          </h5>
        </Link>
      </div>
      <div className="w-full flex-center p-3">
        <Link to={"/dashboard-withdraw-money"} className='w-full flex items-center'>
          <CiMoneyBill
          size={30}
          color={`${active === 7 ? "crimson" : "#555"}`}
          />
          <h5 className={`hidden 800px:block pl-3 text-[18px] font-[400] ${active === 7 ? "text-[crimson]" : "text-[#555]" }`}>
            Withdraw Money
          </h5>
        </Link>
      </div>
      <div className="w-full flex-center p-3">
        <Link to={"/dashboard-messages"} className='w-full flex items-center'>
          <BiMessageSquareDetail
          size={30}
          color={`${active === 8 ? "crimson" : "#555"}`}
          />
          <h5 className={`hidden 800px:block pl-3 text-[18px] font-[400] ${active === 8 ? "text-[crimson]" : "text-[#555]" }`}>
            Shop Inbox
          </h5>
        </Link>
      </div>
      <div className="w-full flex-center p-3">
        <Link to={"/dashboard/coupounds"} className='w-full flex items-center'>
          <AiOutlineGift
          size={30}
          color={`${active === 9 ? "crimson" : "#555"}`}
          />
          <h5 className={`hidden 800px:block pl-3 text-[18px] font-[400] ${active === 9 ? "text-[crimson]" : "text-[#555]" }`}>
            Discount Codes 
          </h5>
        </Link>
      </div>
      <div className="w-full flex-center p-3">
        <Link to={"/dashboard-refunds"} className='w-full flex items-center'>
          <IoReceiptOutline
          size={30}
          color={`${active === 10 ? "crimson" : "#555"}`}
          />
          <h5 className={`hidden 800px:block pl-3 text-[18px] font-[400] ${active === 10 ? "text-[crimson]" : "text-[#555]" }`}>
            Refunds
          </h5>
        </Link>
      </div>
      <div className="w-full flex-center p-3">
        <Link to={"/dashboard-settings"} className='w-full flex items-center'>
          <IoSettingsOutline
          size={30}
          color={`${active === 11 ? "crimson" : "#555"}`}
          />
          <h5 className={`hidden 800px:block pl-3 text-[18px] font-[400] ${active === 11 ? "text-[crimson]" : "text-[#555]" }`}>
            Settings
          </h5>
        </Link>
      </div>
    </div>
  )
}

export default DashboardSidebar