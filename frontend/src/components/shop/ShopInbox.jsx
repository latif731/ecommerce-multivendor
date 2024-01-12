import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { server } from "../../server";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import styles from "../../styles/styles";
import { GrGallery } from "react-icons/gr";
import { io } from "socket.io-client";
import { format } from "timeago.js";


const ENDPOINT = "http://localhost:4000/";

const socketId = io(ENDPOINT, {
  transports: ['websocket'],
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "value",
  },
});

const ShopInbox = () => {
  const { seller } = useSelector((state) => state.seller);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  console.log("messages", messages)
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);
  console.log("userData", userData)
  const [onlineUsers, setOnlineUser] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false)
  const [images, setImages] = useState();
  const scrollRef = useRef(null);

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        images: data.images,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    if (
      arrivalMessage &&
      arrivalMessage.sender &&
      currentChat?.members &&
      currentChat.members.includes(arrivalMessage.sender)
    ) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversations = async () => {
      try{
     const response = await axios
        .get(`${server}/conversation/get-all-conversation-seller/${seller?._id}`, {
          withCredentials: true,
        })
        setConversations(response.data.conversations)
      }catch(error){
        console.log(error)
      }
    }
    getConversations()
  }, [seller]);

  useEffect(() => {
    if (seller) {
      const sellerId = seller._id;
      socketId.emit("addUser", sellerId);
      socketId.on("getUser", (data) => {
        setOnlineUser(data);
      });
    }
  }, [seller]);
  

  // const onlineCheck = useCallback((chat) => {
  //   const chatMembers = chat.members.find((member) => member !== seller?._id);
  //   const online = onlineUsers.find((user) => user.userId === chatMembers);
  //   setActiveStatus(online ? true : false)
  //   return online ? true : false;
  // }, [onlineUsers, seller]);

  const onlineCheck = useCallback((chat) => {
    const chatMembers = chat.members.find((member) => member !== seller?._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);
    // setActiveStatus(online ? true : false)
    return online ? true : false 
  },[])


  const sendMessageHandler = useCallback(
    async (e) => {
      e.preventDefault();

      const message = {
        sender: seller?._id,
        text: newMessage,
        conversationId: currentChat?._id,
      };

      const receiverId = currentChat?.members.find(
        (member) => member.id !== seller?._id
      );

      socketId.emit("sendMessage", {
        senderId: seller?._id,
        receiverId,
        text: newMessage,
      });

      try {
        if (newMessage !== "") {
          const res = await axios.post(
            `${server}/message/create-new-message`,
            message,
            {
              // withCredentials: true,
            }
          );
          setMessages([...messages, res.data.message]);
          setNewMessage("");
          updateLastMessage();
        }
      } catch (error) {
        console.log(error);
      }
    },
    [seller, newMessage, currentChat, messages]
  );

  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(
          `${server}/message/get-all-messages/${currentChat?._id}`
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    if (currentChat?._id) {
      getMessage();
    }
  }, [currentChat]);

  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: seller?._id,
    });

    try {
      const res = await axios.put(
        `${server}/conversation/update-last-message/${currentChat?._id}`,
        {
          lastMessage: newMessage,
          lastMessageId: seller?._id,
        }
      );
      console.log(res.data.conversations);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUpload = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImages(reader.result);
        imageSendingHandler(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const imageSendingHandler = async (e) => {

    const receiverId = currentChat.members.find(
      (member) => member !== seller._id
    );

    socketId.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      images: e,
    });

    try {
      await axios
        .post(
          `${server}/message/create-new-message`,
          {
            images: e,
            sender: seller?._id,
            text: newMessage,
            conversationId: currentChat._id,
          }
        )
        .then((res) => {
          setImages();
          setMessages([...messages, res.data.message]);
          updateLastMessageForImage();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessageForImage = async () => {
    await axios.put(
      `${server}/conversation/update-last-message/${currentChat._id}`,
      {
        lastMessage: "Photo",
        lastMessageId: seller._id,
      }
    );
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ beahaviour: "smooth" });
  }, [messages]);




  return (
    <div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-scroll rounded">
      {!open && (
        <>
          <h1 className="text-center text-[20px] font-Poppins">All Messages</h1>
          {conversations &&
            conversations.map((item, index) => (
              <MessageList
                key={index}
                data={item}
                index={index}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
                me={seller?._id}
                setUserData={setUserData}
                userData={userData}
                online={onlineCheck(item)}
                setActiveStatus={setActiveStatus}
              />
            ))}
        </>
      )}
      {open && (
        <SellerInbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          sellerId={seller?._id}
          userData={userData}
          activeStatus={activeStatus}
          scrollRef={scrollRef}
          handleImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
};

const MessageList = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  userData,
  setUserData,
  online,
  setActiveStatus
}) => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const handleClick = useCallback(
    (id) => {
      navigate(`?${id}`);
      setOpen(true);
    },
    [navigate, setOpen]
  );

  useEffect(() => {
    setActiveStatus(online)
    const userId = data.members.find((user) => user !== me);
    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/user/user-info/${userId}`);
        setUserData(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [me, data, setUserData]);

  return (
    <div
      className={`w-full flex p-3 px-3 ${
        active === index ? "bg-[#00000010]" : "bg-transparent"
      } cursor-pointer`}
      onClick={(e) => 
        setActive(index) || 
        handleClick(data._id) || 
        setCurrentChat(data) ||
        setActiveStatus(online)
      } 
    >
      <div className="relative">
        {userData && userData.avatar && userData.avatar.url && (
          <img
            src={userData.avatar.url}
            alt=""
            className="w-[50px] h-[50px] rounded-full"
          />
        )}
        {online ? (
          <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
        ) : (
          <div className="w-[12px] h-[12px] bg-[#7c7575] rounded-full absolute top-[2px] right-[2px]" />
        )}
      </div>
      <div className="pl-3">
        <h1 className="text-[18px]">{userData?.name}</h1>
        <p className="text-[16px] text-[#000c]">You: {data?.lastMessage}</p>
      </div>
    </div>
  );
};

const SellerInbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
  userData,
  activeStatus,
  handleImageUpload,
  scrollRef
}) => {
  return (
    <div className="w-full min-h-full flex flex-col justify-between">
      <div className="flex justify-between p-[20px] items-center bg-slate-200">
        <div className="flex ">
          {userData && userData.avatar && userData.avatar.url && (
            <img
              src={userData.avatar.url}
              alt=""
              className="w-[60px] h-[60px] rounded-full"
            />
          )}
          <div className="pl-3">
            <h1 className="text-[18px] font-[600]">{userData.name}</h1>
            <h1>{activeStatus ? "Active Now" : ""}</h1>
          </div>
        </div>
        <AiOutlineArrowRight size={20} onClick={() => setOpen(false)} />
      </div>

      <div className="px-3 h-[65vh]  py-3 overflow-y-scroll">
        {messages &&
          messages.map((item, index) => (
            <div
              key={index}
              className={`flex w-full my-2 ${
                item.sender === sellerId ? "justify-end" : "justify-start"
              }`}
              ref={scrollRef}
            >
              {item.sender !== sellerId && (
                <img
                  // src="https://res.cloudinary.com/tempegoreng/image/upload/v1704769951/seller_ecommerce1/zeuhaoerbdi2ju8ul6ht.jpg"
                  src={userData?.avatar?.url}
                  alt=""
                  className="w-[40px] h-[40px] rounded-full mr-3"
                />
              )}
                  { item && item.images && item.images.url && (
                <img
                  src={`${item.images?.url}`}
                  className="w-[300px] h-[300px] object-cover rounded-[10px] ml-2 mb-2"
                />
              )}
              <div className="flex flex-col justify-end">
                <div className="w-max p-2 bg-[#38c776] text-[#f4f2f2] h-min rounded">
                  <p>{item.text}</p>
                </div>
                <p className="text-[12px] text-[#000] pr-3">
                  {format(item.createdAt)}
                </p>
              </div>
            </div>
          ))}
      </div>

      <form
        aria-required={true}
        className="p-3 relative w-full sticky flex justify-between bottom-0 items-center bg-slate-300 rounded"
        onSubmit={sendMessageHandler}
      >
        <div className="w-[30px]">
          <input
            type="file"
            name=""
            id="image"
            className="hidden"
            onChange={handleImageUpload}
          />
        <label htmlFor="image">
          <GrGallery size={25} />
        </label>
        </div>
        <div className="w-[95%]">
          <input
            type="text"
            required
            placeholder="Enter your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className={`${styles.input}`}
          />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label htmlFor="send">
            <AiOutlineSend
              size={25}
              className="absolute right-4 top-4 cursor-pointer"
              color="green"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default ShopInbox;

