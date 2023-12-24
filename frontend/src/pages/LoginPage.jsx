import React, { useEffect } from 'react'
import Login from '../components/Login/Login'
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const { isAuthenticated } = useSelector((state) => state.user)
  console.log(isAuthenticated)
  // const isAuthenticated = true
  const navigate = useNavigate()
  

  useEffect(() => {
    if(isAuthenticated === true){
      navigate("/")
    }
  },[isAuthenticated, navigate])
  return (
    <div className='w-full h-screen bg-gray-50'>
      {!isAuthenticated && (  
        <Login/> 
      )}
    </div>
  )
}

export default LoginPage