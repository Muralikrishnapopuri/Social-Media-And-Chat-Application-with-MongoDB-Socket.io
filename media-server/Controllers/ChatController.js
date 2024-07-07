
import chatmodell from "../Models/chatmodell.js";

export const createChat = async(req,res)=> {    
    const newChat = new chatmodell({
        members: [req.body.senderId, req.body.receiverId],
    });
    try{
        const result = await newChat.save();
        res.status(200).json(result);
    }catch(err){
        res.status(500).json(err);
    }
};




export const userChats = async(req,res)=>{
    try{
        const chat = await chatmodell.find({
            members: { $in: [req.params.userId]},
        });
        res.status(200).json(chat);
    }catch(err){
        res.status(500).json(err);
    }
};

export const findChat = async (req,res)=> {
    try{
        const chat = await chatmodell.findOne({
            members: { $all: [req.params.firstId, req.params.secondId]},
        });
        res.status(200).json(chat)
    }catch(err){
        res.status(500).json(err); 
    }
};

