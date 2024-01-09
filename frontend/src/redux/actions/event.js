import { server } from "../../server";
import axios from "axios"

// create event
export const createEvent = (newForm) => async (dispatch) => {
    try{
        dispatch({
            type:"eventCreateRequest",
        })

        const config = {headers:{"Content-Type":"multipart/form-data"}};

        const {data} = await axios.post(
            `${server}/event/create-event`,
            newForm,
            config
        );
        dispatch({
            type:"eventCreateSuccess",
            payload: data.event,
            
        })

    }catch (error) {
        dispatch({
            type: "eventCreateFail",
            payload: error.response.data.message
        })
    }
}


// get all events
export const getAllEventsShop = (id) => async(dispatch) => {
    try{
        dispatch({
            type: "getAlleventsShopRequest",
        })
        const {data} = await axios.get(`http://localhost:5000/api/v2/event/get-all-event/${id}`)
        console.log("data",data)
        dispatch({
            type: "getAlleventsShopSuccess",
            payload: data.events
        })
    }catch(error){
        dispatch({
            type: "getAlleventsShopFailed",
            payload: error.response.data.message
        })
    }
}

// delete product of shop
export const deleteEvent = (id) => async (dispatch) => {
    try{
        dispatch({
            type: "deleteEventRequest"
        })
        const {data} = await axios.delete(`${server}/event/delete-shop-event/${id}`,{
            withCredentials: true
        })

        dispatch({
            type:"deleteEventSuccess",
            payload: data.message
        })
    }catch(error){
        dispatch({
            type: "deleteEventFailed",
            payload: error.response.data.message
        })
    }
}

// get all events
export const getAllEvents = () =>  async (dispatch) => {
    try{
        dispatch({
            type: "getAlleventsRequest"
        })

        const {data} = await axios.get(`${server}/event/get-all-events`);
        // console.log("event",data)
        dispatch({
            type:"getAlleventsSuccess",
            payload: data.events
        })
    }catch(error){
        dispatch({
            type: "getAlleventsFailed",
            payload: error.response.data.message
        })
    }
}



