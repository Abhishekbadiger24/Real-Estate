import jwt from "jsonwebtoken";
export const handleShouldbeLoggedin = async (req,res) => {
    console.log(req.userId);
}

export const handleShouldbeAdmin = async (req,res) => {
    const token = req.cookies.token;

    if(!token) return res.status(401).json({message: "not login"});
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) =>{
        if(err) return res.status(403).json({message: "token is invalid"})
            if(!payload.isAdmin){
                return res.status(403).json({ message: "not a admin"})
            }
    })
    
}