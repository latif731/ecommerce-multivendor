import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './carousel.css';
import {toast} from "react-toastify"
import { addToCart } from '../../redux/actions/cart';
import { useSelector, useDispatch } from 'react-redux';
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import CountDown from '../events/CountDown';
import styles from '../../styles/styles';
import { Link } from 'react-router-dom';
// import { data, multiData } from './data';
// import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight  } from "react-icons/fa";

const Carousel = ({data}) => {
  let slidesToShow = 1;
  // const [width, setWidth] = useState(window.innerWidth);

  // const updateWidth = () => {
  //   setWidth(window.innerWidth);
  // };

  // useEffect(() => {
  //   window.addEventListener('resize', updateWidth);
  //   return () => window.removeEventListener('resize', updateWidth);
  // }, []);

  // if (width <= 426) {
  //   slidesToShow = 1;
  // } else if (width > 426 && width <= 769) {
  //   slidesToShow = 3;
  // } else if (width > 769 && width <= 1025) {
  //   slidesToShow = 4;
  // } else {
  //   slidesToShow = 5;
  // }
//   const multiData =[
//     {
//     image: "https://i.pinimg.com/564x/17/88/c1/1788c128adda358f2b5fa33fa6e9b0a2.jpg"
//   },
//     {
//     image: "https://i.pinimg.com/564x/17/88/c1/1788c128adda358f2b5fa33fa6e9b0a2.jpg"
//   },
//     {
//     image: "https://i.pinimg.com/564x/17/88/c1/1788c128adda358f2b5fa33fa6e9b0a2.jpg"
//   },
//     {
//     image: "https://i.pinimg.com/564x/17/88/c1/1788c128adda358f2b5fa33fa6e9b0a2.jpg"
//   },
//     {
//     image: "https://i.pinimg.com/564x/17/88/c1/1788c128adda358f2b5fa33fa6e9b0a2.jpg"
//   },
//     {
//     image: "https://i.pinimg.com/564x/17/88/c1/1788c128adda358f2b5fa33fa6e9b0a2.jpg"
//   },
//     {
//     image: "https://i.pinimg.com/564x/17/88/c1/1788c128adda358f2b5fa33fa6e9b0a2.jpg"
//   },
//     {
//     image: "https://i.pinimg.com/564x/17/88/c1/1788c128adda358f2b5fa33fa6e9b0a2.jpg"
//   },
//     {
//     image: "https://i.pinimg.com/564x/17/88/c1/1788c128adda358f2b5fa33fa6e9b0a2.jpg"
//   },
//     {
//     image: "https://i.pinimg.com/564x/17/88/c1/1788c128adda358f2b5fa33fa6e9b0a2.jpg"
//   },

// ]



  
const PreviousBtn = (props) => {
  console.log(props);
  const { className, onClick, currentSlide } = props;
  return (
    <>
      {currentSlide !== 0 && (
        <div className={className} onClick={onClick}>
          <MdArrowBackIos style={{ color: '#E3E3E3  ', fontSize: '30px', marginLeft:"7px" }} />
        </div>
      )}
    </>
  );
};
const NextBtn = (props) => {
  const { className, onClick, slideCount, currentSlide } = props;
  console.log(props);
  return (
    <>
      {currentSlide !== slideCount - slidesToShow && (
        <div className={className} onClick={onClick}>
          <MdArrowForwardIos  style={{ color: '#E3E3E3  ', fontSize: '30px' }} />
        </div>
      )}
    </>
  );
};

const carouselProperties = {
  prevArrow: <PreviousBtn />,
  nextArrow: <NextBtn />,
  slidesToShow: slidesToShow,
  slidesToScroll: 1,
  infinite: false,
  // slidesToScroll={3}
  // responsive: [
  //   {
  //     breakpoint: 426,
  //     settings: {
  //       slidesToShow: 1,
  //       centerMode: false,
  //     },
  //   },
  //   {
  //     breakpoint: 769,
  //     settings: {
  //       slidesToShow: 3,
  //       centerMode: false,
  //     },
  //   },
  //   {
  //     breakpoint: 1025,
  //     settings: {
  //       slidesToShow: 4,
  //       centerMode: false,
  //       slidesToScroll: 2,
  //     },
  //   },
  // ],
};


  return (
    <div className='carousel'>
      <Slider {...carouselProperties}>
        {data.map((data) => (
          <Card data={data} />
        ))}
      </Slider>
    </div>
  );
};

