import prisma from "../lib/prisma.js";

export const getMessages = async (req, res ) => {
    const tokenUserId = req.userId

    try{
        const messages = await prisma.message.findMany({
            where: { 
               userId: tokenUserId
            }
        })    
        res.status(200).json(messages)

    }catch (err) {
        console.log(err);
        res.status(404).json({message: "failed to get message"})
    }
}

export const addMessage = async (req, res ) => {
    const tokenUserId = req.userId
    const chatId = req.params.chatId
    const text = req.body.text

    try{
        const chat = await prisma.chat.findUnique({
            where: { 
                id:chatId,
                userIds: {
                    hasSome: [tokenUserId]
                }
            }
        })   
        
        if(!chat) return res.status(404).json({message: "message not found"})

            const message = await prisma.message.create({
                data:{
                    text,
                    chatId,
                    userId:tokenUserId
                }
            })

            await prisma.chat.update({
                where: {
                    id: chatId,
                },
                data: {
                    seenBy: [tokenUserId],
                    lastMessage: text
                }
            })
        res.status(200).json(message)

    }catch (err) {
        console.log(err);
        res.status(404).json({message: "failed to add message"})
    }
}