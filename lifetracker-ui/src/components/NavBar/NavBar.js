import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navbar">
      <Link to={"/"}>
        <img
          alt="lifetracker"
          src="https://www.androidguys.com/wp-content/uploads/2016/11/logo-lifetracker.png"
        />
      </Link>

      <Link to={"/activity"}>
        <p>Activity</p>
      </Link>
      <Link to={"/exercise"}>
        <p>Exercise</p>
      </Link>
      <Link to={"/nutrition"}>
        <p>Nutrition</p>
      </Link>
      <Link to={"/sleep"}>
        <p>Sleep</p>
      </Link>
      <Link to={"/login"}>
        <p>Login</p>
      </Link>

      <Link to={"register"}>
        <p>Sign up</p>
      </Link>
    </div>
  );
}
