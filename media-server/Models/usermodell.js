import mongoose from "mongoose";
const UserSchemaa = mongoose.Schema(
    {
        username: {
            type:String,
            required:true
        },
        password: {
            type:String,
            required:true
        },
        firstname : {
            type:String,
            required:true
        },
        lastname: {
            type:String,
            required:true
        },
        isAdmin : {
            type: Boolean,
            default:false,
        },
        profilepicture: String,
        coverpicture: String,
        about: String,
        livesin: String,
        jobrole: String,
        relationship: String,
        country:String,
        followers: [],
        following: []
    },
    {timestamps: true}
)
const usermodel = mongoose.model("users",UserSchemaa);
export default usermodel