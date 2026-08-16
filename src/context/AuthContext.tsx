import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { authService, userService } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  googleLogin: (email: string, name?: string, picture?: string) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('skillsphere_token'));
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCurrentUser = async () => {
    try {
      if (token) {
        const currentUser = await authService.getMe();
        setUser(currentUser);
      } else {
        setUser(null);
      }
    } catch {
      localStorage.removeItem('skillsphere_token');
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, [token]);

  const login = async (email: string, password: string) => {
    const data = await authService.login(email, password);
    localStorage.setItem('skillsphere_token', data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const register = async (userData: any) => {
    const data = await authService.register(userData);
    localStorage.setItem('skillsphere_token', data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const googleLogin = async (email: string, name?: string, picture?: string) => {
    const data = await authService.googleLogin({ email, name, picture });
    localStorage.setItem('skillsphere_token', data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('skillsphere_token');
    setToken(null);
    setUser(null);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const refreshUser = async () => {
    await fetchCurrentUser();
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, googleLogin, logout, updateUser, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
