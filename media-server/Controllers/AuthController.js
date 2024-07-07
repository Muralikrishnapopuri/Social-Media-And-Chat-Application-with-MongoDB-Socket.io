import usermodel from '../Models/usermodell.js' ;
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
//Register User
export const registeruser = async(req,res) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    req.body.password = hashedPass
    const newUser = new usermodel(req.body);

    const { username } = req.body;
    try{
        const oldUser = await usermodel.findOne({username});
        if(oldUser){
          return res.status(400).json({message:"UserName is already registered!"});
        }
        const user =  await newUser.save();
        const token = jwt.sign({
          username: user.username, id: user._id
        }, process.env.JWT_KEY, {expiresIn: '1h'});
        res.status(200).json({user, token});
    }catch(err){
        res.status(500).json({message: err.message})
    }

}

// login User
export const loginUser = async(req,res)=> {
    const {username,password} = req.body;

    try{
      const user = await usermodel.findOne({username: username});
      if(user){
        const validity = await bcrypt.compare(password, user.password);

        if(!validity){
          res.status(400).json("Wrong Password.")
        }else{
          const token = jwt.sign({
            username: user.username, id: user._id
          }, process.env.JWT_KEY, {expiresIn: '1h'});
          res.status(200).json({user, token});
        }
      }else{
        res.status(404).json("User does not Exists..")
      }


    }catch(err){
        res.status(500).json({message: err.message})

    }
}

