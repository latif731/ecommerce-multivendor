import React, {useState, useEffect} from 'react'
import {AiOutlineEyeInvisible} from "react-icons/ai"
import {AiOutlineEye} from "react-icons/ai"
import styles from '../../styles/styles'
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from "react-toastify"




const ShopLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [visible, setVisible]= useState(false)
   const navigate = useNavigate()
//    useEffect(() => {
//     if (isAuthenticated) {
//       // Jika isAuthenticated adalah true, arahkan pengguna ke halaman utama
//       navigate('/');
//     }
//   },[isAuthenticated, navigate])

    
    // console.log("ini email",email)

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post(`http://localhost:5000/api/v2/shop/login-shop`, {
            email,
            password
        }, {withCredentials:true}).then((res) => {
            toast.success("Login Success!");
            navigate("/dashboard")
            window.location.reload(true)
        }).catch((err) => {
            toast.error("Wrong email or password")
        })
    }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                Login to your shop
            </h2>
        </div>
        <div className='mt-8 sm:mx-auto sm:max-w-md'>
            <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
                <form className='space-y-6' onSubmit={handleSubmit}> 
                    <div>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                            Email address
                        </label>
                        <div
                        className="flex justify-between border px-3 py-2 w-80 border-gay-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm"
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
                        className="flex justify-between  border px-3 py-2 w-80 border-gay-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm" >
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
                            <h4>Not have any account?</h4>
                            <Link 
                            to={"/shop-create"}
                            className="text-blue-600 pl-2"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ShopLogin