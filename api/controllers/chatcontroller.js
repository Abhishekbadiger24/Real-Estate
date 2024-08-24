import prisma from "../lib/prisma.js";
export const getChats = async (req, res ) => {
    const tokenUserId = req.userId
    console.log(tokenUserId)
    try{
        const chats = await prisma.chat.findMany({
            where: { 
                userIds: {
                    hasSome: [tokenUserId]
                }
            }
        })  
        console.log(chats)
        for(const chat of chats){
            const recieverId = chat.userIds.find((id) => id !== tokenUserId)

            const reciever = await prisma.user.findUnique({
                where: {id: recieverId} ,
                select: {
                    id: true,
                    username:true,
                    avatar:true
                }
            })
            chat.reciever = reciever
        }

        res.status(200).json(chats)

    }catch (err) {
        console.log(err);
        res.status(404).json({message: "failed to get chats"})
    }
}

export const getChat = async (req, res ) => {
    const tokenUserId = req.userId

    try{
        const chat = await prisma.chat.findUnique({
            where: { 
                id: req.params.id,
                userIds: {
                    hasSome: [tokenUserId]
                }
            },
            include: {
                messages: {
                    orderBy: { createdAt: "asc"}
                }
            }
        })

        res.status(200).json(chat)

        await prisma.chat.update({
            where: {
                id:req.params.id
            },
            data: {
                seenBy:{
                    push: [tokenUserId]
                }
            }
        })
    }catch (err) {
        console.log(err);
        res.status(404).json({message: "failed to get chat"})
    }
}

export const addChat = async (req, res ) => {
    const tokenUserId = req.userId
    try{
        const newchat = await prisma.chat.create({
            data: {
                userIds: [tokenUserId, req.body.recieverId]

            }
        })
        res.status(200).json(newchat)

    }catch (err) {
        console.log(err);
        res.status(404).json({message: "failed to add chat"})
    }
}

export const readChat = async (req, res ) => {
    const tokenUserId = req.userId

    try{
        const chat = await prisma.chat.update({
            where:{
                id:req.params.id,
                userIds: {
                    hasSome: [tokenUserId]
                }
            },
            data: {
                seenBy: {
                    push: [tokenUserId]
                }
            }
        })        
        res.status(200).json(chat)

    }catch (err) {
        console.log(err);
        res.status(404).json({message: "failed to read chat"})
    }
}