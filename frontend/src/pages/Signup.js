import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import Register from '../components/Register'

function Signup(props) {

    const [errorMessage, setErrormessage] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    let childProps = {
      email: email,
      name: name,
      mobile: mobile,
      password: password,
      confirmPassword: confirmPassword,
      setName: setName,
      setEmail: setEmail,
      setMobile: setMobile,
      setPassword: setPassword,
      setconfirmPassword: setconfirmPassword,
      submitHandler: submitHandler,
      errorMessage:errorMessage
    };


    async function submitHandler(e) {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrormessage("password not matching")
        } 
        
        else {
            
            try {
            const { data } = await axios.post(
                "http://localhost:5000/user/createUser",
                { name, email, password, mobile }
            );
            console.log("inside sigin action after reciveing the data", data);
            sessionStorage.setItem("userInfo", JSON.stringify(data));
            props.history.push("/dashboard");
            } catch (err) 
            {        
                setErrormessage(err.response.data.message)
            }
        }
    }   
    return (
      <div>
        <Register {...childProps} />
      </div>
    );
}

export default Signup
