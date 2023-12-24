import React, {useState, useEffect} from 'react'
import {AiOutlineEyeInvisible} from "react-icons/ai"
import {AiOutlineEye} from "react-icons/ai"
import { RxAvatar } from 'react-icons/rx'
import styles from '../../styles/styles'
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from "react-toastify"




const ShopCreate = () => {
    const [email, setEmail] = useState("")
    console.log(email)
    const [password, setPassword] = useState("")
    console.log(password)
    const [visible, setVisible]= useState(false)
    const [name, setName] = useState("")
    console.log(name)
    const [phoneNumber, setPhoneNumber] = useState()
    console.log(phoneNumber)
    const [address, setAddress] = useState("")
    console.log(address)
    const [zipCode, setZipCode] = useState()
    console.log(zipCode)
    const [avatar, setAvatar] = useState(null)
    console.log(avatar)
   const navigate = useNavigate()

    const handleSubmit = async (e) => {
        // console.log("ffff")
        e.preventDefault()


       axios.post(`http://localhost:5000/api/v2/shop/create-shop`,{
        name,
        email,
        password,
        phoneNumber,
        address,
        zipCode,
        avatar
       })
        .then((res) => {
            // console.log(res)
            console.log(res)
            // toast.success(res.data.message)
            setName("");
            setEmail("");
            setPassword("");
            setAvatar(null);
            setZipCode()
            setAddress("")
            setPhoneNumber()
        }).catch((err) => {
            // console.log(err)
            toast.error("User Already Exist")
        })
      }

      const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setAvatar(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };

      useEffect(() => {
        console.log('After setAvatar:', avatar);
      }, [avatar])
      

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                Register as Seller
            </h2>
        </div>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-[30rem]'>
            <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
                <form className='space-y-6' onSubmit={handleSubmit}> 
                    <div>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
                          Shop Name
                        </label>
                        <div
                        className="flex justify-between border px-3 py-2 w-90 border-gay-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm"
                        >
                        <div className='mt-1'>
                            <input 
                            type='name' 
                            name='name' 
                            // autoComplete='shopName' 
                            required 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            className='bg-none w-72'
                            />
                        </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
                         Phone Number
                        </label>
                        <div
                        className="flex justify-between border px-3 py-2 w-90 border-gay-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm"
                        >
                        <div className='mt-1'>
                            <input 
                            type='number' 
                            // name='phone-number' 
                            // autoComplete='phoneNumber' 
                            required 
                            value={phoneNumber} 
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className='bg-none w-72'
                            />
                        </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
                             Address
                        </label>
                        <div
                        className="flex justify-between border px-3 py-2 w-90 border-gay-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm"
                        >
                        <div className='mt-1'>
                            <input 
                            type='address' 
                            name='address' 
                            // autoComplete='address' 
                            required 
                            value={address} 
                            onChange={(e) => setAddress(e.target.value)}
                            className='bg-none w-72'
                            />
                        </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
                             Zip Code
                        </label>
                        <div
                        className="flex justify-between border px-3 py-2 w-90 border-gay-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm"
                        >
                        <div className='mt-1'>
                            <input 
                            type='number' 
                            name='zipCode' 
                            // autoComplete='address' 
                            required 
                            value={zipCode} 
                            onChange={(e) => setZipCode(e.target.value)}
                            className='bg-none w-72'
                            />
                        </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
                            Email address
                        </label>
                        <div
                        className="flex justify-between border px-3 py-2 w-90 border-gay-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm"
                        >
                        <div className='mt-1'>
                            <input 
                            type='email' 
                            name='email' 
                            autoComplete='email' 
                            required 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            className='bg-none w-72'
                            />
                        </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                            Password
                        </label>
                        <div className='mt-1'>
                        <div
                        className="flex justify-between  border px-3 py-2 w-90 border-gay-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm" >
                            <input 
                            type={visible ? "text" : "password"} 
                            name='password' 
                            autoComplete='current-password' 
                            required 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-72'
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
                    <div>
                        <label 
                        htmlFor='avatar'
                        className='block text-sm font-medium text-gray-700'
                        > 
                        </label>
                        <div className='mt-2 flex items-center'>
                          <span className='inline-block h-8 w-8 rounded-full overflow-hidden'>
                            {
                              avatar ? 
                              <img src={avatar instanceof File ? URL.createObjectURL(avatar) : avatar} alt='avatar' className='h-full w-full object-cover rounded-full'/> 
                              : 
                              <RxAvatar className='w-8 h-8'/>
                            }
                          </span>
                          <label 
                          htmlFor='file-input'
                          className='ml-5 flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray'
                          >
                            <span>Upload a file</span>
                            <input 
                            type='file' 
                            name='avatar' 
                            id="file-input" 
                            accept='.jpg,.jpeg,.png'
                            onChange={handleFileInput}
                            className='sr-only'
                            />
                          </label>
                        </div>
                    </div>
                    <div>
                        <div className={`${styles.noramlFlex}` }>
                            <input 
                            type='checkbox' 
                            name='remember-me' 
                            id='remember-me'
                            className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                            />
                            <label 
                            htmlFor='remember-me'
                            className='block ml-2 text-sm text-gray-900'
                            >
                                Remember me
                            </label>
                            <div className='text-sm'>
                                <a
                                href='.forget-password'
                                className='font-medium ml-16 text-blue-600 hover:text-blue-500' 
                                >
                                    Forgot your password
                                </a>
                            </div>
                        </div>
                        <button
                        type='submit'
                        className='group mt-4 relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600'
                        >Asu</button>
                        <div className={`${styles.noramlFlex} w-full mt-5`}>
                            <h4>Already have an account ?</h4>
                            <Link 
                            to={"/shop-login"}
                            className="text-blue-600 pl-2"
                            >
                                Sign in
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ShopCreate