import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Role = 'worker' | 'sponsor' | 'agency' | null;

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
}

interface AuthContextType {
    currentUser: User | null;
    role: Role;
    login: (email: string, role: Role) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [role, setRole] = useState<Role>(null);

    const login = (email: string, selectedRole: Role) => {
        // Mock user login
        const user: User = {
            id: `usr_${Date.now()}`,
            name: email.split('@')[0] || 'User',
            email,
            role: selectedRole,
        };
        setCurrentUser(user);
        setRole(selectedRole);
    };

    const logout = () => {
        setCurrentUser(null);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
