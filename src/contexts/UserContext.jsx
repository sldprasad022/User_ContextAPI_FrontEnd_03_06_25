import {createContext, useContext, useState } from "react";
import axios from 'axios';


const UserContext = createContext()

export const UserProvider = ({children})=>{

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const[users,setUsers] = useState([]);

  const[apiError, setApiError] = useState(null);

  const [loading, setLoading] = useState(false);

  const [intialFetch, setIntailFetch] = useState(false);




const saveUser = async (user) => {
      setLoading(true);
      try
      {
        const response = await axios.post(`${BASE_URL}/save`, user);
        setUsers(prevUsers => [...prevUsers, response.data]);
        setApiError(null);
        return true; // ✅ Success
      }
      catch (error)
      {
        const errMessage = error?.response?.data?.message || 'Something went wrong';
        setApiError(errMessage);
        return false; // ❌ Failed
      } 
      finally 
      {
        setLoading(false);
      }
};


const fetchAllUsers = async () => {
    setIntailFetch(true);
    try
    {
      const response = await axios.get(`${BASE_URL}/fetchAll`);
      setUsers(response.data);
      setApiError(null); // ✅ Clear error on success
    }
    catch (error)
    {
      const message = error?.response?.data?.message || 'Failed to fetch users';
      setApiError(message);
      console.log(message);
    }
    finally
    {
      setIntailFetch(false);
    }
};

const deleteUser = async (userId) => {
    setLoading(true);
    try
    {
      await axios.delete(`${BASE_URL}/deleteByUserId/${userId}`);
      setApiError(null);
      return true;
    }
    catch (error)
    {
      const message = error?.response?.data?.message || 'Failed to delete user';
      setApiError(message);
      return false;
    }
    finally 
    {
      setLoading(false);
    }
};



const removeUserFromState = (userId) => {
    setUsers(prevUsers => prevUsers.filter(user => user.userId !== userId));
};



const editUserData = async (userData) => {
  const userId = userData.get("userId");
  setLoading(true);
  try
  {
    const response = await axios.put(`${BASE_URL}/update/${userId}`, userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setUsers((prevUsers) =>prevUsers.map((user) =>user.userId === Number(userId) ? response.data : user));
    setApiError(null);
    return true;
  } 
  catch (error) 
  {
    const message = error?.response?.data?.message || 'Failed to update user';
    setApiError(message);
    return false;
  } 
  finally 
  {
    setLoading(false);
  }
};



    



return (
  <UserContext.Provider value={{users,setUsers,saveUser,fetchAllUsers,deleteUser,removeUserFromState,editUserData,apiError,loading,intialFetch}}>
        {children}
  </UserContext.Provider>
)

};

export const useUserContext = ()=> useContext(UserContext);

