import express from "express";
import authroute from "./routes/authroute.js";
import postroute from "./routes/postroute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import testrouter from "./routes/textroute.js";
const app = express();


app.use(cors({ origin: process.env.CLIENT_URL, credentials: true}))
app.use(express.json());
app.use(cookieParser());

app.use("/api/test",testrouter)
app.use("/api/auth",authroute);
app.use("/api/post", postroute)
app.listen(8000, () => {
    console.log("server is running" );
});