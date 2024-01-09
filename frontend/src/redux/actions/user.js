import axios from "axios"
import { server } from "../../server";
import {toast} from "react-toastify"


// refreshToken
export const refreshAccessToken = () =>  async (dispatch) => {
    try{
        const {data} = await axios.post(`${server}/user/refresh-token`,{}, {withCredentials: true})
        console.log("ini refresh token", data)
        dispatch({
            type:"refreshAccessTokenSuccess",
            payload: data.accessToken,
        })
    }catch(error){
        console.error("Failed to refresh access token", error)
        dispatch({
            type:"refreshTokenFail",
            payload: error.response.data.message
        })
    }
}

// authActions.js

// export const refreshAccessToken = () => async (dispatch) => {
//   try {
//     const response = await axios.post(
//       'http://localhost:5000/api/v2/user/refresh-token',
//       {},
//       { withCredentials: true }
//     );

//     // Assuming your server returns a new access token
//     const newAccessToken = response.data.accessToken;

//     // Dispatch an action to update the user's access token in the Redux store
//     dispatch({ type: 'refreshAccessTokenSuccess', payload: newAccessToken });

//     return newAccessToken;
//   } catch (error) {
//     console.error('Refresh Token Error', error);
//     throw error; // Rethrow the error so that the interceptor can catch it
//   }
// };




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
        // console.log("action", data)
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
export const updateUserInformation = (name, email, phoneNumber, password, currentPassword) => async(dispatch, action) => {
    try{
        dispatch({
            type: "updateUserInfoRequest"
        })
    
        const {data} = await axios.put(`${server}/user/update-user-info`,{
            name,
            email,
            phoneNumber,
            password,
            // currentPassword
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


// update user address 
export const updateUserAddress = (
    country,
    city,
    address1,
    address2,
    zipCode,
    addressType
) => async(dispatch) => {
    try{
        dispatch({
            type: "updateUserAddressRequest"
        })
        const { data } = await axios.put(`${server}/user/update-user-addresses`,{
            country,
            city,
            address1,
            address2,
            zipCode,
            addressType
        },{withCredentials: true})

        dispatch({
            type:"updateUserAddressSuccess",
            payload: {
                successMessage: "User address updated succesfully!",
                user: data.user,
            }
        })

    }catch(error){
        dispatch({
            type: "updateUserAddressFailed",
            payload: error.response.data.message
        })
    }
}

// delete user address
// export const deleteUserAddress = (id) => async(dispatch) => {
//     try{
//         dispatch({
//             type:"deleteUserAddressRequest",
//         })
//         const { data } = await axios.delete(`${server}/user/delete-user-address/${id}`, {
//             withCredentials: true
//         }) 
//         dispatch({
//             type: "deleteUserAddressSuccess",
//             payload: {
//                 successMessage: "User address deleted succesfully!",
//                 user: data.user,
//             }
//         })
//     }catch(error){
//         dispatch({
//             type: "deleteUserAddressFailed",
//             payload: error.response.data.message
//         })
//     }
// }
export const deleteUserAddress = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "deleteUserAddressRequest",
      });
  
      const { data } = await axios.delete(
        `${server}/user/delete-user-address/${id}`,
        { withCredentials: true }
      );
  
      dispatch({
        type: "deleteUserAddressSuccess",
        payload: {
          successMessage: "User deleted successfully!",
          user: data.user,
        },
      });
    } catch (error) {
      dispatch({
        type: "deleteUserAddressFailed",
        payload: error.response.data.message,
      });
    }
  };