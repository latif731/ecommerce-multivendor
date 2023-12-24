// import React,{useEffect, useRef} from 'react'
// import Loading2 from "../../assets/loading2.json"
// import lottie from "lottie-web"

// const Loader = () => {

//   const container = useRef(null)

//   useEffect(() => {
//     lottie.loadAnimation({
//       container: container.current,
//       loop: false,
//       autoplay: true,
//       animationData: Loading2
//     })
//   }, [])
  


//   return (
//     <div className='w-full h-screen flex items-center justify-center'>
//         <div className="container" ref={container} style={{width:"300px", height:"300px"}}></div>
//     </div>
//   )
// }

// export default Loader

import React, { useEffect, useRef } from 'react';
import Loading2 from '../../assets/loading2.json';
import lottie from 'lottie-web';

const Loader = () => {
  const container = useRef(null);
  const animation = useRef(null);

  useEffect(() => {
    // Check if the animation is already initialized
    if (!animation.current) {
      // Load animation
      animation.current = lottie.loadAnimation({
        container: container.current,
        loop: false,
        autoplay: true,
        animationData: Loading2,
      });
    }

    // Clean up the animation when the component is unmounted
    return () => {
      if (animation.current) {
        animation.current.destroy();
        animation.current = null;
      }
    };
  }, []); // Empty dependency array to ensure it runs only once on mount

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='container' ref={container} style={{ width: '300px', height: '300px' }}></div>
    </div>
  );
};

export default Loader;
