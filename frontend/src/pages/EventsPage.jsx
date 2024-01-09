import React,{useEffect} from 'react'
import EventCard from '../components/events/EventCard'
import Navbar from '../components/layout/Navbar'
import Header from '../components/layout/Header'
import { useSelector, useDispatch } from 'react-redux'
import { getAllEvents } from '../redux/actions/event'
import Loader from '../components/layout/Loader'
import { useParams } from 'react-router-dom'

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  console.log("eventPage", allEvents)
  const { id } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllEvents())
  }, [])
  
  console.log("eventPage", allEvents)
  return (
    <div>
       <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          {allEvents.map((data, i) => (
            <EventCard 
            active={true} 
            // data={allEvents && allEvents[0]} />
            data={data}/>
          ))}
          {/* <EventCard/> */}
        </div>
      )}
    </>
    </div>
  )
}

export default EventsPage