import { Children, createContext, useContext, useState } from "react";
import axios from 'axios';




const UserContext = createContext()

export const UserProvider = ({children})=>{

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const[users,setUsers] = useState([]);

  const saveUser = async (user)=>{
      try
      {
        const response = await axios.post(`${BASE_URL}/save`,user);

        setUsers(prevUsers=>[...prevUsers,response.data]);

        return response.data;
      } 
      catch (error)
      {
        console.log(error);
      }
  }

  const fetchAllUsers = async()=>{
    try
    {
        const response = await axios.get(`${BASE_URL}/fetchAll`);
        setUsers(response.data);
    } 
    catch (error) 
    {
      console.error('Error fetching users:', error);
    }
  }

    



return (
  <UserContext.Provider value={{users,saveUser,fetchAllUsers}}>
        {children}
  </UserContext.Provider>
)

};

export const useUserContext = ()=> useContext(UserContext);

