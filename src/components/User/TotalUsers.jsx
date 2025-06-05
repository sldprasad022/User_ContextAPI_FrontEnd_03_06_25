import React,{useEffect, useState} from 'react'
import { useUserContext } from "../../contexts/UserContext";
import EditUser from './EditUser';
import { toast } from 'react-toastify';

const TotalUsers = () => {

  const {fetchAllUsers,users,setUsers,deleteUser,removeUserFromState,loading,intialFetch} =useUserContext();

  const [editstate, setEditState] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(()=>{
    fetchAllUsers();
  },[])

  console.log(users);


//---------------------------------------------Delete Models----------------------------------------
  //model-1 : here, we are updating state manually.
  // const handleDelete = async (userId)=>{
  //      const success = await deleteUser(userId);
  //       if (success)
  //       {
  //         const updatedUsers = users.filter(user=>user.userId !== userId);
  //         setUsers(updatedUsers);
          
  //         toast.success("User Deleted Successfully!!");
  //       }

  // }

  const handleDelete = async (userId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this user?");
  
  if (!confirmDelete) return;

  const success = await deleteUser(userId);
  if (success) {
    const updatedUsers = users.filter(user => user.userId !== userId);
    setUsers(updatedUsers);

    toast.success("User Deleted Successfully!!");
  }
};


  //model-2 : here, we are deleting user from state (Context API)
  //   const handleDelete = async (userId) => {
  //   await deleteUser(userId);           
  //   removeUserFromState(userId); 
  // };

//   const handleDelete = async (userId) => {
//   const confirmDelete = window.confirm("Are you sure you want to delete this user?");
//   if (!confirmDelete) return;

//   const success = await deleteUser(userId);
//   if (success) {
//     removeUserFromState(userId); // cleaner and aligns with context usage
//     toast.success("User Deleted Successfully!!");
//   }
// };

//------------------------------------------------------------------------------------------------------------------

if (intialFetch) {
  return <div className="text-center p-10">Loading users...</div>;
}



  return (
    <>
    
    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">ID</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">User Name</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Email</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Mobile</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Department</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Salary</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                users.length === 0 ? (
                  <tr>
                    <td className='text-2xl text-center' colSpan='6'>No Users Found</td>
                  </tr>
                ) :(
                  users.map((eachUser)=>(
                    <tr className='text-sm font-medium hover:bg-gray-50' key={eachUser.userId}>
                    <td className='text-gray-700 px-6 py-4'>{eachUser.userId}</td>
                    <td className='text-gray-700 px-6 py-4'>{eachUser.userName}</td>
                    <td className='text-gray-700 px-6 py-4'>{eachUser.email}</td>
                    <td className='text-gray-700 px-6 py-4'>{eachUser.mobileNumber}</td>
                    <td className='text-gray-700 px-6 py-4'>{eachUser.department}</td>
                    <td className='text-gray-700 px-6 py-4'>{eachUser.salary}</td>
                    <td className='flex gap-2 '>
                      <button className='p-2 bg-red-200 text-white' onClick={()=>handleDelete(eachUser.userId)}>Delete</button>
                      <button className='p-2 bg-blue-200 text-white'
                        onClick={()=>{
                          setEditState(true);
                          setSelectedUser(eachUser);
                        }}
                      >Edit</button>
                    </td>
                  </tr>
                  ))
                )
              }
            </tbody>
    </table>
    
    
    {/* Edit User */}

    {editstate && selectedUser &&(
      <div className='fixed top-40 right-[800px]  w-[800px]'>
        <div className='relative w-full h-[800px]'>
          <button className='absolute top-0 right-56' onClick={()=>setEditState(false)}>X</button>
          <EditUser setEditState={setEditState} selectedUser={selectedUser} />
        </div>
      </div>
    )}
    
    
    
    </>
  )
}

export default TotalUsers