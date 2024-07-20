import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";

import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/Authcontext";

function Login() {

  const [error, seterror] = useState("")
  const [isloading, setisloading] = useState(false)
  const navigate = useNavigate()

  const {updateUser} = useContext(AuthContext)

  const handlesubmit = async (e) => {
    e.preventDefault();
    setisloading(true);
    const formData = new FormData(e.target);
    
    const username = formData.get("username")
    const password = formData.get("password")
      try{

        const res = await apiRequest.post("/auth/login", {username, password })
        updateUser(res.data);
        navigate("/")

      }catch(err){
        console.log(err);
        seterror(err.response.data.message);
      }finally{
        setisloading(false)
      }


    };
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handlesubmit}>
          <h1>Welcome back</h1>
          <input name="username" required maxLength={20} minLength={3} type="text" placeholder="Username" />
          <input name="password" type="password"required placeholder="Password" />
          <button disabled={isloading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
