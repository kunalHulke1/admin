import React, { useState } from 'react';
import ProvidersList from '../../components/Dashboard/ProvidersList';
import ProviderDetailModal from '../../components/Dashboard/ProviderDetailModal';
import { useAuth } from '../../contexts/AuthContext';
import { Provider } from '../../types';
import { mockProviders } from '../../data/mockData';

const ProvidersManagement: React.FC = () => {
  const { approveProvider, denyProvider } = useAuth();
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [providers, setProviders] = useState<Provider[]>(mockProviders);
  
  const handleViewProvider = (provider: Provider) => {
    setSelectedProvider(provider);
  };
  
  const handleCloseModal = () => {
    setSelectedProvider(null);
  };
  
  const handleApprove = async (id: string) => {
    try {
      await approveProvider(id);
      
      // Update local state
      setProviders(prev => 
        prev.map(provider => 
          provider.id === id 
            ? { ...provider, status: 'approved' } 
            : provider
        )
      );
      
      // Close modal if open
      if (selectedProvider?.id === id) {
        setSelectedProvider(prev => 
          prev ? { ...prev, status: 'approved' } : null
        );
      }
    } catch (error) {
      console.error('Error approving provider:', error);
    }
  };
  
  const handleDeny = async (id: string) => {
    try {
      await denyProvider(id);
      
      // Update local state
      setProviders(prev => 
        prev.map(provider => 
          provider.id === id 
            ? { ...provider, status: 'denied' } 
            : provider
        )
      );
      
      // Close modal if open
      if (selectedProvider?.id === id) {
        setSelectedProvider(prev => 
          prev ? { ...prev, status: 'denied' } : null
        );
      }
    } catch (error) {
      console.error('Error denying provider:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Providers Management</h1>
        <p className="text-gray-600 mt-1">View and manage mandap service providers</p>
      </div>
      
      <ProvidersList 
        providers={providers}
        onApprove={handleApprove}
        onDeny={handleDeny}
        onView={handleViewProvider}
      />
      
      {selectedProvider && (
        <ProviderDetailModal 
          provider={selectedProvider}
          onClose={handleCloseModal}
          onApprove={handleApprove}
          onDeny={handleDeny}
        />
      )}
    </div>
  );
};

export default ProvidersManagement;