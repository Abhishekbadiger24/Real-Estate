import "./register.scss";
import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import apiRequest from "../../lib/apiRequest.js";


function Register() {

  const [error, seterror] = useState("")
  const navigate = useNavigate();


  const handlesubmit = async (e) => {

    e.preventDefault();
    const formData = new FormData(e.target);

    const username = formData.get("username")
    const email = formData.get("email")
    const password = formData.get("password")
    console.log(username, password, email);
      try{
        const res = await apiRequest.post("auth/register", {username, email, password })
        
        navigate("/login")
      }catch(err){
        console.log(err);
        seterror(err.response.data.message);
      }


    };


  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handlesubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button type="submit">Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
