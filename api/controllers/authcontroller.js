
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken"

export const handleRegister = async (req, res) => {
    const {username, email, password} = req.body;

   try{
    
    const hashedPAssword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPAssword
        }
    })
    console.log(newUser);

    res.status(201).json({message: "done successfully"})


    }catch(err){
        console.log(err);
        res.status(500).json({message: "error"})
    }
}


export const handleLogin = async (req, res) => {
    const {username,  password} = req.body;
    console.log(username)
    try{

        //check if user exist
        const user = await prisma.user.findUnique({
            where: { username: username },
        });

        if(!user) return res.status(401).json({ message: "Invalid crendendials!" })

    //check if the password is correct 

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) return res.status(401).json({ message: "Invalid Credencials!" })

    //generate the cookie token and send to  the user
        const age = 1000 * 60 * 60 * 24 * 7;

        const token = jwt.sign({
            id: user.id,
            isAdmin:true
        },process.env.JWT_SECRET, { expiresIn:age })

        
        const {password: userPassword, ...userInfo} = user

        res.cookie("token", token, {
            httpOnly: true,
            // secure: true
            maxAge: age
        }).status(200).json(userInfo)

    }catch (err) {
        console.log(err);
        res.status(500).json({message: "failed to login"})
    }


}


export const handleLogout = (req, res) => {
    res.clearCookie("token").status(201).json({message: "logout successful"})
};
