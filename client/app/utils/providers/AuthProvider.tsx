"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from '../api/axiosInstance';

const API_URL = '/auth';

const login = async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}/login/`, { username, password });
    return response.data;
};

const signup = async (username: string, email: string, password: string) => {
    const response = await axios.post(`${API_URL}/signup/`, { username, email, password });
    return response.data;
};

const validateToken = async (token: string) => {
    const response = await axios.post(`${API_URL}/test_token/`, {}, {
        headers: {
            Authorization: `Token ${token}`,
        },
    });
    return response.data;
};

interface AuthContextType {
    user: any;
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    signup: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);

    const loginHandler = async (username: string, password: string) => {
        const data = await login(username, password);
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('token', data.token);
    };

    const signupHandler = async (username: string, email: string, password: string) => {
        const data = await signup(username, email, password);
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('token', data.token);
    };

    const logoutHandler = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    };

    const validateTokenHandler = async (token: string) => {
        try {
            const data = await validateToken(token);
            setUser(data);
        } catch (error) {
            logoutHandler();
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            validateTokenHandler(storedToken);
            setToken(storedToken);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, login: loginHandler, signup: signupHandler, logout: logoutHandler }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};