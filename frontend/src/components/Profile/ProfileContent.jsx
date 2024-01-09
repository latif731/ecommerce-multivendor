import React, { useState, useEffect } from 'react'
import logo from "../../assets/logo-logo1.png"
import {useSelector, useDispatch} from "react-redux"
import { backend_url } from '../../server'
import visa from "../../assets/visa.png"
import { Link } from 'react-router-dom'
import { server } from '../../server'
import {MdOutlineTrackChanges, MdTrackChanges} from "react-icons/md"
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from 'react-icons/ai'
import styles from '../../styles/styles'
import { DataGrid, GridValueGetterParams } from '@mui/x-data-grid';
// import {Button} from "@mui/icons-material"
import Button from '@mui/material/Button';
import axios from "axios"
import {toast} from "react-toastify"
import { updateUserInformation, updateUserAddress, deleteUserAddress } from '../../redux/actions/user'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { loadUser } from '../../redux/actions/user'
import { RxCross1 } from 'react-icons/rx'
import {Country, State, City} from "country-state-city"
import { getAllOrdersOfUser } from '../../redux/actions/order'
import "./row.css"


const ProfileContent = ({active}) => {
  const {orders} = useSelector((state) => state.order)
  const {isAuthenticated, user, loading,error, successMessage} = useSelector((state) => state.user)
  // console.log("profile",user)

//   const user = [
//     {
//         name:"latif",
//         avatar:`http://localhost:3000${logo}`,
//         email:"latif@email.com",
//         password:"12345"
//     }
// ]
  const [name, setName] = useState(user && user.name)
  // console.log(name)
  const [email, setEmail] = useState(user && user.email)
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber)
  const [zipCode, setZipCode] = useState() 
  const [firstAddress, setFirstAddress] = useState() 
  const [secondAddress, setSecondAddress] = useState() 
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null)
  // console.log("ini avatar di profileContent",avatar)
  const dispatch = useDispatch()
  const [visible, setVisible]= useState(false)
  const [previewImage, setPreviewImage] = useState(user?.avatar?.url || "")
  // console.log(previewImage)
  const [avatarChanged, setAvatarChanged] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error,successMessage])
  

  const Submit = (e) => {
    e.preventDefault()
    if(!password){
      toast.error("Please provide your password");
      return 
    }
    // console.log("Submitting", name, email,phoneNumber, password)
    dispatch(updateUserInformation(name, email, phoneNumber, password))
    if(avatarChanged && avatar) {
      axios
      .put(
        `${server}/user/update-avatar`,
        { avatar },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        dispatch(loadUser())
        toast.success("Avatar updated successfully!", {
          autoClose: 5000
        });
        
        // Wait for a short duration before reloading the page
        setTimeout(() => {
          window.location.reload();
        }, 5000); 
      })
      .catch((error) => {
        toast.error(error);
      });
    }
  }


