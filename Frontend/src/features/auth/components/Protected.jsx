import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from 'react'
import '../../interview/style/home.scss'

const Protected = ({children}) => {
    const { loading,user } = useAuth()


    if(loading){
        return (
        <main className='loading-screen'>
            <div className='loader-ring' />
            <h1>Loading...</h1>
        </main>)
    }

    if(!user){
        return <Navigate to={'/login'} />
    }
    
    return children
}

export default Protected