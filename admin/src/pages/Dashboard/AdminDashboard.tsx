import React, { useState } from 'react';
import { 
  Users, 
  Store, 
  Clock, 
  CheckCircle,
  Plus,
  X
} from 'lucide-react';
import StatCard from '../../components/Dashboard/StatCard';
import Chart from '../../components/Dashboard/Chart';
import { mockAnalyticsData } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole, ProviderStatus } from '../../types';

const AdminDashboard: React.FC = () => {
  const { register, registerProvider } = useAuth();
  const [showUserModal, setShowUserModal] = useState(false);
  const [showProviderModal, setShowProviderModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [providerData, setProviderData] = useState({
    name: '',
    email: '',
    password: '',
    businessName: '',
    phone: '',
    address: '',
    description: ''
  });

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await register({
        ...userData,
        role: UserRole.USER
      });
      setShowUserModal(false);
      setUserData({ name: '', email: '', password: '' });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateProvider = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await registerProvider({
        ...providerData,
        role: UserRole.PROVIDER
      });
      setShowProviderModal(false);
      setProviderData({
        name: '',
        email: '',
        password: '',
        businessName: '',
        phone: '',
        address: '',
        description: ''
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of your platform's performance</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowUserModal(true)}
            className="btn btn-outline flex items-center gap-2"
          >
            <Plus size={16} />
            Add User
          </button>
          <button
            onClick={() => setShowProviderModal(true)}
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus size={16} />
            Add Provider
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value={mockAnalyticsData.totalUsers}
          icon={Users}
          color="bg-primary-600"
          change={{ value: 12, isPositive: true }}
        />
        
        <StatCard 
          title="Total Providers" 
          value={mockAnalyticsData.totalProviders}
          icon={Store}
          color="bg-secondary-600"
          change={{ value: 8, isPositive: true }}
        />
        
        <StatCard 
          title="Pending Approvals" 
          value={mockAnalyticsData.pendingProviders}
          icon={Clock}
          color="bg-warning-600"
          change={{ value: 0, isPositive: true }}
        />
        
        <StatCard 
          title="Approved Providers" 
          value={mockAnalyticsData.approvedProviders}
          icon={CheckCircle}
          color="bg-success-600"
          change={{ value: 5, isPositive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart 
          title="User Growth"
          data={mockAnalyticsData.userGrowth}
          dataKey="users"
          color="#7C3AED"
          gradient={{ start: "#c4b5fd", end: "#ede9fe" }}
        />
        
        <Chart 
          title="Provider Growth"
          data={mockAnalyticsData.providerGrowth}
          dataKey="providers"
          color="#0EA5E9"
          gradient={{ start: "#bae6fd", end: "#e0f2fe" }}
        />
      </div>
      
      <div className="card p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
              <Users size={16} className="text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-900">New user registration</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-warning-100 flex items-center justify-center flex-shrink-0">
              <Store size={16} className="text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-gray-900">New provider registration</p>
              <p className="text-xs text-gray-500">1 day ago</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-success-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle size={16} className="text-success-600" />
            </div>
            <div>
              <p className="text-sm text-gray-900">Provider approved</p>
              <p className="text-xs text-gray-500">2 days ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Create User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Create New User</h2>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleCreateUser} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-error-50 border border-error-200 text-error-700 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <div>
                <label htmlFor="name" className="form-label">Full name</label>
                <input
                  id="name"
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  required
                  className="form-input"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  id="email"
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  required
                  className="form-input"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  id="password"
                  type="password"
                  value={userData.password}
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                  required
                  className="form-input"
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUserModal(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  {isSubmitting ? 'Creating...' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Provider Modal */}
      {showProviderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Create New Provider</h2>
              <button
                onClick={() => setShowProviderModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleCreateProvider} className="p-6 space-y-6">
              {error && (
                <div className="p-3 bg-error-50 border border-error-200 text-error-700 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <div className="space-y-4">
                
                
                <div>
                  <label htmlFor="provider-name" className="form-label">Full name</label>
                  <input
                    id="provider-name"
                    type="text"
                    value={providerData.name}
                    onChange={(e) => setProviderData({ ...providerData, name: e.target.value })}
                    required
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label htmlFor="provider-email" className="form-label">Email address</label>
                  <input
                    id="provider-email"
                    type="email"
                    value={providerData.email}
                    onChange={(e) => setProviderData({ ...providerData, email: e.target.value })}
                    required
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label htmlFor="provider-password" className="form-label">Password</label>
                  <input
                    id="provider-password"
                    type="password"
                    value={providerData.password}
                    onChange={(e) => setProviderData({ ...providerData, password: e.target.value })}
                    required
                    className="form-input"
                  />
                </div>
              </div>
              
              
                
                
               
                
               
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowProviderModal(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  {isSubmitting ? 'Creating...' : 'Create Provider'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;