import React,{useEffect} from 'react'
import { useUserContext } from "../../contexts/UserContext";

const TotalUsers = () => {

  const {fetchAllUsers,users} =useUserContext();

  useEffect(()=>{
    fetchAllUsers();
  },[])

  console.log(users);

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
                      <button>Delete</button>
                      <button>Edit</button>
                    </td>
                  </tr>
                  ))
                )
              }
            </tbody>
    </table>
    
    
    
    
    
    </>
  )
}

export default TotalUsers