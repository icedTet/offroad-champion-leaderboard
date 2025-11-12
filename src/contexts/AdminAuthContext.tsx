import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { adminApi } from '@/services/adminApi';
import { useRouter } from 'next/router';

interface AdminUser {
  id: string;
  username: string;
  name: string;
  role: string;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      if (token) {
        try {
          // Verify token by fetching dashboard
          const data = await adminApi.getDashboard() as { adminId?: string; adminUsername?: string; adminName?: string };
          setUser({
            id: data.adminId || '',
            username: data.adminUsername || 'Admin',
            name: data.adminName || 'Admin User',
            role: 'admin',
          });
        } catch {
          // Token invalid, clear it
          adminApi.clearToken();
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const data = await adminApi.login(username, password);

      // Check if user is admin
      if (data.user.role !== 'admin') {
        throw new Error('Access denied. Admin privileges required.');
      }

      setUser(data.user);
      router.push('/admin');
    } catch (err) {
      setError((err as Error).message || 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    adminApi.logout();
    setUser(null);
    router.push('/admin/login');
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        error,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}

export function useRequireAdmin() {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, isLoading, router]);

  return { isAuthenticated, isLoading };
}
