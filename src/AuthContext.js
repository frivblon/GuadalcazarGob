import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
// ⬇️ PASO 1: Importa tu nuevo cliente API centralizado.
import apiClient from './apiClient';

// ❌ Ya no necesitamos 'axios' directamente aquí, ni su configuración por defecto.
// import axios from 'axios';
// axios.defaults.baseURL = ...
// axios.defaults.withCredentials = ...

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuthStatus = useCallback(async () => {
        try {
            // ⬇️ PASO 2: Usa 'apiClient' para todas las llamadas.
            const { data } = await apiClient.get('/api/user');
            setUser(data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    const login = async (credentials) => {
        await apiClient.get('/sanctum/csrf-cookie');
        await apiClient.post('/api/login', credentials);
        await checkAuthStatus();
    };

    const register = async (userData) => {
        await apiClient.post('/api/register', userData);
        await login({ email: userData.email, password: userData.password });
    };

    const logout = async () => {
        await apiClient.post('/api/logout');
        setUser(null);
    };
    
    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);