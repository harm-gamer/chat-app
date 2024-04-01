
import Home from "./pages/Home/Home"
import { Routes,Route, Navigate } from "react-router-dom"
import SignUp from "./pages/signin/SignUp"
import Login from "./pages/login/Login"
import {Toaster} from "react-hot-toast";
import { useAuthContext } from "./Context/AuthContext";


function App() {
  
  const {authContext} = useAuthContext();
  return (
   <>
   <div className='p-4 h-screen flex items-center justify-center'>
   <Routes>
    <Route path="/" element={authContext ? <Home/> : <Navigate to={"/login"}/>} />
    <Route path='/signup' element={authContext ? <Navigate to='/' /> : <SignUp />} />
    <Route path='/login' element={authContext ? <Navigate to='/' /> : <Login />} />
   </Routes>
   <Toaster />
 
   </div>
   </>
  )
}

export default App
