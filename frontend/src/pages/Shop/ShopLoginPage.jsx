import React, {useEffect} from 'react'
import ShopLogin from '../../components/shoplogin/ShopLogin'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ShopLoginPage = () => {
  const navigate = useNavigate()
  const {isLoading, isSellerAuthenticated, seller} = useSelector((state) =>  state.seller)
  console.log(seller)
  useEffect(() => {
    if(isSellerAuthenticated === true) {
      navigate(`/dashboard`)
    }
  }, [isLoading, isSellerAuthenticated])
  

  return (
    <div>
        <ShopLogin/>
    </div>
  )
}

export default ShopLoginPage