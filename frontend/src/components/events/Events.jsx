import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styles from '../../styles/styles'
import EventCard from "./EventCard";
import { getAllEvents } from '../../redux/actions/event';

const Events = () => {
  const {allEvents,isLoading} = useSelector((state) => state.events);
  console.log("allEvents in events", allEvents)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllEvents())
  }, [])
  
   
  return (
    <div>
     {
      !isLoading && (
        <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1>Popular Events</h1>
      </div>

      <div className="w-full grid">
         {
          allEvents?.length !== 0 && (
            <EventCard data={allEvents && allEvents[0]} />
          )
         }
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