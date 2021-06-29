import React from "react";
import "./Login.css";
import { useState } from "react";
import apiClient from "../../services/apiClient";


export default function Login() {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  

  const handleOnSubmit = (e) => {
    e.preventDefault()
    // if(!checkErrors())
    //   return

    const res = apiClient.loginUser({
      email,
      password
    })
    console.log(res.data);

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

   
        <input type="submit" />
      </form>
    </div>
  );
}