const Card = ({ data }) => {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  console.log(data._id)

    const addToCartHandler = (data) => {
      const isItemExists = cart && cart.find((i) => i?._id === data?.productId);
      if (isItemExists) {
        toast.error("Item already in cart!");
      } else {
        if (data.stock < 1) {
          toast.error("Product stock limited!");
        } else {
          const cartData = { ...data, qty: 1 };
          dispatch(addToCart(cartData));
          toast.success("Item added to cart successfully!");
        }
      }
    };
  return (
    <div className={`w-full block bg-white rounded-lg flex`}>
        <div className='w-full lg:-w[50%] m-auto'>
            {/* {data && data.imageUrl && data.imageUrl.secure_url && data.imageUrl.secure_url[0] (
                <img 
             src={data.imageUrl.secure_url[0]} 
                alt=''
                />
            )} */}
             {/* {data && data.imageUrl && data.imageUrl.length > 0 && (
          data.imageUrl.map((image, index) => (
            <img
              key={index}
              src={image.secure_url}
              alt=''
            />
          ))
        )} */}
         {data && (data.imageUrl2 && data.imageUrl2.length > 0 || data.imageUrl && data.imageUrl.length > 0) && (
          <img
            src={data?.imageUrl2[0]?.secure_url || data?.imageUrl[0]?.secure_url}
            alt=''
            
          />
        )}
        </div>
            <div className='w-full lg:[w-50%] flex flex-col justify-center'>
                <h2 className={`${styles.productTitle}`}>{data?.name}</h2>
                <p>
                    {data?.description}
                </p>
                <div className='flex py-2 justify-between'>
                    <div className='flex'>
                    <h5 className='font-[500] text-[18px] text-[#d55b45] pr-3 line-through'>
                        {data?.originalPrice}
                    </h5>
                    <h5 className='font-bold text-[20px] text-[#333] font-Roboto'>
                        {data?.discountPrice}
                    </h5>
                    </div>
                <span className='pr-3 font-[400] text-[17px] text-[#44a55e]'>
                    120 sold
                </span>
                </div>
            <CountDown data={data}/>
            <br/>

            <div className='flex'>
            <Link to={`/product/${data?.productId}`}>
                <div className={`${styles.button} text-[#fff]`}>
                  See Details
                </div>
            </Link>
                <div className={`${styles.button} text-[#fff] ml-5`}
                onClick={() => addToCartHandler(data)}
                >
                  Add to cart
                </div>
            </div>
            </div>
    </div>
  );
};   

export default Carousel;

// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import './carousel.css';
// import {toast} from "react-toastify"
// import { addToCart } from '../../redux/actions/cart';
// import { useSelector, useDispatch } from 'react-redux';
// import CountDown from '../events/CountDown';
// import styles from '../../styles/styles';
// import { Link } from 'react-router-dom';
// // import { data, multiData } from './data';
// // import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
// import { useState } from 'react';
// import { useEffect } from 'react';
// import { FaArrowCircleLeft, FaArrowCircleRight  } from "react-icons/fa";

// const Carousel = ({data}) => {
//   let slidesToShow = 1;
//   const PreviousBtn = (props) => {
//   console.log(props);
//   const { className, onClick, currentSlide } = props;
//   return (
//     <>
//       {currentSlide !== 0 && (
//         <div className={className} onClick={onClick}>
//           <FaArrowCircleLeft style={{ color: 'blue', fontSize: '30px' }} />
//         </div>
//       )}
//     </>
//   );
// };

// const NextBtn = (props) => {
//   const { className, onClick, slideCount, currentSlide } = props;
//   console.log(props);
//   return (
//     <>
//       {currentSlide !== slideCount - slidesToShow && (
//         <div className={className} onClick={onClick}>
//           <FaArrowCircleRight style={{ color: 'blue', fontSize: '30px' }} />
//         </div>
//       )}
//     </>
//   );
// };


//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1
//   };
//   return (
//         <div className='carousel'>
//       <Slider {...settings}>
//         {data.map((data) => (
//            <Card data={data} />
//          ))}
//        </Slider>
//      </div>
//   )
// }

// const Card = ({ data }) => {
//   const { cart } = useSelector((state) => state.cart)
//   const dispatch = useDispatch()
//   console.log(data._id)

//     const addToCartHandler = (data) => {
//       const isItemExists = cart && cart.find((i) => i?._id === data?.productId);
//       if (isItemExists) {
//         toast.error("Item already in cart!");
//       } else {
//         if (data.stock < 1) {
//           toast.error("Product stock limited!");
//         } else {
//           const cartData = { ...data, qty: 1 };
//           dispatch(addToCart(cartData));
//           toast.success("Item added to cart successfully!");
//         }
//       }
//     };
//   return (
//     <div className={`w-full block bg-white rounded-lg flex`}>
//         <div className='w-full lg:-w[50%] m-auto'>
//          {data && data.imageUrl2 && data.imageUrl2.length > 0 && (
//           <img
//             src={data.imageUrl2[0].secure_url}
//             alt=''
            
//           />
//         )}
//         </div>
//             <div className='w-full lg:[w-50%] flex flex-col justify-center'>
//                 <h2 className={`${styles.productTitle}`}>{data?.name}</h2>
//                 <p>
//                     {data?.description}
//                 </p>
//                 <div className='flex py-2 justify-between'>
//                     <div className='flex'>
//                     <h5 className='font-[500] text-[18px] text-[#d55b45] pr-3 line-through'>
//                         {data?.originalPrice}
//                     </h5>
//                     <h5 className='font-bold text-[20px] text-[#333] font-Roboto'>
//                         {data?.discountPrice}
//                     </h5>
//                     </div>
//                 <span className='pr-3 font-[400] text-[17px] text-[#44a55e]'>
//                     120 sold
//                 </span>
//                 </div>
//             <CountDown data={data}/>
//             <br/>

//             <div className='flex'>
//             <Link to={`/product/${data?.productId}`}>
//                 <div className={`${styles.button} text-[#fff]`}>
//                   See Details
//                 </div>
//             </Link>
//                 <div className={`${styles.button} text-[#fff] ml-5`}
//                 onClick={() => addToCartHandler(data)}
//                 >
//                   Add to cart
//                 </div>
//             </div>
//             </div>
//     </div>
//   );
// };   


// export default Carousel
