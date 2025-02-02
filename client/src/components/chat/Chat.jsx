import { useContext, useEffect, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/Authcontext";
import apiRequest from "../../lib/apiRequest.js";
import { format } from "timeago.js"
import { SocketContext } from "../../context/socketContext";

function Chat(chats) {
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext)
  const {socket} =useContext(SocketContext)

// console.log(socket)

  const handlechat = async (id, reciever) => {
    try {
      const res = await apiRequest("/chats/" + id)
      setChat({ ...res.data, reciever })

    } catch (err) {
      console.log(err)
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData(e.target);
    const text = formdata.get("text")

    if (!text) return;
    try {
      const res = await apiRequest.post("/messages/" + chat.id, { text })

      
      setChat(prev => ({ ...prev, messages: [...prev.messages, res.data] }))
      e.target.reset()
      console.log(chat.messages)
      socket.emit("sendMessage", {
          recieverId: chat.reciever.id,
          data:res.data
        })
    } catch (err) {
      console.log(err)
    }
  }


   useEffect(() => {

    const read = async ()=> {
      try{
        await apiRequest.put("/chats/read/" + chat.id)
      }catch(err) {
        console.log(err)
      }
    }
    if(chat && socket) {
      socket.on("getMessage", (data) => {
        if(chat.id === data.chatId){
          setChat( prev => ({...prev,messages: [...prev.messages, data]}))
          read()
        }
      })
    }
   },[socket, chat])
  return (
    <div className="chat">
 
      <div className="messages">
        <h1>Messages</h1>

        {
          chats.chats?.map((c) => (
       
            
            <div className="message"
              key={c.id} 
              style={{backgroundColor: c.seenBy.includes(currentUser.id) || chat?.id === c.id ? "white" : "#fecd514e"}} 
              onClick={() => handlechat(c.id, c.reciever)}
            >
              <img
                src={c.reciever.avatar || null}
                alt=""
              /> 
              <span>{c.reciever.username}</span>
              <p>Lorem ipsum dolor sit amet...</p>

            </div>
          ))
        }
      </div>

      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img
                src={chat.reciever.avatar || "/noavatar.jpg"}
                alt=""
              />
              {chat.reciever.username}
            </div>
            <span className="close" onClick={() => setChat(null)}>X</span>
          </div>
          <div className="center">
            {chat.messages.map((message) => (

              <div className="chatMessage" key={message.id} style={{
                alignSelf: message.userId === currentUser.id ? "flex-end" : "flex-start",
                textAlign: message.userId === currentUser.id ? "right" : "left"

              }}>
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
          </div>
          <form 
          onSubmit={handleSubmit} 
          className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
