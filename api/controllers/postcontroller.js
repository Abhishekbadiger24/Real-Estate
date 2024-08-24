import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken"
export const getPosts = async (req, res) => {
    const query = req.query
    
    try{
        const posts = await prisma.post.findMany({
            where: {
                city: query.city || undefined,
                type:query.type || undefined,
                property: query.property || undefined,
                property: query.property || undefined,

                bedroom: parseInt(query.bedroom) || undefined,
                price: {
                    gte:parseInt(query.minPrice) || 0,
                    lte: parseInt(query.maxPrice) || 10000,
                }
            }
        })
        res.status(200).json(posts)
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
            where : {id},
            include: {
                postDetail: true,
                user: {
                    select: {
                        username: true,
                        avatar:true
                    }
                }
            }
        })
        

        const token = req.cookie?.token;

        if(token) {
            jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
                if(!err) {
                    const saved = await prisma.savedPost.findUnique( {
                        where : {
                            userId_postId: {
                                postId: id,
                                userId: payload.id
                            }
                        }
                    })
                    res.status(200).json({ ...postt, isSaved: true? true: false })
                }
            })
        }

        res.status(201).json({...postt, isSaved: false});

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
                ...body.postData,
                userId: tokenUserId,
                postDetail: {
                    create: body.postDetail
                }
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



