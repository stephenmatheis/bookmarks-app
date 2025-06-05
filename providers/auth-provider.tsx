'use client';

import { createContext, useContext, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';

type AuthContext = {
    user: User | null;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) throw new Error('useAuth must be used within an AuthProvider');

    return context;
}

export function AuthProvider({ children, user }: { children: ReactNode; user: User | null }) {
    return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}
