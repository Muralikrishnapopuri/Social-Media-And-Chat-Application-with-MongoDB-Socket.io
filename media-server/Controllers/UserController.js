import usermodel from "../Models/usermodell.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// get All users
export const getAlluser = async(req,res)=> {
    try{
        let users = await usermodel.find();
        users = users.map((user)=>{
            const {password, ...otherDetails} = user._doc
            return otherDetails
        })
        res.status(200).json(users);
    }catch(err){
        res.status(500).json(err);

    }
}

//get a user
export const getUser = async(req,res)=> {
    const id = req.params.id;

    try{
        const user = await usermodel.findById(id);
        if(user){
            const {password, ...otherDetails} = user._doc
           res.status(200).json(otherDetails)
        }else{
            res.status(404).json("No such user exists")
        }
    }catch(err){
        res.status(500).json(err)
    }
}

// Update a user

export const UpdateUser = async(req,res)=>{
    const id = req.params.id;
    const {_id, currentUserAdminStatus, password} = req.body;

    if(id === _id){
        try{
            if(password){
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt);
            }
            const user = await usermodel.findByIdAndUpdate(id,req.body,{new: true});
            const token = jwt.sign(
                {username: user.username, id: user._id},
                process.env.JWT_KEY,
                {expiresIn: "1h"}
            );
            res.status(200).json({user, token});
        }catch(err){
            res.status(500).json(err); 
        }
    }else{
        res.status(403).json("Access Denied! you can only update your own profile.")
    }
}

//Detele user 
export const deleteuser = async (req,res) => {
    const id = req.params.id;
    const {_id, currentUserAdminStatus} = req.body;

    if(_id === id || currentUserAdminStatus){
        try{ 
             await usermodel.findByIdAndDelete(id);
            res.status(200).json("User deleted Successfully...");
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("access Denied! you can only delete your own profile.")
    }
}

// Follow a User
export const followUser = async (req,res)=>{
    const id = req.params.id;

    const { _id } = req.body;
    if( _id === id ){
        res.status(403).json("Action forbiden..")
    }
    else{
        try{
            const followUser =  await usermodel.findById(id);
            const followingUser = await usermodel.findById(_id);

            if(!followUser.followers.includes(_id)){
                await followUser.updateOne({$push : {followers : _id}});
                await followingUser.updateOne({$push : {following : id}});
                res.status(200).json("User followed!")
            }else{
                res.status(403).json("User is Already followed by you")
            }
        }catch(err){
            res.status(500).json(err);
        }
    }
}

// Unfollow a User
export const UnFollowUser = async (req,res)=>{
    const id = req.params.id;

    const { _id } = req.body;
    if( _id === id ){
        res.status(403).json("Action forbiden..")
    }
    else{
        try{
            const followUser =  await usermodel.findById(id);
            const followingUser = await usermodel.findById(_id);

            if(followUser.followers.includes(_id)){
                await followUser.updateOne({$pull : {followers : _id}});
                await followingUser.updateOne({$pull : {following : id}});
                res.status(200).json("User Unfollowed!")
            }else{
                res.status(403).json("User is not  Followed by you.")
            }
        }catch(err){
            res.status(500).json(err);
        }
    }
}