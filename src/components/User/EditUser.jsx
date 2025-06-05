import React,{useEffect, useState} from 'react'
import { useUserContext } from "../../contexts/UserContext";
import { toast } from 'react-toastify';

const EditUser = ({selectedUser,setEditState}) => {

const{editUserData} = useUserContext();


const [formValues, setFormValues] = useState({
    userName: '',
    email: '',
    mobileNumber: '',
    department: '',
    salary: ''
  });

  
  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(()=>{
    if (selectedUser)
    {
        setFormValues({
        userName: selectedUser.userName ,
        email: selectedUser.email ,
        mobileNumber: selectedUser.mobileNumber,
        department: selectedUser.department,
        salary: selectedUser.salary
      })
    }
  },[])


  const usernameRegex = /^[A-Za-z ]{3,20}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^[0-9]{10}$/;
  const departmentRegex = /^(?!\s*$).+/;
  const salaryRegex = /^\d+(\.\d{1,2})?$/;

  const handleSubmit = async (e)=>{
    e.preventDefault();

    if (!usernameRegex.test(formValues.userName)) {
      setFormError('Username must not contain numbers or special characters');
      return;
    }

    if (!emailRegex.test(formValues.email)) {
      setFormError('Invalid email format');
      return;
    }

    if (!mobileRegex.test(formValues.mobileNumber)) {
      setFormError('Mobile number must be exactly 10 digits');
      return;
    }

    if (!departmentRegex.test(formValues.department)) {
      setFormError('Department is mandatory');
      return;
    }

    if (!salaryRegex.test(formValues.salary)) {
      setFormError('Invalid salary format');
      return;
    }

    setFormError('');

    const formData = new FormData();
    formData.append('userId',selectedUser.userId);
    formData.append('userName',formValues.userName);
    formData.append('email', formValues.email);
    formData.append('mobileNumber', formValues.mobileNumber);
    formData.append('department', formValues.department);
    formData.append('salary', formValues.salary);

    const success = await editUserData(formData);

    if (success) 
    {
      setEditState(false);
      toast.success('User updated Successfully!!');
    }

    

  }


  return (
    <div className="text-orange-800 mt-8">
      <h1 className="text-center">Edit</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg w-[50%] p-10 mx-auto"
      >
        <div className="mb-4">
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
            User Name
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formValues.userName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">
            Mobile Number
          </label>
          <input
            type="number"
            id="mobileNumber"
            name="mobileNumber"
            value={formValues.mobileNumber}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={formValues.department}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
            Salary
          </label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={formValues.salary}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {formError && <p className="text-red-500 text-sm text-center mb-4">{formError}</p>}

        <div className="flex gap-4 justify-center">
          <button type="submit" className="text-2xl bg-cyan-400 rounded-lg p-2 px-6 disabled:opacity-60 disabled:cursor-not-allowed">
            Edit
          </button>
          <button className='bg-red-400 p-2 rounded-lg' onClick={()=>setEditState(false)}>Cancel</button>
        </div>
       

      </form>
    </div>
  )
}

export default EditUser