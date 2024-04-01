import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname : String,
  username : String,
  password : {
    type : String,
    required : true,
  },
  gender : {
    type : String,
  required : true,
    enum : ["male","female"],
  },
  profilePic : {
    type : String,
    default : " "
  },
})

let User = mongoose.model("User",userSchema);
export default User;