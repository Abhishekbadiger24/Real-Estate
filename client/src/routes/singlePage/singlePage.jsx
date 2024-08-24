import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { singlePostData, userData } from "../../lib/dummydata";
import { useLoaderData, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/Authcontext";
import apiRequest from "../../lib/apiRequest.js";

function SinglePage() {

  const details = useLoaderData()
  const [saved, setsaved] = useState(details.isSaved )
  const {currentUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleClick = async () => {
    setsaved((prev) => !prev)
    
    if(!currentUser){
      navigate("/login")
    }
    try{
      
      await apiRequest.post("/users/save", {postId : details.id})
    }catch(err) {
      console.log(err)
      setsaved((prev) => !prev)
    }
  }
 
  console.log(details);
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={details.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{details.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{details.address}</span>
                </div>
                <div className="price">$ {details.price}</div>
              </div>
              <div className="user">
                <img src={details.user.avatar} alt="" />
                <span>{details.user.username}</span>
              </div>
            </div>
            <div className="bottom" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(details.postDetail.desc)}}></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                <p>{details.postDetail.utilities}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                <p>{details.postDetail.pet}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Property Fees</span>
                <p>{details.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{details.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{details.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{details.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>{details.postDetail.school}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{details.postDetail.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{details.postDetail.restaurant}m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[details]} />
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />e
              Send a Message
            </button>
            <button onClick={handleClick} style={{
              backgroundColor: saved ? "white" : "#fece51" ,
            }}>
              <img src="/save.png" alt="" />
              {saved ?"saved the place": "please save it"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
