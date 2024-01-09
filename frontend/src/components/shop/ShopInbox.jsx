import React,{useEffect, useState} from "react";
import axios from "axios"
import { server } from "../../server";
import {useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import styles from "../../styles/styles"
import { GrGallery } from "react-icons/gr";
// import AiOutlineSend from "react-icons/ai"

const ShopInbox = () => {
  const { seller } = useSelector((state) => state.seller)
  console.log("seller", seller)
  const [conversations, setConversations] = useState([])
  console.log("conversations", conversations)

  const [open, setOpen] = useState(false) 


  useEffect(()=> {
     axios.get(`${server}/conversation/get-all-conversation-seller/${seller._id}`, 
    {withCredentials: true}
    ).then((res) => {
      setConversations(res.data.conversations)
    }).catch((error) => {
    console.log(error)
    })
    // console.log("messageList", messageList)
  },[seller])


  return (
    <div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-scroll rounded">

      {/* all messages list */}

        {!open && (
          <>
          <h1 className="text-center text-[20px] font-Poppins">All Messages</h1>
        {conversations 
          && conversations.map((item, index) => (
        <MessageList 
        data={item}
       key={index}
       index={index}
        setOpen={setOpen}
        /> 
        ))}
        </>
        )}
        {
          open && (
            <SellerInbox
            setOpen={setOpen}
            />
          )
        }

    </div>
  );
};

const MessageList = ({data, index, setOpen}) => {
  const [active, setActive] = useState(0)
  const navigate = useNavigate()
  const handleClick = (id) => {
    navigate(`?${id}`)
    setOpen(true)
  }

  return (
    <div className={`w-full flex p-3 px-3 ${active === index ? 'bg-[#00000010]' : 'bg-transparent'} cursor-pointer`}
    onClick={(e) => setActive(index) || handleClick(data._id)}
    >
      <div className="relative">
        <img
          src="https://res.cloudinary.com/tempegoreng/image/upload/v1704769951/seller_ecommerce1/zeuhaoerbdi2ju8ul6ht.jpg"
          alt=""
          className="w-[50px] h-[50px] rounded-full"
        />
        <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
      </div>
      <div className="pl-3">
        <h1 className="text-[18px]">Latif Budi Pamungkas</h1>
        <p className="text-[16px] text-[#000c]">Yeah I am good</p>
      </div>
    </div>
  );
};

const SellerInbox = ({setOpen}) => {
  return (
    <div className="w-full min-h-full flex flex-col justify-between">
      {/* message header */}
      <div className="flex justify-between p-[20px] items-center bg-slate-200">
        <div className="flex ">
      <img 
      src="https://res.cloudinary.com/tempegoreng/image/upload/v1704769951/seller_ecommerce1/zeuhaoerbdi2ju8ul6ht.jpg" 
      alt=""
      className="w-[60px] h-[60px] rounded-full" 
      />
      <div className="pl-3">
        <h1 className="text-[18px] font-[600]">Latif Budi</h1>
        <h1>Active Now</h1>
      </div>
        </div>
      <AiOutlineArrowRight size={20} onClick={() => setOpen(false)}/>
      </div>
      
      {/* messages */}
      <div className="px-3 h-[65vh] bg-red-100 py-2 overflow-y-scroll">
      <div className="w-max p-2 rounded bg-[#38c776] text-[#f4f2f2]">
        <p>Jancookk</p>
      </div>
      </div>





      {/* message input */}
      <form aria-required={true} className="p-3 relative w-full flex justify-between items-center">
        <div className="w-[3%] pl-3">
          <GrGallery size={25}/>
        </div>

        <div className="w-[95%]">
        <input type="text" placeholder="Enter your message..." className={`${styles.input}`}/>
        <input type="submit" value="Send" className='hidden' id="send"/>
        <label htmlFor="send">
            <AiOutlineSend size={25} className="absolute right-4 top-4 cursor-pointer"/>
        </label>
        </div>
      </form>
    </div>
  )
}

export default ShopInbox;
