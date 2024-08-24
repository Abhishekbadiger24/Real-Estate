import jwt from "jsonwebtoken";

export const verifyToken  = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token)
    if(!token) return res.status(401).json({message: "not login"});
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) =>{
        if(err) return res.status(403).json({message: "token is invalid"})
            req.userId = payload.id;
    })
    next();
  
    
}