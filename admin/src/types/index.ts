export enum UserRole {
  ADMIN = "admin",
  PROVIDER = "provider",
  USER = "user",
}

export enum ProviderStatus {
  PENDING = "pending",
  APPROVED = "approved",
  DENIED = "denied",
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
}

export interface Provider extends User {
  status: ProviderStatus;
  businessName: string;
  phone: string;
  address: string;
  description: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  registerProvider: (providerData: RegisterProviderData) => Promise<void>;
  approveProvider: (providerId: string) => Promise<void>;
  denyProvider: (providerId: string) => Promise<void>;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface RegisterProviderData extends RegisterData {
  businessName: string;
  phone: string;
  address: string;
  description: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AnalyticsData {
  totalUsers: number;
  totalProviders: number;
  pendingProviders: number;
  approvedProviders: number;
  deniedProviders: number;
  userGrowth: MonthlyData[];
  providerGrowth: MonthlyData[];
}

export interface Notification {
  id: string;
  type: "new_user" | "new_provider" | "system";
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  userId?: string;
  providerId?: string;
}

export interface AdminProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole.ADMIN;
  avatar?: string;
  phone?: string;
  jobTitle?: string;
  bio?: string;
  lastLogin?: Date;
  createdAt: Date;
  notificationPreferences: {
    email: boolean;
    inApp: boolean;
  };
}

export interface MonthlyData {
  month: string;
  count: number;
}

export interface NotificationSummary {
  total: number;
  unread: number;
  newUsers: number;
  newProviders: number;
}

export interface ActivityLog {
  id: string;
  action: string;
  description: string;
  timestamp: Date;
  performedBy: {
    id: string;
    name: string;
  };
}
