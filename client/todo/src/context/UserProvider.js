import React, { useState } from 'react'
import axios from 'axios'

export const UserContext = React.createContext()

export default function UserProvider(props){
    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        todos: [],
        errMsg: ""
    }

    const [userState, setUserState] = useState(initState)

    function signup(credentials){
        axios.post("/auth/signup", credentials)
        .then(res => {
            const {user, token} = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prevUserState =>({
                
                ...prevUserState,
                user,
                token
            }))
        })
        //     console.log(res))
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function login(credentials){
        axios.post("/auth/login", credentials)
        .then(res => {  const {user, token} = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prevUserState =>({
                
                ...prevUserState,
                user,
                token
            }))})
        // .catch(err => console.log(err))
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }
    
    function logout(){
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState({
            user: {},
            token:"",
            todos: []
        })
    }

    function handleAuthErr(){
        setUserState(prevState => ({
          ...prevState,
          errMsg:"Username Password Incorrect"
        }))
    }

    function resetAuthError(){
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg: ""
    }))
}

    


    return(
        <UserContext.Provider
            value={{
                ...userState,
                signup,
                login,
                logout,
                resetAuthError
            }}>
                {props.children}
        </UserContext.Provider>
    ) 
}