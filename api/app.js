import express from "express";
import authroute from "./routes/authroute.js";
import postroute from "./routes/postroute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import testrouter from "./routes/textroute.js";
import userrouter from "./routes/userroute.js";
import chatrouter from "./routes/chatroute.js";
import messagerouter from "./routes/messageroute.js";

const app = express();


app.use(cors({ origin: process.env.CLIENT_URL, credentials: true}))
app.use(express.json());
app.use(cookieParser());

app.use("/api/test",testrouter)
app.use("/api/auth",authroute);
app.use("/api/post", postroute)
app.use("/api/users", userrouter)
app.use("/api/chats", chatrouter)
app.use("/api/messages", messagerouter)


app.listen(8000, () => {
    console.log("server is running" );
});