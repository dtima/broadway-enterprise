'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

export interface UserRole {
  role: 'admin' | 'editor' | 'viewer';
  permissions: string[];
}

export interface AuthUser extends User {
  role?: 'admin' | 'editor' | 'viewer';
  permissions?: string[];
  firstName?: string;
  lastName?: string;
  organization?: string;
  phone?: string;
  bio?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshUserClaims: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get custom claims for RBAC
        const tokenResult = await firebaseUser.getIdTokenResult();
        const customClaims = tokenResult.claims;
        
        const authUser: AuthUser = {
          ...firebaseUser,
          role: customClaims.role as 'admin' | 'editor' | 'viewer' || 'viewer',
          permissions: customClaims.permissions as string[] || [],
        };
        
        setUser(authUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  };

  const refreshUserClaims = async () => {
    if (user) {
      try {
        // Force token refresh to get updated custom claims
        await user.getIdToken(true);
        
        // Trigger auth state change to update user object
        const tokenResult = await user.getIdTokenResult();
        const customClaims = tokenResult.claims;
        
        const updatedUser: AuthUser = {
          ...user,
          role: customClaims.role as 'admin' | 'editor' | 'viewer' || 'viewer',
          permissions: customClaims.permissions as string[] || [],
        };
        
        setUser(updatedUser);
      } catch (error) {
        console.error('Error refreshing user claims:', error);
        throw error;
      }
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    refreshUserClaims,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
