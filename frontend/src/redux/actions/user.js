import axios from "axios"
import { server } from "../../server";
import {toast} from "react-toastify"

// load user
export const loadUser = () => async(dispatch) => {
    try{
        const {data} = await axios.get(`${server}/user/get-user`, {withCredentials:true});
        dispatch({
            type: "loadUserRequest"
        });
        dispatch({
            type: "loadUserSuccess",
            payload: data.user
        });
    }catch(error){
        dispatch({
            type: "loadUserFail",
            payload: error.response.data.message
        })
    }
}





// load seller
export const loadSeller = () => async(dispatch) => {
    try{
        const {data} = await axios.get(`${server}/shop/getSeller`, {withCredentials:true});
        console.log("action", data)
        dispatch({
            type: "loadSellerRequest"
        });
        dispatch({ 
            type: "loadSellerSuccess",
            payload: data?.seller
        });
    }catch(error){
        dispatch({
            type: "loadSellerFail",
            payload: error.response.data.message
        })
    }
}

// user update information
export const updateUserInformation = (name, email, phoneNumber, password) => async(dispatch, action) => {
    try{
        dispatch({
            type: "updateUserInfoRequest"
        })
    
        const {data} = await axios.put(`${server}/user/update-user-info`,{
            email,
            password,
            phoneNumber,
            name
        },{
            withCredentials:true,
            headers: {
                "Access-Control-Allow-Credentials": true,
              },
        });
    
        dispatch({
            type: "updateUserInfoSuccess",
            payload: data.user,
        })

    }catch(error){
        console.error("API Request Error", error);
        toast.error("An error occurred. Please try again")
        dispatch({
            type:"updateUserInfoFiled",
            payload: error.response.data.message
        })
    }
}