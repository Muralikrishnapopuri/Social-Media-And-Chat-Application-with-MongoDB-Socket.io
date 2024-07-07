import PostModel from "../Models/PostModel.js";
import mongoose from "mongoose";
import usermodel from "../Models/usermodell.js";
//Create New Post 
export const createPost = async(req,res)=>{
    const newPost =new PostModel(req.body);
    try{
        await newPost.save()
        res.status(200).json(newPost)
    }catch(err){
        res.status(500).json(err)
    }

}

// Get a post
export const getPost = async(req,res)=>{
    const id = req.params.id;

    try{
        const post = await PostModel.findById(id);
        res.status(200).json(post);

    }catch(err){
        res.status(500).json(err);
    }
}

// Update a post

export const updatePost = async(req,res)=>{
    const postid = req.params.id;
    const {userId} = req.body;
    try{
        const post = await PostModel.findById(postid);

        if(post.userId === userId){
            await post.updateOne({$set : req.body});
            res.status(200).json("Post Updated!");
        }else{
            res.status(403).json("Action forbidden");
        }
    }catch(err){
        res.status(500).json(err);
    }
}

// Delete post
export const deletePost = async(req,res)=>{
    const {id, user} = req.params;

    try{
        const post = await PostModel.findById(id);
        console.log(user);
        if(post.userId === user){
            await post.deleteOne();
            res.status(200).json("Post Deleted Successfully...");
        }else{
            res.status(403).json("Action forbidden.");
        }
    }catch(err){
        res.status(500).json(err);
    }
}


// likes/ dislikes a post
export const likePost = async(req,res)=>{
    const id = req.params.id;
    const {userId} = req.body;
  
    try{
        const post = await PostModel.findById(id);
       
        if(post.likes.includes(userId)){
            await post.updateOne({$pull : {likes : userId}});
            res.status(200).json("Post disliked")
        }else{
            await post.updateOne({$push : {likes : userId}});
            res.status(200).json("Post Liked")
        }
    }catch(err){
        res.status(500).json(err);
    }
};
// get Timeline Posts

export const getTimelinePosts = async (req,res) => {
    const userId = req.params.id;

    try{
        const currentUserPosts = await PostModel.find({userId : userId});
        const followingPosts = await usermodel.aggregate([
            {
                $match: {
                    _id :  new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup : {
                    from : "posts",
                    localField : "following",
                    foreignField : "userId",
                    as : "followingPosts"
                }
            },
            {
                $project : {
                    followingPosts : 1,
                    _id : 0
                }
            }
        ])
        res.status(200).json(currentUserPosts.concat(...followingPosts[0].followingPosts)
        .sort((a,b)=>{
            return b.createdAt - a.createdAt;
    })
       )
    }catch(err){
        res.status(500).json(err);
    }
}
