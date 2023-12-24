import React, {useEffect} from 'react'
import Register from '../components/SignUp/Register'
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const SignUpPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if(isAuthenticated === true){
      navigate("/");
    }
  }, [isAuthenticated, navigate])

  return (
    <div>
      {
        !isAuthenticated && (
        <Register />
        )
      }
    </div>
  )
}

export default SignUpPage