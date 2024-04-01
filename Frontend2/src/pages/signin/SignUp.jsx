import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderChecbox.jsx"
import { useState ,useEffect } from "react";
import useSignUp from "../../hooks/useSignUp.js";


const SignUp = () => {
      
	let [inputs,setInputs] = useState({
		fullName : "",
		username : "",
		password : "",
		confirmPassword : "",
		gender : "",
	});
	const {loading,signup} = useSignUp();
	const [checkRadio, setCheckRadio] = useState(inputs.gender);
const handlecheckbox = (gender) => {
  setInputs({ ...inputs, gender: gender });
  setCheckRadio(gender);
}
	// const handlecheckbox = (gender) =>{
	// 	setInputs({...inputs,gender : gender})
	// }

	const handleSubmit= async (ev ) =>{
      ev.preventDefault();

	//   const res = await axios.post('/api/auth/SignUp',inpus);
	//   {fullname: "ali", username: "sdjlkj", password: "rk", confrimPassword: "rk", gender: "male"}
	  await  signup(inputs);
	  console.log(inputs);
	}
	
  	return (
  		<div className='flex flex-col items-center justify-center min-w-90 mx-auto'>
  			<div className='w-100% p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
  				<h1 className='text-3xl font-semibold text-center text-gray-300'>
  					Sign Up <span className='text-blue-500'> ChatApp</span>
  				</h1>
  
  				<form onSubmit={handleSubmit}>
  					<div>
  						<label className='label p-2'>
  							<span className='text-base label-text'>Full Name</span>
  						</label>
  						<input type='text' placeholder='John Doe' className='w-full input input-bordered  h-10 ' value={inputs.fullname} onChange={(ev) => setInputs({...inputs,fullName : ev.target.value})} />
  					</div>
  
  					<div>
  						<label className='label p-2 '>
  							<span className='text-base label-text'>Username</span>
  						</label>
  						<input type='text' placeholder='johndoe' className='w-full input input-bordered h-10 'value={inputs.username} onChange={(ev) => setInputs({...inputs,username :ev.target.value})} />
  					</div>
  
  					<div>
  						<label className='label'>
  							<span className='text-base label-text'>Password</span>
  						</label>
  						<input
  							type='password'
  							placeholder='Enter Password'
  							className='w-full input input-bordered h-10'
							value={inputs.password}
							onChange={(ev) => setInputs({...inputs,password : ev.target.value})}
  						/>
  					</div>
  
  					<div>
  						<label className='label'>
  							<span className='text-base label-text'>Confirm Password</span>
  						</label>
  						<input
  							type='password'
  							placeholder='Confirm Password'
  							className='w-full input input-bordered h-10'
							value={inputs.value}
							onChange={(ev) => setInputs({...inputs,confirmPassword : ev.target.value})}
  						/>
  					</div>
					  {/* onCheckboxChange, selectedGender  */}
  					{/* <GenderCheckbox oncheckboxChange={handlecheckbox} selectgender={inputs.gender}/> */}
					  <div className='flex'>
    			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer `}>
				<span className='label-text'>Male</span>
					  <input
  type="radio"
  value="male"
  checked={checkRadio === "male"}
  onChange={() => handlecheckbox("male")}
/>
<input
  type="radio"
  value="female"
  checked={checkRadio === "female"}
  onChange={() => handlecheckbox("female")}
/>
</label>
</div>
</div>
  
  					<Link to={"/login"} className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block' href='#'>
  						Already have an account?
  					</Link>
  
  					<div>
  					<button className='btn btn-block btn-sm mt-2 border border-slate-700' type="submit" disabled={loading}>
							{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
						</button>
  					</div>
  				</form>
  			</div>
  		</div>
  	);
  };


  export default SignUp;