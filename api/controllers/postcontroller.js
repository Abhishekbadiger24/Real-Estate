import prisma from "../lib/prisma.js";

export const getPosts = async (req, res) => {
    try{
        const allPosts = await prisma.post.findMany()
        res.status(200).json(allPosts)
    }
    catch(err){
        console.log(err)
        res.status(404).json({message: "post not found"})
    }

} 
export const getpost = async (req, res) => {
    const id = req.params.id;
    try{
        const postt = await prisma.post.findUnique({
            where : {id}
        })

        res.status(201).json(postt)

    }
    catch(err){
        console.log(err)
        res.status(404).json({message: "post not found"})
    }

} 



export const addPost = async (req, res) => {
    const body =  req.body
    const tokenUserId = req.userId
    try{
        const newPost = await prisma.post.create({
            data: {
                ...body,
                userId: tokenUserId
            }
        })
        res.status(201).json(newPost)
    }
    catch(err){
        console.log(err)
        res.status(404).json({message: "post not found"})
    }

} 



export const updatePost = async (req, res) => {
    try{

    }
    catch(err){
        console.log(err)
        res.status(404).json({message: "post not found"})
    }

} 


export const deletePost = async (req, res) => {
    const id = req.params.id;
    const tokenUserid = req.userId 
    try{
        const postt = await prisma.post.findUnique({
            where : {id}
        })

        if(postt.userId !== tokenUserid){
            return res.status(403).json({message : "Not Authenticated"})
        }

        await prisma.post.delete({
            where: {id}
        })
        res.status(201).json({message: "deleted post"})

    }
    catch(err){
        console.log(err)
        res.status(404).json({message: "post not found"})
    }

} 