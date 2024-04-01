 import Conversation from "../models/conversation.js"
 import Message from "../models/message.js"
export const getMessages = async (req,res) => {
   try{
    const {id  : userToChatId} = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participents :{$all :[senderId , userToChatId]}
    }).populate("message");
    if(!conversation){
      return res.status(200).json([]);
    }
    const messages = conversation.messages;

    res.status(200).json(messages);
   }catch(err){
    console.log("error in getmessage controller " , err.message);
    res.status(400).json({err : "internal server error"})
   }
}

export const sendMassage = async (req,res) =>{
    try{
    const { message } = req.body;
    const { id : recieverId} = req.params;
    const senderId = req.user._id;
  
    let conversation = await Conversation.findOne({
      participents : {$all : [senderId,recieverId]},
    })
    console.log(conversation);
    if(!conversation){
      conversation = await Conversation.create({
        participents:[senderId,recieverId],
      })
      

      const newMessage = new Message({
        senderId,
        recieverId,
        message,
      })
      console.log(newMessage)
    if(newMessage){
      Conversation.messages.push(newMessage._id);
      
    }
    await conversation.save();
		await newMessage.save();
    // await Promise.all([conversation.save(), newMessage.save()]);

    // SOCKET IO FUNCTIONALITY WILL GO HERE
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

    
      res.status(201).json(newMessage);
    }
    }catch(error){
  console.log("Error in sendMessage controller :" ,error.message);
    }
}