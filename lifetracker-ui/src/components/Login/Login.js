import React from "react";
import "./Login.css";

export default function Login() {
  return (
    <div className="login">
      <form>
        <h1>Login</h1>

        <label>Email</label>
        <input type="text" placeholder="Email" />

        <label>Password</label>
        <input type="password" placeholder="Username" />

   
        <input type="submit" />
      </form>
    </div>
  );
}
