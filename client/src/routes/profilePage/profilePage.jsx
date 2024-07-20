import {  Link, useNavigate } from "react-router-dom";

import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../../lib/apiRequest";
import "./profilePage.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/Authcontext";

function ProfilePage() {

  const {updateUser, currentUser} = useContext(AuthContext)

  const navigate = useNavigate()

  

  const handlelogout = async (e) => {
    try{
      await apiRequest.post("auth/logout")
      updateUser(null);
      navigate("/")
    }catch(err){
      console.log(err);
      seterror(err.response.data.message);
    }
  }


  return (
   <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
            <button >Update Profile</button>
            </Link>
            
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser || "noavatar.jpg"}
                alt=""
              />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handlelogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <button>Create New Post</button>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat/>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
