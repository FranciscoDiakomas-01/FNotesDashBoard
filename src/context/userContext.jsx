import { createContext  ,useEffect , useState} from "react";
import getAdminData from "../services/getAdminData";

export const UserContext = createContext()

export default function UserContextProvider({children}) {
    const [user, setUser] = useState({
        name: "",
        email : ""
    })
    useEffect(() => {
        async function getUser() {
            const data = await getAdminData()
            setUser(data)
        }
        getUser()
    },[])
 return (
   <UserContext.Provider value={{user , setUser}}>
    {children}
   </UserContext.Provider>
 );
}