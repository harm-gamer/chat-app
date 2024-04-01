import mongoose  from "mongoose";

let converstionSchema = new mongoose.Schema({
    participents : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
        },

    ],
    messages : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Message",
            default : [],
        },
    ],

}, {timestamps:true})

let Conversation = mongoose.model("Conversation",converstionSchema);
export default Conversation