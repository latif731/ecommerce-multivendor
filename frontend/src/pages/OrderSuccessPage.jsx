import React,{useEffect, useRef} from 'react'
// import Loading from "../assets/loading.json"
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
// import Lottie from "lottie-react"
import success from "../assets/success.json"
import lottie from 'lottie-web'

const OrderSuccessPage = () => {
  return (
    <div>
      <Header/>
      <Success/>
      <Footer/>
    </div>
  )
}

const Success = () => {

  const checklist = useRef(null)

  useEffect(() => {
    lottie.loadAnimation({
      container: checklist.current,
      loop: false,
      autoplay: true,
      animationData: success
    })
  }, [])
  

  return (
    <div>
       {/* <Lottie options={defaultOptions} width={300} height={300}/> */}
       <div className="checklist" ref={checklist}></div>
       <h5 className='text-center mb-14 text-[25px] text-[#000000a1]'>
        Your order is successfull
       </h5>
       <br/>
       <br/>
    </div>
  )
} 

export default OrderSuccessPage