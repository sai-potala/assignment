import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useState } from "react";
import { withRouter } from "react-router-dom";

function Login(props) {

    const [errorMessage, setErrormessage] = useState();
    console.log(errorMessage);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = async (e) => {
      console.log("came here");
      e.preventDefault();
      try {
        console.log("came above post call axios");
        const { data } = await axios.post("http://localhost:5000/user/signin", {
          email,
          password,
        });
        sessionStorage.setItem("userInfo", JSON.stringify(data));
        sessionStorage.setItem("token", JSON.stringify(data.token));
        props.history.push("/dashboard")
      } catch (error) {
        setErrormessage(error.response.data.message);
      }
    };
    return (
      <form action="" className="login" onSubmit={submitHandler}>
        <div className="loginContainer">
          {errorMessage && (
            <div>
              <h1 style={{ color: "Red" }}>{errorMessage}</h1>
            </div>
          )}
          <h1 style={{ textAlign: "center" }}>Login</h1>

          <label htmlFor="email">UserEmail</label>
          <input
            type="email"
            autoFocus
            required
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            autoFocus
            required
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="btnContainer">
            <button>Sign up</button>
            <p>
              Don't have an account ?
              <Link to="/signup">
                {" "}
                <span>Sign up</span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    );
}

export default withRouter(Login);
