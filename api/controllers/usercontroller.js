import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt"

export const getUsers = async (req, res) => {
 try{
    const users = await prisma.user.findMany();
    res.status(201).json(users)
 }catch(err) {
    console.log(err);
    res.status(501).json({ message: "Failed to get Users"})
 }
}

export const getUser = async (req, res) => {
   const id = req.params.id
   console.log(id)

    try{
        const user = await prisma.user.findUnique( {
            where: { id}
        });
        res.status(201).json(user)
    }catch(err) {
       console.log(err);
       res.status(501).json({ message: "Failed to get User"})
    }
}

export const UpdateUser = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId
    const {password,avatar, ...inputs} = req.body;
    if(tokenUserId !== id){
        return res.status(501).json({ message: "NOt AUTHENTICATED"})
    }
    const updatedPassword = null;
    try{
        if(password){
             const updatedPassword = await bcrypt.hash(password,10)
        }
        
     const updatedUser = await prisma.user.update({
        where: {id},
        data:{
            ...inputs,
            ...(updatedPassword && {password: updatedPassword}),
            ...(avatar && {avatar})

        }
     })       
     res.status(201).json( updatedUser);
    

    }catch(err) {
       console.log(err);
       res.status(501).json({ message: "Failed to update User"})
    }
}

export const deleteUser = async (req, res) => {

    const id = req.params.id;
    const tokenUserId = req.userId

    if(tokenUserId !== id){
        return res.status(501).json({ message: "NOt AUTHENTICATED"})
    }
    try{
        await prisma.user.delete({
            where: {id}
        })
        res.status(200).json({message: "deleted"})
    }catch(err) {
       console.log(err);
       res.status(501).json({ message: "Failed to delete User"})
    }
}

export const savedPost = async (req, res) => {
    const postId = req.body.postId;
    const tokenUserId = req.userId;
    console.log({postId, tokenUserId})
    try{
        
        const savedPosts = await prisma.savedPost.findUnique({
            where: {
                userId_postId: {
                    userId:tokenUserId,
                    postId
                }
            }
        }) 
        console.log(savedPosts)
        if(savedPosts) {
            await prisma.savedPost.delete({
                where: {
                    id: savedPosts.id,
                    userId_postId: {
                    postId: savedPosts.postId,
                    userId: savedPosts.userId
                    }
                },
            })
            res.status(201).json({message: "post removed from saved list"})
        }
        else{
            await prisma.savedPost.create({
                data: {
                    userId: tokenUserId,
                    postId,
                },
            })
            res.status(201).json({message: " post saved"})
        }
    }

    catch(err){
        console.log(err)
        res.status(404).json({message: "post not found"})
    }

} 

export const profilePosts = async (req, res) => {

    const tokenUserId = req.userId
    try{

        const userPosts = await prisma.post.findMany({
            where: { userId: tokenUserId }
        })
        const saved = await prisma.savedPost.findMany({
            where: { userId: tokenUserId },
            include: {
                post:true
            }
        })

        const savedPost = saved.map(item => item.post)
        res.status(200).json({ userPosts, savedPost})

    }
    catch(err){
        console.log(err)
        res.status(404).json({message: "post not found"})
    }

} 