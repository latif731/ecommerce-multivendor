import React, {useState, useEffect} from 'react'
import {AiOutlineEyeInvisible} from "react-icons/ai"
import {AiOutlineEye} from "react-icons/ai"
import styles from '../../styles/styles'
import { Link, useNavigate } from "react-router-dom"
import {RxAvatar} from "react-icons/rx"
import axios from "axios"
import { server } from '../../server'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
// import { Navigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [visible, setVisible]= useState(false)
    const [avatar, setAvatar] = useState(null)
    console.log("avatar",avatar)
    // const {isAuthenticated} = useSelector((state) => state.user)
  // console.log(password)  
  // console.log(fullName)  
  // console.log(email)  
  const handleSubmit = async (e) => {
    // console.log("ffff")
    e.preventDefault()
    
   axios.post(`http://localhost:5000/api/v2/user/create-user`, {
    name,
    email,
    password,
    avatar: avatar 
   })
    .then((res) => {
        // console.log(res)
        console.log(res)
        toast.success("user created")
        setName("");
        setEmail("");
        setPassword("");
        setAvatar(null);
    }).catch((error) => {
        console.log(error)
        // toast.error("User Already Exist")
    })
  }

  
//   const handleFileInput = (e) => {
//       const file = e.target.files[0]  
//       setAvatar(file)
//   }

const handleFileInputChange = (e) => {
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
  

//   useEffect(() => {
//     if (isAuthenticated) {
//       // Jika isAuthenticated adalah true, arahkan pengguna ke halaman utama
//       navigate('/');
//     }
//   },[isAuthenticated, navigate])
    
    // console.log("ini email",email)

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
               Register as new user
            </h2>
        </div>
        <div className='mt-8 sm:mx-auto sm:max-w-md'>
            <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
                <form className='space-y-6' onSubmit={handleSubmit}> 
                    <div>
                        <label htmlFor='' className='block text-sm font-medium text-gray-700'>
                            Full Name
                        </label>
                        <div
                        className="flex justify-between border px-3 py-2 w-80 border-gay-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm"
                        >
                        <div className='mt-1'>
                            <input 
                            type='text' 
                            name='text' 
                            autoComplete='name' 
                            required 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            className='bg-none w-72'
                            />
                        </div>
                        </div>
                    </div>
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
                            onChange={handleFileInputChange}
                            className='sr-only'
                            />
                          </label>
                        </div>
                    </div>
                    <div>
                        {/* <div className={`${styles.noramlFlex}` }>
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
                                href='.forget-passwrod'
                                className='font-medium ml-16 text-blue-600 hover:text-blue-500' 
                                >
                                    Forgot your password
                                </a>
                            </div>
                        </div> */}
                        <button
                        type='submit'
                        className='group mt-4 relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600'
                        >Asu</button>
                        <div className={`${styles.noramlFlex} w-full mt-5`}>
                            <h4>Already have an account?</h4>
                            <Link 
                            to={"/login"}
                            className="text-blue-600 pl-2"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register