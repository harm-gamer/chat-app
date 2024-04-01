import User from "../models/users.js"
import bcrypt from "bcryptjs"
import generatetokenAndSetCookie from "../utils/generatetokenAndSendCookie.js";
export const  SignUp = async (req,res) =>{
   console.log(req.body);

   try{
    let { fullname , username, password ,gender, confirmPassword } = req.body;
     if(password !== confirmPassword){
        return res.status(400).json({error : " password does not match"});
     }
     const user = await User.findOne({username});
     if(user){
       return res.status(400).json({error : "user exits try with different"});
     }
     const salt = await bcrypt.genSalt(10);
     const hashpassword =  await bcrypt.hash(password,salt);
     const boyprofilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
     const girlprofilePic =  `https://avatar.iran.liara.run/public/girl?username=${username}`
     const newUser = new User({
        fullname,
        username,
        password : hashpassword,
        gender,
        profilePic : gender === "male" ? boyprofilePic : girlprofilePic
     });
     if(newUser){
        generatetokenAndSetCookie(newUser._id,res);
        await newUser.save();
                                                                                                                            
        return res.status(201).json({
            id : newUser._id,
            fullname : newUser.fullname,
            username : newUser.username,
            profilePic : newUser.profilePic
        })
     }else{
      res.status(400).json({error : "invalid user data"});
     }
        
   }
   catch(error){
   console.log("Error in signin",error.message);
    return res.status(500).json({error : "internal server error"})
   }
}

export const login = async (req,res)=>{
    try{
    let {username,password} = req.body;
     let user = await User.findOne({username})
     let ispasswordCorrect = await bcrypt.compare(password, user?.password || "")
    
     if(!user || !ispasswordCorrect){
        return res.status(400).json({error : "invalid credentails"})
     }
     generatetokenAndSetCookie(user._id,res);
      res.status(200).json({
        id : user._id,
        fullname : user.fullname,
        username :user.username,
      
        profilePic : user.profilePic
    })
    }
    catch(error){
        console.log("Error in login",error.message);
        res.status(500).json({error : "internal server error"})
    }
}

export const logout = (req,res) =>{
   try {
    res.cookie("jwt","",{maxAge : 0});
    res.status(200).json({message : "logout successfully "})
   }
   catch(error){
    console.log("Error in logout coontroller ",error.message);
        res.status(500).json({error : "internal server error"})
   }
};