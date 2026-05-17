import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check browser memory on load
  useEffect(() => {
    const storedUser = localStorage.getItem('matchmint_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string) => {
    // Mock user login
    const dummyUser = { 
      id: Math.random().toString(36).substr(2, 9), 
      name: email.split('@')[0], 
      email, 
      role: 'user' 
    };
    setUser(dummyUser);
    localStorage.setItem('matchmint_user', JSON.stringify(dummyUser));
  };

  const signup = (name: string, email: string) => {
    // Mock user signup
    const dummyUser = { 
      id: Math.random().toString(36).substr(2, 9), 
      name, 
      email, 
      role: 'user' 
    };
    setUser(dummyUser);
    localStorage.setItem('matchmint_user', JSON.stringify(dummyUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('matchmint_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
