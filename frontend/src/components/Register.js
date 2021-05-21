import React from 'react'
import {Link} from 'react-router-dom'

function Register(props) {
    console.log("props are : ",props)
    const {
      email,
      name,
      password,
      setPassword,
      confirmPassword,
      mobile,
      setName,
      setEmail,
      setMobile,
      setconfirmPassword,
      submitHandler,
      errorMessage
    } = props;
    return (
      <>
        <form className="login" onSubmit={submitHandler}>
          <div className="loginContainerRegister">
            {errorMessage ? (
              <h1 >{errorMessage}</h1>
            ) : (
              <h1 style={{ color:'black' }}>Register</h1>
            )}

            <div>
              <label htmlFor="name">UserName</label>
              <input
                type="text"
                autoFocus
                required
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                autoFocus
                required
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="mobile">Mobile</label>
              <input
                type="number"
                maxlength="10"
                autoFocus
                required
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                autoFocus
                required
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword">Re-Enter Password</label>
              <input
                type="password"
                autoFocus
                required
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
              />
            </div>

            <div className="btnContainer">
              <button type="submit">Sign up</button>
              <p>
                Already have an account ?{" "}
                <Link to="/">
                  <span>Sign in</span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </>
    );
}

export default Register
