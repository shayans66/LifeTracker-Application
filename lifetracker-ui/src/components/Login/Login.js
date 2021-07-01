import React from "react";
import "./Login.css";
import { useState } from "react";
import apiClient from "../../services/apiClient";

import { useNavigate } from "react-router";


export default function Login(props) {
  const navigate = useNavigate()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    // if(!checkErrors())
    //   return



    const {data, error} = await apiClient.loginUser({
      email,
      password
    })
    console.log('data',data);
    if(data?.user){
      // console.log('chaing user',data.user);
      props.setUser(data.user)
      
      apiClient.setToken(data.token)
      
      props.fetchExercises()

      navigate('/activity')

    }else if(error){
      setError(error)
    }


  }
  // const checkErrors = () => {

  // }
  return (
    <div className="login">
      <form onSubmit={(e) => {handleOnSubmit(e)} } >

        <h1>Login</h1>

        <label>Email</label>
        <input value={email} onChange={(e) => {setEmail(e.target.value)}} type="text" placeholder="Email" />

        <label>Password</label>
        <input value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="Username" />

        <p value={error}></p>
    
        <input type="submit" />

        <hr/>
        <p>Don't have an account? Register <a href="/register">here</a></p>
      </form>
    </div>
  );
}
