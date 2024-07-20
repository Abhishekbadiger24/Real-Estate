import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/Authcontext";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/uploadWidget";

function ProfileUpdatePage() {

  const {updateUser, currentUser} = useContext(AuthContext)

  const [error,seterror] = useState("")
  const [avatar,setavatar] = useState([])

  
  const navigate = useNavigate()


    const handleSubmit = async (e) => {
      e.preventDefault()

      const formdata = new FormData(e.target);
      console.log(currentUser)

      const {username, email , password} = Object.fromEntries(formdata);
      try{
        const res = await apiRequest.put(`/users/${currentUser.id}`,{username,email,password,avatar: avatar[0]})

        updateUser(res.data)
        navigate("/profile")
      }catch(err){
        seterror(err.response.data.message);
        console.log(err);
      }

    }

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar[0] || currentUser.avatar || "/noavatar.jpg"} alt="" className="avatar" />
        <UploadWidget uwConfig={
         { 
          cloudName:"dbw7ovkbr"
          ,uploadPreset: "estate",
          multiple: false,
          maxImageFileSize:200000,
          folder: "avatars"
         }
        }
        setState = {setavatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
