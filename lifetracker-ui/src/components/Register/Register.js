import React from 'react'
import './Register.css'

import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <div className="register">

      <form>

        <h1>Register</h1>

        <label>Email</label>
        <input type="text" placeholder="Email" />

        <label>Username</label>
        <input type="text" placeholder="Username"/>


        <div id="names">
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
        </div>

        <label>Password</label>
        <input type="password" placeholder="Password"/>
        <label>Confirm Password</label>
        <input type="password" placeholder="Confirm Password"/>

        <input type="submit" />

      </form>

      <hr />
      <p>Already have an account? Login <Link to={'/login'}>here</Link></p>

    </div>
  )
}
