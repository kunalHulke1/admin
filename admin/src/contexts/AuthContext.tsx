import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  AuthContextType, 
  User, 
  RegisterData, 
  LoginData, 
  RegisterProviderData,
  UserRole,
  Provider,
  ProviderStatus
} from '../types';
import { mockUsers, mockProviders } from '../data/mockData';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Load user data from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in mock data
      const foundUser = mockUsers.find(u => u.email === email);
      
      // Check if user is a provider
      let providerUser: Provider | undefined;
      if (foundUser && foundUser.role === UserRole.PROVIDER) {
        providerUser = mockProviders.find(p => p.email === email);
        
        // If provider is not approved, deny login
        if (providerUser && providerUser.status !== ProviderStatus.APPROVED) {
          throw new Error(`Your account is ${providerUser.status}. Please wait for admin approval.`);
        }
      }
      
      // Validate credentials
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      // Set user data
      const userData = providerUser || foundUser;
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData: RegisterData): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      const existingUser = mockUsers.find(u => u.email === userData.email);
      if (existingUser) {
        throw new Error('Email already exists');
      }
      
      // Create new user
      const newUser: User = {
        id: `user-${Math.random().toString(36).substr(2, 9)}`,
        name: userData.name,
        email: userData.email,
        role: userData.role || UserRole.USER,
        createdAt: new Date().toISOString(),
      };
      
      // Auto login after registration (except for providers)
      if (userData.role !== UserRole.PROVIDER) {
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(newUser));
      }
      
      // In a real app, we would save to DB here
      // For mock, we would push to mockUsers array
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register provider function
  const registerProvider = async (providerData: RegisterProviderData): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      const existingUser = mockUsers.find(u => u.email === providerData.email);
      if (existingUser) {
        throw new Error('Email already exists');
      }
      
      // Create new provider
      const newProvider: Provider = {
        id: `provider-${Math.random().toString(36).substr(2, 9)}`,
        name: providerData.name,
        email: providerData.email,
        role: UserRole.PROVIDER,
        status: ProviderStatus.PENDING,
        businessName: providerData.businessName,
        phone: providerData.phone,
        address: providerData.address,
        description: providerData.description,
        createdAt: new Date().toISOString(),
      };
      
      // In a real app, we would save to DB here
      // For mock, we would push to mockProviders array
      
      // Provider needs approval, so don't auto-login
    } catch (error) {
      console.error('Provider registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Approve provider function
  const approveProvider = async (providerId: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, we would update the provider status in the DB
      // For mock, we would update the provider in mockProviders
    } catch (error) {
      console.error('Approve provider error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Deny provider function
  const denyProvider = async (providerId: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, we would update the provider status in the DB
      // For mock, we would update the provider in mockProviders
    } catch (error) {
      console.error('Deny provider error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = (): void => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        isLoading, 
        login, 
        register, 
        logout,
        registerProvider,
        approveProvider,
        denyProvider
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};