import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  plan: 'free' | 'pro' | 'enterprise';
  apiKey: string;
  usage: {
    current: number;
    limit: number;
    resetDate: string;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updatePlan: (plan: 'free' | 'pro' | 'enterprise') => void;
  generateApiKey: () => string;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('epochUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Math.random().toString(36).substring(7),
        email,
        plan: 'free',
        apiKey: generateApiKey(),
        usage: {
          current: 0,
          limit: 1000,
          resetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        }
      };
      
      setUser(newUser);
      localStorage.setItem('epochUser', JSON.stringify(newUser));
      return true;
    } catch (error) {
      return false;
    }
  };

  const register = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Math.random().toString(36).substring(7),
        email,
        plan: 'free',
        apiKey: generateApiKey(),
        usage: {
          current: 0,
          limit: 1000,
          resetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        }
      };
      
      setUser(newUser);
      localStorage.setItem('epochUser', JSON.stringify(newUser));
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('epochUser');
  };

  const updatePlan = (plan: 'free' | 'pro' | 'enterprise') => {
    if (user) {
      const limits = {
        free: 1000,
        pro: 50000,
        enterprise: 500000
      };

      const updatedUser = {
        ...user,
        plan,
        usage: {
          ...user.usage,
          limit: limits[plan]
        }
      };
      
      setUser(updatedUser);
      localStorage.setItem('epochUser', JSON.stringify(updatedUser));
    }
  };

  const generateApiKey = (): string => {
    return 'ek_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updatePlan,
      generateApiKey,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};