import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch users from the API
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  // Delete user function
  const handleDeleteUser = async (userId) => {
    try {
      await fetch(`https://api.escuelajs.co/api/v1/users/${userId}`, {
        method: 'DELETE',
      });
     // setUsers(users.filter(user => user.id !== userId))
     fetchUsers()
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Navigate to Add User Page
  const handleAddUser = () => {
    navigate('/admin/adduser');
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">User Management</h1>
      <button 
        className="bg-blue-500 text-white px-4 py-2 mb-6 rounded hover:bg-blue-600 transition duration-200"
        onClick={handleAddUser}
      >
        Add User
      </button>

      {users.length === 0 ? (
        <p className="text-center text-gray-600">No users available.</p>
      ) : (
        <ul className="space-y-6">
          {users.map(user => (
            <li key={user.id} className="border p-4 rounded-lg flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p>{user.email}</p>
                </div>
              </div>
              <button 
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                onClick={() => handleDeleteUser(user.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserManagement;
