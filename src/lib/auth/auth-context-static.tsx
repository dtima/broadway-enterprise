'use client';

import React, { createContext, useContext } from 'react';

// Static auth context for deployment without Firebase
interface StaticAuthContextType {
  user: null;
  loading: false;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  signUp: () => Promise<void>;
}

const StaticAuthContext = createContext<StaticAuthContextType | undefined>(undefined);

export function StaticAuthProvider({ children }: { children: React.ReactNode }) {
  const value: StaticAuthContextType = {
    user: null,
    loading: false,
    signIn: async () => {
      // Static implementation - no-op
    },
    signOut: async () => {
      // Static implementation - no-op
    },
    signUp: async () => {
      // Static implementation - no-op
    },
  };

  return (
    <StaticAuthContext.Provider value={value}>
      {children}
    </StaticAuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(StaticAuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a StaticAuthProvider');
  }
  return context;
}
