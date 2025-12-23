import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type LTCategory = 'LT-I' | 'LT-II';

export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  ltCategory: LTCategory;
}

export interface SavedBill {
  id: string;
  applianceName: string;
  applianceIcon: string;
  power: number;
  hours: number;
  minutes: number;
  units: number;
  energyCost: number;
  customerCharge: number;
  totalCost: number;
  ratePerUnit: number;
  date: string;
}

interface UserContextType {
  user: User | null;
  savedBills: SavedBill[];
  login: (email: string, password: string) => boolean;
  signup: (username: string, phone: string, email: string, password: string, ltCategory: LTCategory) => boolean;
  logout: () => void;
  saveBill: (bill: Omit<SavedBill, 'id' | 'date'>) => void;
  deleteBill: (id: string) => void;
  getTotalBill: () => number;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [savedBills, setSavedBills] = useState<SavedBill[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('wattscope_user');
    const storedBills = localStorage.getItem('wattscope_bills');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedBills) {
      setSavedBills(JSON.parse(storedBills));
    }
  }, []);

  useEffect(() => {
    if (savedBills.length > 0) {
      localStorage.setItem('wattscope_bills', JSON.stringify(savedBills));
    }
  }, [savedBills]);

  const login = (email: string, password: string): boolean => {
    const storedUsers = localStorage.getItem('wattscope_users');
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const foundUser = users.find((u: User & { password: string }) => 
        u.email === email && u.password === password
      );
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('wattscope_user', JSON.stringify(userWithoutPassword));
        
        const userBills = localStorage.getItem(`wattscope_bills_${foundUser.id}`);
        if (userBills) {
          setSavedBills(JSON.parse(userBills));
        }
        return true;
      }
    }
    return false;
  };

  const signup = (username: string, phone: string, email: string, password: string, ltCategory: LTCategory): boolean => {
    const storedUsers = localStorage.getItem('wattscope_users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    
    if (users.find((u: User) => u.email === email)) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      phone,
      ltCategory,
      password
    };

    users.push(newUser);
    localStorage.setItem('wattscope_users', JSON.stringify(users));
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('wattscope_user', JSON.stringify(userWithoutPassword));
    setSavedBills([]);
    
    return true;
  };

  const logout = () => {
    if (user) {
      localStorage.setItem(`wattscope_bills_${user.id}`, JSON.stringify(savedBills));
    }
    setUser(null);
    setSavedBills([]);
    localStorage.removeItem('wattscope_user');
    localStorage.removeItem('wattscope_bills');
  };

  const saveBill = (bill: Omit<SavedBill, 'id' | 'date'>) => {
    const newBill: SavedBill = {
      ...bill,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    const updatedBills = [...savedBills, newBill];
    setSavedBills(updatedBills);
    if (user) {
      localStorage.setItem(`wattscope_bills_${user.id}`, JSON.stringify(updatedBills));
    }
  };

  const deleteBill = (id: string) => {
    const updatedBills = savedBills.filter(bill => bill.id !== id);
    setSavedBills(updatedBills);
    if (user) {
      localStorage.setItem(`wattscope_bills_${user.id}`, JSON.stringify(updatedBills));
    }
  };

  const getTotalBill = () => {
    return savedBills.reduce((total, bill) => total + bill.totalCost, 0);
  };

  return (
    <UserContext.Provider value={{
      user,
      savedBills,
      login,
      signup,
      logout,
      saveBill,
      deleteBill,
      getTotalBill
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