const handleImages = async(e) => {
  const file = e.target.files[0]
  if(file){
    const imageUrl = URL.createObjectURL(file);
        setPreviewImage(imageUrl)
        const reader = new FileReader()
      
        reader.onload = () => {
          if(reader.readyState === 2){
              setAvatar(reader.result);
              setAvatarChanged(true)
            }
          }
      reader.readAsDataURL(e.target.files[0]);
  }else{
    setPreviewImage(user?.avatar?.url || "")
    setAvatar(null)
    setAvatarChanged(false)
  }

  }




  return (
    <div className='w-full '>
      {/* profile page */}
      {
        active === 1 && (
          <>
          <div className='flex justify-center w-full'>
            <div className='relative'>
            <img 
            src={previewImage}
            // src={logo}
            className='w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]'
            alt=''
            />
            <div className='w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]'>
              <input 
              type='file' 
              id='image'
              className='hidden'
              onChange={handleImages}
              />
              <label
              htmlFor='image'
              ><AiOutlineCamera/></label>
            </div>
            </div>
          </div>
            <div className='w-full px-10 py-10'>
              <form
              onSubmit={Submit}
              aria-required={true}
              >
                <div className='w-full flex pb-3'>
                  <div className='w-[50%]'>
                    <label className='block pb-2'>Full Name</label>
                    <input
                    type='text'
                    className={`${styles.input} !w-[95%]`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className='w-[50%]'>
                    <label className='block pb-2'>Email Address</label>
                    <input
                    type='email'
                    className={`${styles.input} !w-[95%]`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className='w-full flex pb-3'>
                  <div className='w-[50%]'>
                    <label className='block pb-2'>Phone Number</label>
                    <input
                    type='number'
                    className={`${styles.input} !w-[95%]`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div
                        // className="flex justify-between  border px-3 py-2 w-80 border-gay-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm" 
                        className=" w-[100%] 800px:w-[50%]"
                        >
                          <label className="block pb-2">Enter your password</label>
                          <div
                          className='flex justify-between'
                          >

                          
                            <input 
                            type={visible ? "text" : "password"} 
                            name='password' 
                            autoComplete='current-password' 
                            required 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                            />

                            {
                                visible ? <AiOutlineEye
                                className=' cursor-pointer'
                                size={25}
                                onClick={() => setVisible(false)}
                                /> :
                             <AiOutlineEyeInvisible
                            className=' cursor-pointer'
                            size={25}
                            onClick={() => setVisible(true)}
                            /> 
                        }
                        </div>
                        </div>
                </div>
                <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                type='submit'
                value="update"
                required
                />
              </form>
            </div>
            </>
        )
      }
      {/* oreder page */}
      {
        active === 2 && (
          <div>
            <AllOrders/>
          </div>
        )
      }
      {/* refund page */}
      {
        active === 3 && (
          <div>
            <AllRefundOrders/>
          </div>   
        )
      }
      {/* track orderpage */}
      {
        active === 5 && (
          <div>
            <TrackOrder/>
          </div>   
        )
      }
      {/* payment method */}
      {
        active === 6 && (
          <div>
            <Payment/>
          </div>   
        )
      }
      {/* user Address */}
      {
        active === 7 && (
          <div>
            <Address/>
          </div>   
        )
      }
      {
        active === 8 && (
          <div>
            <ChangePassword/>
          </div>
        )
      }
    </div>
  )
}

const AllOrders = () => {
  const { orders } = useSelector((state) => state.order);
  const {user} = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id))
  }, [])

  

  const columns = [
    {field:"id", headerName:"Order ID", minWidth: 50, flex:0.2},
    {
      field:"status",
      headerName: "Status",
      minWidth: 50,
      valueGetter: (params: GridValueGetterParams) => 
        `${params?.row?.status}`
    },
    {
      field:"itemQty",
      headerName:"items Qty",
      type:"number",
      minWidth:50,
      flex:0.2
    },
    {
      field:"total",
      headerName:"Total",
      type:"number",
      minWidth:50,
      flex:0.2
    },
    {
      field:"",
      flex:0.2,
      headerName:"",
      type:"number",
      sortable:false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20}/>
              </Button>
            </Link>
          </>
        )
      }
    }
  ]

  const row = []

  orders && orders.forEach((item) => {
    row.push({
      id: item?._id,
      itemQty: item?.cart?.length,
      total: "US$ " + item?.totalPrice,
      status: item?.status
    })
  })


  // console.log(getRowClassName)

  return (
    <div className='pl-8 pt-1 w-[70rem]'>
      <DataGrid
      rows={row}
      columns={columns}
      pageSize={10}
      disableSelectionOnClick
      // getRowClassName={getRowClassName}
      />
    </div>
  )
}

const AllRefundOrders = () => {
  const { orders } = useSelector((state) => state.order);
  const {user} = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id))
  }, [])

  const eligibleOrder = orders && orders.filter((item) => item.status === "Processing refund")

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
          <Link to={`profile/user/order/${params.id}`}>
            <Button>
              <AiOutlineArrowRight size={20}/>
            </Button>
          </Link>
        </>
      )
    }
  }
]

const row = []

eligibleOrder && eligibleOrder.forEach((item) => {
  row.push({
    id: item._id,
    itemQty: item.cart.length,
    total: "US$ " + item.totalPrice,
    status: item.status
  })
})

console.log("all orders", orders)


  return (
    <div className='pl-8 pt-1'>
        <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
        />
    </div>
  )
}

