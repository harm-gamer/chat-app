import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";
import axios from 'axios'; 

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	let {setauthContext}  = useAuthContext();
	
	const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
		console.log(confirmPassword)
		const success = handlecheck({ fullName, username, password, confirmPassword, gender });
		console.log	(success);
		// if (!success) return;

		setLoading(true);
		try {
			// const res = await axios.post("/api/auth/SignUp", userdata);
			const res = await fetch("/api/auth/signUp", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
			});
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("chat-user" ,JSON.stringify(data))
			 setauthContext(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup

function handlecheck({fullname,username,password,confirmPassword,gender}){
    if(!fullname || !username || !password || !confirmPassword || !gender){
        toast.error("please fill the form");
        return false;
    }

    if(password !== confirmPassword){
        toast.error("check Confrimpassword")
        return false;
    }
    
    return true;
}   
