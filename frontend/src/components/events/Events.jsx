import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styles from '../../styles/styles'
import EventCard from "./EventCard";
import { getAllEvents } from '../../redux/actions/event';
import Carousel from '../carousel/Carousel';

const Events = () => {
  const {allEvents,isLoading} = useSelector((state) => state.events);
  // console.log("allEvents in events", allEvents)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllEvents())
  }, [])

  const carouselItems = [
    { image: 'https://img.freepik.com/free-vector/ordering-goods-online-internet-store-online-shopping-niche-e-commerce-website-mother-buying-babies-clothes-footwear-toys-infant-accessories_335657-2345.jpg?w=2000', alt: 'Image 1' },
    { image: 'https://img.freepik.com/free-vector/ordering-goods-online-internet-store-online-shopping-niche-e-commerce-website-mother-buying-babies-clothes-footwear-toys-infant-accessories_335657-2345.jpg?w=2000', alt: 'Image 2' },
    { image: 'https://img.freepik.com/free-vector/ordering-goods-online-internet-store-online-shopping-niche-e-commerce-website-mother-buying-babies-clothes-footwear-toys-infant-accessories_335657-2345.jpg?w=2000', alt: 'Image 3' },
  ];
  
   
  return (
    <div>
     {
      !isLoading && (
        <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1>Popular Events</h1>
      </div>
      {
        allEvents?.length !== 0 && (
        <Carousel data={allEvents}/>
        )
      }
      <div className="w-full grid">
         {/* {
          allEvents?.length !== 0 && (
            <EventCard data={allEvents && allEvents[0]} />
          )
         } */}
         <h4 className='text-center'>
          {
           allEvents?.length === 0 && (
            <span className="text-[red] text-[25px]">No Events Found</span>
           )
          } 
         </h4>
      </div>
     
    </div>
      )
     }
     {/* <EventCard data={allEvents}/> */}
  </div>
  )
}

export default Events