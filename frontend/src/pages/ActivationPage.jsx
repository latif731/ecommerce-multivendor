import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { server } from '../server'

const ActivationPage = () => {
    const {activation_token} = useParams()
    const [error, setError] = useState()

    useEffect(() => {
        if(activation_token) {
            const sendRequest = async () => {
                await axios.post(`http://localhost:5000/api/v2/user/activation`, {
                        activation_token,
                    }).then((res) => {
                        console.log(res)
                    }).catch((err) => {
                        console.log(true)
                    })
                
            } 
            sendRequest()
        }
    }, [])
    
  return (
    <div style={{
        width:"100%",
        height: "100vh",
        display:'flex',
        justifyContent : 'center',
        alignItems:"center"
    }}>
        {
            error ?  (<p>Your token is expired!</p>) : (<p>Your account has been created successfully</p>)
        }
    </div>
  )
}

export default ActivationPage 