const TrackOrder = () => {

 const { orders } = useSelector((state) => state.order);
  const {user} = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id))
  }, [])

  

  const columns = [
    {field:"id", headerName:"Order ID", minWidth: 50, flex:0.2},
    {
      field:"status",
      headerName: "Status",
      minWidth: 50,
      valueGetter: (params: GridValueGetterParams) => 
        `${params?.row?.status}`
    },
    {
      field:"itemQty",
      headerName:"items Qty",
      type:"number",
      minWidth:50,
      flex:0.2
    },
    {
      field:"total",
      headerName:"Total",
      type:"number",
      minWidth:50,
      flex:0.2
    },
    {
      field:"",
      flex:0.2,
      headerName:"",
      type:"number",
      sortable:false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`user/track-order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20}/>
              </Button>
            </Link>
          </>
        )
      }
    }
  ]

  const row = []

  orders && orders.forEach((item) => {
    row.push({
      id: item?._id,
      itemQty: item?.cart?.length,
      total: "US$ " + item?.totalPrice,
      status: item?.status
    })
  })

  return (
    <div className='pl-8 pt-1'>
        <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
        />
    </div>
  )
}

const Payment = () => {
  return (
    <div className='w-full px-5'>
      <div className='flex w-full items-center justify-between'>
      <h1
      className='text-[25px] font-[600] text-[#000000ba] pb-2'
      >
        Payment Methods
      </h1>
      <div
      className={`${styles.button} rounded-md`}
      >
        <span className='text-[#fff]'>
          Add New
        </span>
      </div>
      </div>
      <br/>
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <img
          src={visa}
          className='w-20'
          />
          <h5 className='pl-5 font-[600]'>Latif Budi Pamungkas</h5>
        </div>
        <div className='pl-8 flex items-center'>
          <h6>123 ***** *** ****</h6>
          <h5 className='pl-6'>08/2022</h5>
        </div>
        <div className='min-w-[10%] flex items-center justify-between pl-8'>
          <AiOutlineDelete size={20} className='cursor-pointer'/>
        </div>
      </div>
    </div>
  )
}
const Address = () => {
  const [open, setOpen] = useState(false);
  let countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState();
  const [cityData, setCityData] = useState();
  const [country, setCountry] = useState(countryData[0]);
  // console.log("country", country)
  const [state, setState] = useState("");
  // console.log("state",state)
  const [city, setCity] = useState("")
  // console.log("city", city)
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) =>  state.user);
  console.log(user)
  const dispatch = useDispatch()


  useEffect(() => {
    setStateData(State.getStatesOfCountry(country?.isoCode))
  }, [])

  useEffect(() => {
    setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
  }, [state]);

  useEffect(() => {
    stateData && setState(stateData[0]);
  }, [stateData]);

  useEffect(() => {
    cityData && setCity(cityData[0]);
  }, [cityData]);
  

  const addressTypeData = [
    {
      name:"Default"
    },
    {
      name:"Home"
    },
    {
      name:"Office"
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(addressType === "" || country === "" || city === ""){
      toast.error('Please fill out all fields')
    }else{
      dispatch(updateUserAddress( 
        country,
        city,
        address1,
        address2,
        zipCode,
        addressType
        ))
        setOpen(false)
        setCountry("")
        setCity("")
        setAddress1()
        setAddress2()
        setZipCode(null)
        setAddressType("")
    } 
  }

  const handleDelete =  (item) => {
      const id = item._id;
      dispatch(deleteUserAddress(id));
    // window.location.reload()
  };

  return (
    <div className='w-full px-5'>
      {
        open &&(
          <div className='fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center'>
            <div className='w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll'>
              <div className='w-full flex justify-end p-3'>
            <RxCross1
            size={30}
            className='cursor-pointer'
            onClick={() => setOpen(false)}
            />
            </div>
            <h1 className='text-center text-[25px] font-Poppies'>
              Add new Address
            </h1>
            <div className='w-full'>
              <form aria-required onSubmit={handleSubmit}>
                <div className='w-full block p-4'>
                  <div className='w-full pb-2'>
                    <label className='block pb-2'>
                      Country
                    </label>
                    <select name="" id="" value={country} onChange={(e) => setCountry(e.target.value)}
                    className='w-[95%] border h-[40px] rounded-[5px]'
                    >
                      <option value="" className='block pb-2'>
                        choose your Country
                      </option>
                      {
                        Country && Country.getAllCountries().map((item) => (
                          <option  className='block pb-2' key={item.isoCode} value={item.isoCode}>
                              {item.name}
                          </option>
                        ))
                      }
                    </select>
                  </div>
                  <div className='w-full pb-2'>
                    <label className='block pb-2'>
                      Province
                    </label>
                    <select name="" id="" value={state} onChange={(e) => setState(e.target.value)}
                    className='w-[95%] border h-[40px] rounded-[5px]'
                    >
                      <option value="" className='block pb-2'>
                        choose your province
                      </option>
                      {
                        State && State.getStatesOfCountry(country).map((item) => (
                          <option  className='block pb-2' key={item.isoCode} value={item.isoCode}>
                              {item.name}
                          </option>
                        ))
                      }
                    </select>
                  </div>
                  {/* <div className='w-full pb-2'>
                    <label className='block pb-2'>
                      City
                    </label>
                    <select name="" id="" value={city} onChange={(e) => setCity(e.target.value)}
                    className='w-[95%] border h-[40px] rounded-[5px]'
                    >
                      <option value="" className='block pb-2'>
                        choose your city
                      </option>
                      {
                        City && City.getCitiesOfState(country, state).map((item) => (
                          <option  className='block pb-2' key={item.isoCode} value={item.isoCode}>
                              {item.name}
                          </option>
                        ))
                      }
                    </select>
                  </div> */}
                     <div className='w-full pb-2'>
                    <label className='block pb-2'>
                      Adress 1
                    </label>
                    <input 
                    type="address" 
                    id="" 
                    required
                    value={address1} 
                    onChange={(e) => setAddress1(e.target.value)}
                    className={styles.input}
                    />
                      {/* <option value="" className='block pb-2'>
                        choose your province
                      </option>
                      {
                        State && State.getStatesOfCountry(country).map((item) => (
                          <option  className='block pb-2' key={item.isoCode} value={item.isoCode}>
                              {item.name}
                          </option>
                        ))
                      } */}
                    
                  </div>
                     <div className='w-full pb-2'>
                    <label className='block pb-2'>
                      Adress 2
                    </label>
                    <input 
                    type="address" 
                    id="" 
                    required
                    value={address2} 
                    onChange={(e) => setAddress2(e.target.value)}
                    className={styles.input}
                    />
                      {/* <option value="" className='block pb-2'>
                        choose your province
                      </option>
                      {
                        State && State.getStatesOfCountry(country).map((item) => (
                          <option  className='block pb-2' key={item.isoCode} value={item.isoCode}>
                              {item.name}
                          </option>
                        ))
                      } */}
                    
                  </div>
                     <div className='w-full pb-2'>
                    <label className='block pb-2'>
                      Zib Code
                    </label>
                    <input 
                    type="number" 
                    id="" 
                    required
                    value={zipCode} 
                    onChange={(e) => setZipCode(e.target.value)}
                    className={styles.input}
                    />
                      {/* <option value="" className='block pb-2'>
                        choose your province
                      </option>
                      {
                        State && State.getStatesOfCountry(country).map((item) => (
                          <option  className='block pb-2' key={item.isoCode} value={item.isoCode}>
                              {item.name}
                          </option>
                        ))
                      } */}
                    
                  </div>
                  <div className='w-full pb-2'>
                    <label className='block pb-2'>
                      Address Type
                    </label>
                    <select name="" id="" value={addressType} onChange={(e) => setAddressType(e.target.value)}
                    className='w-[95%] border h-[40px] rounded-[5px]'
                    >
                      <option value="" className='block pb-2'>
                        choose your Address Type
                      </option>
                      {
                        addressTypeData && addressTypeData.map((item) => (
                          <option  
                          className='block pb-2' 
                          key={item.name} 
                          value={item.name}>
                              {item.name}
                          </option>
                        ))
                      }
                    </select>
                  </div>
                  <div className='w-full pb-2'>
                    <input 
                    type="submit" 
                    className={`${styles.input} mt-5 cursor-pointer`}
                    required
                    readOnly
                    />
                    </div>

                </div>
              </form>
            </div>
            </div>
          </div>
        )

      }
      <div className='flex w-full items-center justify-between'>
      <h1
      className='text-[25px] font-[600] text-[#000000ba] pb-2'
      >
        My Addresses
      </h1>
      <div
      className={`${styles.button} rounded-md`}
      onClick={() => setOpen(true)}
      >
        <span className='text-[#fff]'>
          Add New
        </span>
      </div>
      </div>
      <br/>
      {
        user && user.addresses.map((item, index) => (
      <div key={index} className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          {/* <img
          src={visa}
          className='w-20'
          /> */}
          <h5 className='pl-5 font-[600]'>{item.addressType}</h5>
        </div>
        <div className='pl-8 flex items-center'>
          <h6 className='font-[400]'>{item.address1} + {item.address2}</h6>
        </div>
        <div className='pl-8 flex items-center'>
          <h6 className='font-[400]'>{user && user.phoneNumber}</h6>
        </div>
        <div className='min-w-[10%] flex items-center justify-between pl-8'>
          <AiOutlineDelete size={20} className='cursor-pointer' onClick={() => handleDelete(item)}/>
        </div>
      </div>
        ))
      }
         {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px]">
          You not have any saved address!
        </h5>
      )}
    </div>
  )
}

const ChangePassword = () => {
// const [password, setPassword] = useState("");
const [oldPassword, setOldPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("")
const [oldVisible, setOldVisible]= useState(false)
const [newVisible, setNewVisible]= useState(false)
const [confirmVisible, setConfirmVisible]= useState(false)

const passwordChangeHandler = async (e) => {
  e.preventDefault()

  await axios
  .put(`${server}/user/update-user-password`,{
    oldPassword,
    newPassword,
    confirmPassword
  },
  {withCredentials: true}
  ).
  then((res) => {
    toast.success(res.data.success);
    setOldPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }).
  catch((error) => {
    toast.error(error?.response?.data?.message)
  })
}




return(
  <div className="w-full px-5">
  <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
    Change Password
  </h1>
  <div className="w-full">
    <form
      aria-required
      onSubmit={passwordChangeHandler}
      className="flex flex-col items-center"
    >
       <div
                        // className="flex justify-between  border px-3 py-2 w-80 border-gay-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm" 
                        className='w-[100%] 800px:w-[50%] mt-5'
                        >
                          <label className="block pb-2">Enter your old password</label>
                          <div className='flex justify-between'>
                            <input 
                            type={oldVisible ? "text" : "password"} 
                            name='password' 
                            autoComplete='current-password' 
                            required 
                            value={oldPassword} 
                            onChange={(e) => setOldPassword(e.target.value)}
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                            />

                            {
                                oldVisible ? <AiOutlineEye
                                className=' cursor-pointer'
                                size={25}
                                onClick={() => setOldVisible(false)}
                                /> :
                             <AiOutlineEyeInvisible
                            className=' cursor-pointer'
                            size={25}
                            onClick={() => setOldVisible(true)}
                            /> 
                        }
                        </div>
                        </div>
                        <div
                        // className="flex justify-between  border px-3 py-2 w-80 border-gay-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm" 
                        className=" w-[100%] 800px:w-[50%] mt-2"
                        
                        >
                          <label className="block pb-2">Enter your new password</label>
                          <div
                          className='flex justify-between'
                          >
                            <input 
                             type={newVisible ? "text" : "password"} 
                            name='password' 
                            autoComplete='current-password' 
                            required 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)}
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                            />

                            {
                                newVisible ? <AiOutlineEye
                                className=' cursor-pointer'
                                size={25}
                                onClick={() => setNewVisible(false)}
                                /> :
                             <AiOutlineEyeInvisible
                            className=' cursor-pointer'
                            size={25}
                            onClick={() => setNewVisible(true)}
                            /> 
                        }
                        </div>
                        </div>
                        <div
                        // className="flex justify-between  border px-3 py-2 w-80 border-gay-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm" 
                        className=" w-[100%] 800px:w-[50%] mt-2"
                        >
                          <label className="block pb-2">Enter your confirm password</label>
                          <div
                          className='flex justify-between'
                          >
                            <input 
                            type={confirmVisible ? "text" : "password"} 
                            name='password' 
                            autoComplete='current-password' 
                            required 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                            />

                            {
                                confirmVisible ? <AiOutlineEye
                                className=' cursor-pointer'
                                size={25}
                                onClick={() => setConfirmVisible(false)}
                                /> :
                             <AiOutlineEyeInvisible
                            className=' cursor-pointer'
                            size={25}
                            onClick={() => setConfirmVisible(true)}
                            /> 
                        }
                        </div>
                        <input
              className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
      </div>
    </form>
  </div>
</div>
)
}




export default ProfileContent