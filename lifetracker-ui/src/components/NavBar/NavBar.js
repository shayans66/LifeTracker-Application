import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import apiClient from "../../services/apiClient";
import { useState } from "react";

export default function NavBar(props) {


  // console.log('islgedin',Object.keys(props.user).length > 0);

  // console.log('user',props.user);
  // console.log('user',Object.keys(props.user));

  function handleLogOut(){
    // local storage
    const tokenName = apiClient.getTokenName()
    localStorage[tokenName] = ''

    // erase user
    props.setUser({})

  }

  return (
    <div className="navbar">
      <Link to={"/"}>
        <img
          alt="lifetracker"
          src="https://www.androidguys.com/wp-content/uploads/2016/11/logo-lifetracker.png"
        />
      </Link>

      <p>
        <Link to={"/activity"}>Activity</Link>
      </p>

      <p>
        <Link to={"/exercise"}>Exercise</Link>
      </p>
      <p>
        <Link to={"/nutrition"}>Nutrition</Link>
      </p>
      <p>
        <Link to={"/sleep"}>Sleep</Link>
      </p>

      {( Object.keys(props.user).length > 0 ) ? (
        <Link to={"/"}>
          <p onClick={() => {handleLogOut()}}>Logout</p>
        </Link>
      ) : (
        <>
          <Link to={"/login"}>
            <p>Login</p>
          </Link>
          <Link to={"register"}>
            <p>Sign up</p>
          </Link>
        </>
      )}
    </div>
  );
}
