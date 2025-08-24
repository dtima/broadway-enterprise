'use client';

import React, { createContext, useContext } from 'react';

// Static i18n configuration
export const locales = ['en', 'fr'] as const;
export type Locale = typeof locales[number];

// Pure static i18n context
interface StaticI18nContextType {
  locale: string;
  messages: Record<string, any>;
  t: (key: string) => string;
}

const StaticI18nContext = createContext<StaticI18nContextType | undefined>(undefined);

export function StaticI18nProvider({ 
  children, 
  locale, 
  messages 
}: { 
  children: React.ReactNode;
  locale: string;
  messages: Record<string, any>;
}) {
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = messages;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    
    return value || key;
  };

  const value: StaticI18nContextType = {
    locale,
    messages,
    t
  };

  return (
    <StaticI18nContext.Provider value={value}>
      {children}
    </StaticI18nContext.Provider>
  );
}

export function useTranslations(namespace?: string) {
  const context = useContext(StaticI18nContext);
  if (!context) {
    throw new Error('useTranslations must be used within StaticI18nProvider');
  }

  return (key: string) => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    return context.t(fullKey);
  };
}
