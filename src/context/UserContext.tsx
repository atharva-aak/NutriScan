import React, { createContext, useState, useContext, useEffect } from 'react';
import { FoodScan } from '../types';
import { mockScans } from '../data/mockData';

interface User {
  id: string;
  name: string;
  email: string;
  scans: FoodScan[];
  favorites: string[];
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  addScan: (scan: FoodScan) => void;
  toggleFavorite: (scanId: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulate fetching user from local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Set mock user for demo purposes
      const mockUser = {
        id: '1',
        name: 'Demo User',
        email: 'demo@example.com',
        scans: mockScans,
        favorites: [mockScans[0].id],
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, always succeed
    const mockUser = {
      id: '1',
      name: 'Demo User',
      email,
      scans: mockScans,
      favorites: [mockScans[0].id],
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const addScan = (scan: FoodScan) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      scans: [scan, ...user.scans],
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const toggleFavorite = (scanId: string) => {
    if (!user) return;
    
    let updatedFavorites;
    if (user.favorites.includes(scanId)) {
      updatedFavorites = user.favorites.filter(id => id !== scanId);
    } else {
      updatedFavorites = [...user.favorites, scanId];
    }
    
    const updatedUser = {
      ...user,
      favorites: updatedFavorites,
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      isAuthenticated: !!user,
      login,
      logout,
      addScan,
      toggleFavorite
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};