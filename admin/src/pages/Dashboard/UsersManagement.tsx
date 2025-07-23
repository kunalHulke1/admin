import React from 'react';
import UsersList from '../../components/Dashboard/UsersList';
import { mockUsers } from '../../data/mockData';

const UsersManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
        <p className="text-gray-600 mt-1">View and manage user accounts</p>
      </div>
      
      <UsersList users={mockUsers} />
    </div>
  );
};

export default UsersManagement;