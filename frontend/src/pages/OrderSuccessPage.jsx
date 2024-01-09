// import React,{useEffect, useRef} from 'react'
// // import Loading from "../assets/loading.json"
// import Header from '../components/layout/Header'
// import Footer from '../components/layout/Footer'
// // import Lottie from "lottie-react"
// import success from "../assets/success.json"
// import lottie from 'lottie-web'

// const OrderSuccessPage = () => {
//   return (
//     <div>
//       <Header/>
//       <Success/>
//       <Footer/>
//     </div>
//   )
// }

// const Success = () => {

//   const checklist = useRef(null)

//   useEffect(() => {
//     lottie.loadAnimation({
//       container: checklist.current,
//       loop: false,
//       autoplay: true,
//       animationData: success
//     })
//   }, [])
  

//   return (
//     <div>
//        {/* <Lottie options={defaultOptions} width={300} height={300}/> */}
//        <div className='w-full h-screen flex items-center justify-center'>
//        <div className="checklist" ref={checklist} style={{ width: '300px', height: '300px' }}></div>
//        <h5 className='text-center mb-14 text-[25px] text-[#000000a1]'>
//         Your order is successfull
//        </h5>
//        </div>
//     </div>
//   )
// } 

// export default OrderSuccessPage

import React, { useEffect, useRef } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import lottie from 'lottie-web';
import success from '../assets/success.json';

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
  const checklist = useRef(null);

  useEffect(() => {
    // Load animation only once when the component mounts
    const animation = lottie.loadAnimation({
      container: checklist.current,
      loop: false,
      autoplay: true,
      animationData: success,
    });

    // Cleanup: Destroy the animation when the component unmounts
    return () => {
      animation.destroy();
    };
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div className='flex flex-col items-center'>
      <div>
        <div className='checklist' ref={checklist} style={{ width: '300px', height: '300px' }}></div>
      </div>
        <div>
        <h5 className='text-center mb-14 text-[25px] text-[#000000a1]'>Your order is successful</h5>
        </div>
    </div>
  );
};

export default OrderSuccessPage;
