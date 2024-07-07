import mongoose from "mongoose";

const ChatSchemm = new mongoose.Schema(
    {
        members: {
            type: Array,
        },
    },
    {
        timestamps: true,
    }
);
const chatmodell = mongoose.model("Chat", ChatSchemm);
export default chatmodell;