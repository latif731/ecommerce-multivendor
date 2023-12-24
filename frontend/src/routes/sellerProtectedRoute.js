import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/layout/Loader";


const SellerProtectedRoute = ({children}) => {
    const {isLoading, isSellerAuthenticated} = useSelector((state) =>  state.seller)

    const [showLoader, setShowLoader] = useState(isLoading)

    useEffect(() => {
        if(isLoading) {
            const timer = setTimeout(() => {
                setShowLoader(false)
            },3000)
            return () =>  clearTimeout(timer)
        }
    }, [])

    if(showLoader) {
        return <Loader/>
    }else{
        if(!isSellerAuthenticated) {
            return <Navigate to={`/shop-login`} replace/>
        }
        return children
    }
}

export default SellerProtectedRoute

