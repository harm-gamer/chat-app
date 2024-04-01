import  { useState } from 'react'
import { useAuthContext } from '../Context/AuthContext';
import toast from "react-hot-toast";
const useLogout = () => {
    let [loading,setLoading] = useState(false);
    let {setauthContext} = useAuthContext()
 const logout = async () =>{
   
    try{
      setLoading(true);
        let res = await fetch("/api/auth/logout",
        {
            method: "POST",
            headers :{"content-Type" : "application/json"},  
        })

        let data = res.json();
        if(data.error){
            throw new Error(data.error);
        }
   localStorage.removeItem("chat-user");
    setauthContext(null)
    }
    catch(error){
    toast.error(error.message);
    }finally{
        setLoading(false);
    }
    
 }
 return {loading,logout};
}

export default useLogout
