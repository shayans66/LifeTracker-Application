import React from "react";
import "./Register.css";

import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import apiClient from "../../services/apiClient";

export default function Register(props) {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [error, setError] = useState([]);

  const confirmPw = useRef("");

  async function handleOnSubmit(e) {
    e.preventDefault();
    // check if not ok
    if (!checkErrors()) return;

    const { data, error } = await apiClient.signUpUser({
      email,
      password,
      username,
      firstName,
      lastName,
    });

    if (data?.user) {
      props.setUser(data.user); // user
      apiClient.setToken(data.token); // jwt
      navigate("/activity/"); // redirect
    }
    if (error) {
      console.error(error);
      setError(error);
    }

    console.log("res", data);

    // return <Redirect to='/activity' />
  }
  // check if ok
  function checkErrors() {
    // if(!email) return false

    // console.log('a',email.indexOf('@') );

    if (email.length > 0 && email.indexOf("@") <= 0) {
      setError("Enter a valid email");
      return false;
    }

    if (confirmPw.current.value && password !== confirmPw.current.value) {
      setError("Passwords don't match");
      return false;
    }
    setError("");

    return true;
  }

  useEffect(() => {
    checkErrors();
  }, [email]);

  return (
    <div className="register">
      <form
        onSubmit={(e) => {
          handleOnSubmit(e);
        }}
      >
        <h1>Register</h1>

        <label>Email</label>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          placeholder="Email"
        />

        <label>Username</label>
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="text"
          placeholder="Username"
        />

        <div id="names">
          <input
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            type="text"
            placeholder="First name"
          />
          <input
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            type="text"
            placeholder="Last name"
          />
        </div>

        <label>Password</label>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
            checkErrors();
          }}
          type="password"
          placeholder="Password"
        />
        <label>Confirm Password</label>
        <input
          onChange={() => {
            checkErrors();
          }}
          ref={confirmPw}
          type="password"
          placeholder="Confirm Password"
        />

        <p value={error} id="error">
          {error}
        </p>

        <input type="submit" />
      </form>

      <hr />
      <p>
        Already have an account? Login <Link to={"/login"}>here</Link>
      </p>
    </div>
  );
}
