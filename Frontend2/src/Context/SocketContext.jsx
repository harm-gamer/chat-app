import { createContext ,useState,useEffect,useContext} from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";


const SocketContext = createContext({});
export const useSocketContext = () => {
	return useContext(SocketContext);
};


export const SocketContextProvider = ({children} ) => {
    const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authContext } = useAuthContext();

    useEffect(() =>{
        if (authContext) {
			const socket = io("https://localhost:5000")
        

			// setSocket(socket);
            
            // socket.on("getOnlineUsers", (users) => {
			// 	setOnlineUsers(users);
			// });

			// socket.on() is used to listen to the events. can be used both on client and server side
			// socket.on("getOnlineUsers", (users) => {
			// 	setOnlineUsers(users);
			// });

			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
    },[authContext])

    return <SocketContext.Provider value={{socket,onlineUsers}}> {children}</SocketContext.Provider>
} 