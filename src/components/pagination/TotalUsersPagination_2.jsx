import React, { useEffect, useState } from "react";
import axios from "axios";

const TotalUsersPagination_2 = () => {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(4); // now dynamic
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:9292/api/user/fetchAllUsersWithPagination/${pageNumber}/${pageSize}`
      );
      setUsers(res.data.content);
      setTotalPages(res.data.totalPages);
      setTotalElements(res.data.totalElements);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [pageNumber, pageSize]); // fetch when either page number or size changes

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setPageNumber(0); // reset to first page whenever size changes
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Total Users: {totalElements}</h1>

        {/* Page size selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="pageSize" className="text-sm font-medium">Users per page:</label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value={2}>2</option>
            <option value={4}>4</option>
            <option value={6}>6</option>
            <option value={8}>8</option>
            <option value={10}>10</option>
          </select>
        </div>
      </div>

      <table className="min-w-full bg-white border border-gray-300 shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">ID</th>
            <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Username</th>
            <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Email</th>
            <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Mobile</th>
            <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Department</th>
            <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Salary</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4">No Users Found</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.userId} className="hover:bg-gray-50 text-sm">
                <td className="px-6 py-3">{user.userId}</td>
                <td className="px-6 py-3">{user.userName}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">{user.mobileNumber}</td>
                <td className="px-6 py-3">{user.department}</td>
                <td className="px-6 py-3">{user.salary}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="mt-4 flex justify-between items-center">
        <button onClick={() => setPageNumber((prev) => Math.max(prev - 1, 0))} disabled={pageNumber === 0}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm">
          Page {pageNumber + 1} of {totalPages}
        </span>

        <button
          onClick={() => setPageNumber((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={pageNumber === totalPages - 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TotalUsersPagination_2;
