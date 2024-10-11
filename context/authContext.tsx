import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the interface for the auth context
interface IAuthContext {
  accessToken: string;
  refreshToken: string;
  email: string;
  role: string;
  name: string;
  id: string;
  isLoggedIn: boolean;
  setUserInfo: (email: string, role: string, name: string, id: string) => void;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  setIsLoggedIn: (token: boolean) => void;
}

interface AuthProviderProps {
  children: ReactNode; // Define that children is of type ReactNode
}

// Create the AuthContext
const AuthContext = createContext<IAuthContext | null>(null);

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Function to set user info
  const setUserInfo = (userEmail: string, userRole: string, userName: string, userId: string) => {
    setEmail(userEmail);
    setRole(userRole);
    setName(userName);
    setId(userId);
  };

  // Simulate a check for authentication status (from AsyncStorage)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setAccessToken(storedToken);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        email,
        role,
        name,
        id,
        isLoggedIn,
        setUserInfo,
        setAccessToken,
        setRefreshToken,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
