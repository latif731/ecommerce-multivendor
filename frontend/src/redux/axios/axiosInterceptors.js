import axios from "axios";
import store from "../store";
import { refreshAccessToken } from "../actions/user";


const Axios = axios.create()

Axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if(error.response && error.response.status === 401) {
            originalRequest._retry = true;
            try{
               const newAccessToken = await store.dispatch(refreshAccessToken())
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                return Axios(originalRequest)
            }catch(refreshError){
                console.error("Failed to refresh token", refreshError)
            }
        }

        return Promise.reject(error)
    }
)

export default Axios;