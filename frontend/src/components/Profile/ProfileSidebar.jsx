import React from 'react'
import { AiOutlineMessage } from 'react-icons/ai'
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from 'react-icons/hi'
import { MdAddReaction, MdOutlineTrackChanges } from 'react-icons/md'
import {BsReceiptCutoff} from  "react-icons/bs"
import {BiLogOutCircle} from "react-icons/bi"
import {FaRegAddressCard} from "react-icons/fa"
import { RxPerson } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { server } from '../../server'
import { toast } from "react-toastify"
import { CiLock } from "react-icons/ci";


const ProfileSidebar = ({active, setActive}) => {
  const navigate = useNavigate()

  const logoutHandler = () => {
      axios.get(`http://localhost:5000/api/v2/user/logout`,{withCredentials: true})
      .then((res) => {
        toast.success(res.data.message)
        navigate("/login")
        window.location.reload(true)
      }).catch((error) => {
        console.log(error.response.data.message)
      })
  }
  return (
    <div className='w-full bg-white shadow-sm rounded-[10px] p-4 pt-8'>
       <div className='flex items-center cursor-pointer w-full mb-8'
       onClick={() =>  setActive(1)}
       >  
          <RxPerson size={20} color={active === 1 ? "red" : ""}/>
          <span
          className={`pl-3 ${active === 1 ? "text-[red]" : ""} 800px:block hidden`}
          >
            Profile
          </span>
       </div>
       <div className='flex items-center cursor-pointer w-full mb-8'
       onClick={() =>  setActive(2)}
       >  
          <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""}/>
          <span
          className={`pl-3 ${active === 2 ? "text-[red]" : ""} 800px:block hidden`}
          >
            Orders
          </span>
       </div>
       <div className='flex items-center cursor-pointer w-full mb-8'
       onClick={() =>  setActive(3)}
       >  
          <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : ""}/>
          <span
          className={`pl-3 ${active === 3 ? "text-[red]" : ""} 800px:block hidden`}
          >
            Refunds
          </span>
       </div>
       <div className='flex items-center cursor-pointer w-full mb-8'
       onClick={() =>  setActive(4) || navigate("/inbox")}
       >  
          <AiOutlineMessage size={20} color={active === 4 ? "red" : ""}/>
          <span
          className={`pl-3 ${active === 4 ? "text-[red]" : ""} 800px:block hidden`}
          >
            Inbox
          </span>
       </div>
       <div className='flex items-center cursor-pointer w-full mb-8'
       onClick={() =>  setActive(5)}
       >  
          <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : ""}/>
          <span
          className={`pl-3 ${active === 5 ? "text-[red]" : ""} 800px:block hidden`}
          >
            Track Order
          </span>
       </div>
       <div className='flex items-center cursor-pointer w-full mb-8'
       onClick={() =>  setActive(6)}
       >  
          <BsReceiptCutoff size={20} color={active === 6 ? "red" : ""}/>
          <span
          className={`pl-3 ${active === 6 ? "text-[red]" : ""} 800px:block hidden`}
          >
            Payment Method
          </span>
       </div>
       <div className='flex items-center cursor-pointer w-full mb-8'
       onClick={() =>  setActive(7)}
       >  
          <FaRegAddressCard size={20} color={active === 7 ? "red" : ""}/>
          <span
          className={`pl-3 ${active === 7 ? "text-[red]" : ""} 800px:block hidden`}
          >
            Address
          </span>
       </div>
       <div className='flex items-center cursor-pointer w-full mb-8'
       onClick={() =>  setActive(8)}
       >  
          <CiLock size={20} color={active === 8 ? "red" : ""}/>
          <span
          className={`pl-3 ${active === 8 ? "text-[red]" : ""} 800px:block hidden`}
          >
            Change Password
          </span>
       </div>
       <div className='flex items-center cursor-pointer w-full mb-8'
       onClick={logoutHandler}
       >  
          <BiLogOutCircle size={20} color={"red"}/>
        <span
          className={`pl-3  text-[red] 800px:block hidden`}
          >
            Log out
          </span>
       </div>
    </div>
  )
}

export default ProfileSidebar