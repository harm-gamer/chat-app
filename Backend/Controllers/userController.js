import User from "../models/users.js";

 export const getUsersSidebar =async  (req,res) => {
     try{
   const loggedInUserId = req.user._id;
   const filterUser = await User.find({_id : {$ne : loggedInUserId}}).select("-password");
   res.status(200).json(filterUser);
     }catch(error){
      console.log("error in getUserSidebar", error.message);
      res.status(400).json({error : error.message});
     }
}
