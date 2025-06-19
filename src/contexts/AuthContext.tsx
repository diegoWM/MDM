import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';

// Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "weedme-mdm.firebaseapp.com",
  projectId: "weedme-mdm",
  storageBucket: "weedme-mdm.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Admin email addresses - these can access production and approve changes
const ADMIN_EMAILS = [
  'admin@weedme.com',
  'manager@weedme.com',
  'dataadmin@weedme.com',
  // Add more admin emails here
];

// Authorized user emails - these can access the system and make changes
const AUTHORIZED_EMAILS = [
  ...ADMIN_EMAILS,
  'user1@weedme.com',
  'user2@weedme.com',
  'analyst@weedme.com',
  'coordinator@weedme.com',
  // Add more user emails here
];

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isAuthorized: boolean;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  canAccessProduction: boolean;
  userRole: 'admin' | 'user' | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAdmin = user ? ADMIN_EMAILS.includes(user.email || '') : false;
  const isAuthorized = user ? AUTHORIZED_EMAILS.includes(user.email || '') : false;
  const canAccessProduction = isAdmin; // Only admins can access production
  const userRole = user ? (isAdmin ? 'admin' : 'user') : null;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userEmail = result.user.email;
      
      // Check if user is authorized
      if (!userEmail || !AUTHORIZED_EMAILS.includes(userEmail)) {
        await signOut(auth);
        throw new Error('Access denied. You are not authorized to access this system.');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const value = {
    user,
    isAdmin,
    isAuthorized,
    isLoading,
    signInWithGoogle,
    logout,
    canAccessProduction,
    userRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};